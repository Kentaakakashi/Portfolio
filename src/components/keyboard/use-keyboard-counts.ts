"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SKILLS } from "@/data/constants";

const skills = new Set(Object.values(SKILLS).map((skill) => skill.name));
const CACHE_KEY = "portfolio-keyboard-counts-v2";
const PENDING_KEY = "portfolio-keyboard-counts-pending-v2";
type Counts = Record<string, number>;

function readCounts(key: string): Counts {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? "{}") as Record<string, unknown>;
    return Object.fromEntries(Object.entries(parsed).filter(([name, value]) =>
      skills.has(name) && typeof value === "number" && Number.isSafeInteger(value) && value >= 0
    )) as Counts;
  } catch { return {}; }
}
function saveCounts(key: string, counts: Counts) {
  try { localStorage.setItem(key, JSON.stringify(counts)); } catch { /* memory fallback */ }
}
function addCounts(a: Counts, b: Counts): Counts {
  const result = { ...a };
  for (const [key, value] of Object.entries(b)) result[key] = (result[key] ?? 0) + value;
  return result;
}

export function useKeyboardCounts() {
  const [serverCounts, setServerCounts] = useState<Counts>({});
  const [pending, setPending] = useState<Counts>({});
  const [available, setAvailable] = useState(false);
  const pendingRef = useRef<Counts>({});
  const flushing = useRef(false);
  const serverRef = useRef<Counts>({});

  useEffect(() => {
    const cached = readCounts(CACHE_KEY);
    const queued = readCounts(PENDING_KEY);
    serverRef.current = cached;
    pendingRef.current = queued;
    setServerCounts(cached);
    setPending(queued);
    // The optimistic count is usable immediately, even while the database is offline.
    setAvailable(true);
  }, []);

  const sync = useCallback(async () => {
    try {
      const response = await fetch("/api/keyboard-counts", { cache: "no-store" });
      if (!response.ok) throw new Error("Keyboard counter unavailable");
      const data = await response.json() as { counts?: Record<string, unknown> };
      const incoming: Counts = {};
      for (const [name, value] of Object.entries(data.counts ?? {})) {
        if (skills.has(name) && typeof value === "number" && Number.isSafeInteger(value) && value >= 0) incoming[name] = value;
      }
      serverRef.current = incoming;
      setServerCounts(incoming);
      saveCounts(CACHE_KEY, incoming);
      setAvailable(true);
    } catch {
      // Keep the last cached total and local pending presses visible while offline.
      setAvailable(true);
    }
  }, []);

  const flush = useCallback(async () => {
    if (flushing.current) return;
    const snapshot = { ...pendingRef.current };
    const batch = Object.entries(snapshot).filter(([, amount]) => amount > 0);
    if (!batch.length) return;
    flushing.current = true;
    try {
      for (const [skill, amount] of batch) {
        const response = await fetch("/api/keyboard-counts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skill, amount }),
          keepalive: true,
        });
        if (!response.ok) continue;
        // Firestore increment transforms are atomic, so simultaneous visitors never overwrite each other.
        serverRef.current = { ...serverRef.current, [skill]: (serverRef.current[skill] ?? 0) + amount };
        const remaining = Math.max(0, (pendingRef.current[skill] ?? 0) - amount);
        pendingRef.current = { ...pendingRef.current };
        if (remaining) pendingRef.current[skill] = remaining;
        else delete pendingRef.current[skill];
        saveCounts(CACHE_KEY, serverRef.current);
        saveCounts(PENDING_KEY, pendingRef.current);
      }
      setServerCounts({ ...serverRef.current });
      setPending({ ...pendingRef.current });
      void sync();
    } catch {
      // Leave unsaved presses in localStorage and retry later.
    } finally {
      flushing.current = false;
    }
  }, [sync]);

  useEffect(() => {
    void sync();
    const poll = window.setInterval(() => { void sync(); void flush(); }, 4000);
    const onOnline = () => { void flush(); void sync(); };
    window.addEventListener("online", onOnline);
    return () => { window.clearInterval(poll); window.removeEventListener("online", onOnline); };
  }, [sync, flush]);

  const recordPress = useCallback((skill: string) => {
    if (!skills.has(skill)) return;
    // Optimistically count every press immediately and persist it before attempting network I/O.
    pendingRef.current = { ...pendingRef.current, [skill]: (pendingRef.current[skill] ?? 0) + 1 };
    setPending({ ...pendingRef.current });
    saveCounts(PENDING_KEY, pendingRef.current);
    void flush();
  }, [flush]);

  const counts = useMemo(() => addCounts(serverCounts, pending), [serverCounts, pending]);
  return {
    counts,
    total: Object.values(counts).reduce((sum, count) => sum + count, 0),
    available,
    recordPress,
  };
}
