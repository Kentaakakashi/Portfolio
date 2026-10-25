"use client";

import { useCallback, useEffect, useState } from "react";
import { SKILLS } from "@/data/constants";
import { mergeKeyboardCounts } from "./wear";

const skills = new Set(Object.values(SKILLS).map((skill) => skill.name));

export function useKeyboardCounts() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [available, setAvailable] = useState(false);

  const sync = useCallback(async () => {
    try {
      const response = await fetch("/api/keyboard-counts", { cache: "no-store" });
      if (!response.ok) throw new Error("Keyboard counter unavailable");
      const data = await response.json() as { counts?: Record<string, unknown> };
      setCounts((previous) => mergeKeyboardCounts(previous, data.counts ?? {}, skills));
      setAvailable(true);
    } catch {
      setAvailable(false);
    }
  }, []);

  useEffect(() => {
    void sync();
    const timer = window.setInterval(() => void sync(), 10_000);
    return () => window.clearInterval(timer);
  }, [sync]);

  const recordPress = useCallback((skill: string) => {
    if (!available || !skills.has(skill)) return;
    // Each deliberate press is one server-side atomic increment. Never queue
    // presses while offline, so reconnecting cannot inflate the public total.
    void fetch("/api/keyboard-counts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skill }),
      keepalive: true,
    }).then((response) => {
      if (response.ok) void sync();
    }).catch(() => setAvailable(false));
  }, [available, sync]);

  return {
    counts,
    total: Object.values(counts).reduce((sum, count) => sum + count, 0),
    available,
    recordPress,
  };
}
