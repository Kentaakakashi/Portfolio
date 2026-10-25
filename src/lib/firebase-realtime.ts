"use client";

const firebaseConfig = {
  apiKey: "AIzaSyA8ZaQU_4f4TWMYBjSw0-9U1E-Qqs5wiiA",
  authDomain: "portfolio-5202a.firebaseapp.com",
  databaseURL: "https://portfolio-5202a-default-rtdb.firebaseio.com",
  projectId: "portfolio-5202a",
  storageBucket: "portfolio-5202a.firebasestorage.app",
  messagingSenderId: "406273084718",
  appId: "1:406273084718:web:32491acefc5809799d7ebf",
  measurementId: "G-Q7VWHBLGTM",
};

type AuthSession = { uid: string; idToken: string; refreshToken: string; expiresAt: number };
const SESSION_KEY = "portfolio-firebase-session";
let sessionPromise: Promise<AuthSession> | null = null;

function storedSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AuthSession;
    return session.expiresAt > Date.now() + 60_000 ? session : null;
  } catch { return null; }
}

function saveSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

async function requestAuth(path: string, body: Record<string, string>): Promise<AuthSession> {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${path}?key=${firebaseConfig.apiKey}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  const data = await response.json() as { localId?: string; idToken?: string; refreshToken?: string; expiresIn?: string; error?: { message?: string } };
  if (!response.ok || !data.localId || !data.idToken || !data.refreshToken) {
    throw new Error(data.error?.message ?? "Firebase anonymous sign-in failed");
  }
  return saveSession({ uid: data.localId, idToken: data.idToken, refreshToken: data.refreshToken, expiresAt: Date.now() + Number(data.expiresIn ?? 3600) * 1000 });
}

export async function getFirebaseSession(forceRefresh = false): Promise<AuthSession> {
  if (!forceRefresh) {
    const stored = storedSession();
    if (stored) return stored;
  }
  if (!sessionPromise) {
    sessionPromise = (async () => {
      const previous = (() => { try { return JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null") as AuthSession | null; } catch { return null; } })();
      if (previous?.refreshToken) {
        const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`, {
          method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: previous.refreshToken }),
        });
        if (response.ok) {
          const data = await response.json() as { id_token: string; refresh_token: string; user_id: string; expires_in: string };
          return saveSession({ uid: data.user_id, idToken: data.id_token, refreshToken: data.refresh_token, expiresAt: Date.now() + Number(data.expires_in) * 1000 });
        }
      }
      return requestAuth("signUp", { returnSecureToken: "true" });
    })().finally(() => { sessionPromise = null; });
  }
  return sessionPromise;
}

export function realtimeUrl(path: string, token: string) {
  return `${firebaseConfig.databaseURL}/${path.replace(/^\/+|\/+$/g, "")}.json?auth=${encodeURIComponent(token)}`;
}

export async function writeRealtime(path: string, token: string, value: unknown) {
  const response = await fetch(realtimeUrl(path, token), {
    method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(value),
  });
  if (!response.ok) throw new Error(`Realtime Database write failed (${response.status})`);
}
