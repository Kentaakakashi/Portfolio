import "server-only";
import { createSign } from "node:crypto";

type ServiceAccount = {
  project_id: string;
  client_email: string;
  private_key: string;
};

let cachedToken: { value: string; expiresAt: number } | null = null;
let cachedAccount: ServiceAccount | null = null;

function getAccount(): ServiceAccount {
  if (cachedAccount) return cachedAccount;
  const raw = process.env.FIREBASE_OINK;
  if (!raw) throw new Error("FIREBASE_OINK is not configured");
  let parsed: ServiceAccount;
  try {
    parsed = JSON.parse(raw) as ServiceAccount;
  } catch {
    throw new Error("FIREBASE_OINK must contain the complete service-account JSON");
  }
  if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
    throw new Error("FIREBASE_OINK is missing project_id, client_email, or private_key");
  }
  cachedAccount = parsed;
  return parsed;
}

async function accessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const account = getAccount();
  const now = Math.floor(Date.now() / 1000);
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = encode({ alg: "RS256", typ: "JWT" }) + "." + encode({
    iss: account.client_email,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  });
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const assertion = unsigned + "." + signer.sign(account.private_key, "base64url");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Firebase service-account token request failed");
  const data = await response.json() as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

function firestoreBase() {
  return `https://firestore.googleapis.com/v1/projects/${getAccount().project_id}/databases/(default)/documents`;
}

export async function listKeyboardCounts() {
  const token = await accessToken();
  const response = await fetch(`${firestoreBase()}/keyboardCounts?pageSize=100`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Firestore keyboard count read failed");
  const body = await response.json() as { documents?: { name: string; fields?: { count?: { integerValue?: string } } }[] };
  const counts: Record<string, number> = {};
  for (const document of body.documents ?? []) {
    const skill = document.name.split("/").pop();
    const count = Number(document.fields?.count?.integerValue ?? 0);
    if (skill && Number.isSafeInteger(count) && count >= 0) counts[skill] = count;
  }
  return counts;
}

export async function incrementKeyboardCount(skill: string, amount = 1) {
  const token = await accessToken();
  const account = getAccount();
  const url = `https://firestore.googleapis.com/v1/projects/${account.project_id}/databases/(default)/documents:commit`;
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      writes: [{
        transform: {
          document: `${firestoreBase()}/keyboardCounts/${skill}`,
          fieldTransforms: [{ fieldPath: "count", increment: { integerValue: String(amount) } }],
        },
      }],
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Firestore keyboard count increment failed");
}


export type PublicChatMessage = {
  id: string;
  name: string;
  text: string;
  createdAt: string;
};

export async function listChatMessages(): Promise<PublicChatMessage[]> {
  const token = await accessToken();
  const response = await fetch(`${firestoreBase()}/portfolioChat?pageSize=100&orderBy=createdAt%20desc`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Firestore chat read failed");
  const body = await response.json() as { documents?: { name: string; fields?: Record<string, { stringValue?: string }> }[] };
  return (body.documents ?? []).map((doc) => ({
    id: doc.name.split("/").pop() ?? "",
    name: doc.fields?.name?.stringValue ?? "Guest",
    text: doc.fields?.text?.stringValue ?? "",
    createdAt: doc.fields?.createdAt?.stringValue ?? new Date().toISOString(),
  })).filter((m) => m.text).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function createChatMessage(name: string, text: string): Promise<PublicChatMessage> {
  const token = await accessToken();
  const response = await fetch(`${firestoreBase()}/portfolioChat?documentId=${crypto.randomUUID()}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields: {
      name: { stringValue: name },
      text: { stringValue: text },
      createdAt: { stringValue: new Date().toISOString() },
    } }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Firestore chat write failed");
  const doc = await response.json() as { name: string; fields?: Record<string, { stringValue?: string }> };
  return {
    id: doc.name.split("/").pop() ?? "",
    name: doc.fields?.name?.stringValue ?? name,
    text: doc.fields?.text?.stringValue ?? text,
    createdAt: doc.fields?.createdAt?.stringValue ?? new Date().toISOString(),
  };
}
