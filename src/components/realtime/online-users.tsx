"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Hash, Send, Users2, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ChatMessage = { id: string; name: string; text: string; createdAt: string };

export default function OnlineUsers() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [name, setName] = useState("Guest");
  const [draft, setDraft] = useState("");
  const [connected, setConnected] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const lastSeen = useRef("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-chat-name");
      if (saved) setName(saved.slice(0, 24));
    } catch {}
  }, []);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/chat", { cache: "no-store" });
      if (!response.ok) throw new Error("Chat service unavailable");
      const data = await response.json() as { messages: ChatMessage[] };
      const next = data.messages ?? [];
      const newest = next[next.length - 1]?.id ?? "";
      setMessages(next);
      setConnected(true);
      setError("");
      if (newest && newest !== lastSeen.current) {
        lastSeen.current = newest;
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    } catch {
      setConnected(false);
      setError("Can't connect to chat. Check Firebase setup and try again.");
    }
  }, []);

  useEffect(() => {
    void refresh();
    const id = window.setInterval(() => { void refresh(); }, 2500);
    return () => window.clearInterval(id);
  }, [refresh]);

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const text = draft.trim().slice(0, 500);
    if (!text || busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim().slice(0, 24) || "Guest", text }),
      });
      const data = await response.json() as { message?: ChatMessage; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error || "Message failed");
      setDraft("");
      setMessages((current) => [...current.filter((m) => m.id !== data.message!.id), data.message!].slice(-100));
      lastSeen.current = data.message.id;
      try { localStorage.setItem("portfolio-chat-name", name.trim().slice(0, 24) || "Guest"); } catch {}
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send message");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-11 gap-2 rounded-lg border-white/30 bg-background/30 backdrop-blur-sm" aria-label="Open community chat">
          <Users2 className="h-5 w-5" />
          <span>Chat</span>
          <span className={`h-2 w-2 rounded-full ${connected ? "bg-green-500" : "bg-amber-500"}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" side="top" className="mr-2 flex h-[min(70vh,520px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-xl border p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2 font-semibold"><Hash className="h-4 w-4" /> general</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">{connected ? <Wifi className="h-3.5 w-3.5 text-green-500" /> : <WifiOff className="h-3.5 w-3.5 text-amber-500" />}{connected ? "Live" : "Connecting"}</div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
          {messages.length === 0 && <p className="m-auto text-center text-sm text-muted-foreground">No messages yet. Start the conversation.</p>}
          {messages.map((message) => (
            <div key={message.id} className="rounded-lg bg-muted/60 px-3 py-2">
              <div className="mb-1 flex items-baseline justify-between gap-2"><span className="truncate text-sm font-semibold">{message.name}</span><time className="shrink-0 text-[10px] text-muted-foreground">{new Date(message.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time></div>
              <p className="whitespace-pre-wrap break-words text-sm">{message.text}</p>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <form onSubmit={sendMessage} className="space-y-2 border-t p-3">
          <input value={name} maxLength={24} onChange={(e) => setName(e.target.value)} aria-label="Display name" placeholder="Display name" className="h-8 w-full rounded-md border bg-background px-2 text-xs outline-none focus:ring-1 focus:ring-ring" />
          <div className="flex items-end gap-2">
            <textarea value={draft} maxLength={500} onChange={(e) => setDraft(e.target.value)} aria-label="Chat message" placeholder="Message #general" rows={2} className="max-h-24 min-w-0 flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring" />
            <Button type="submit" size="icon" disabled={busy || !draft.trim()} aria-label="Send message"><Send className="h-4 w-4" /></Button>
          </div>
          {error && <p role="status" className="text-xs text-destructive">{error}</p>}
          <p className="text-[10px] text-muted-foreground">Messages sync automatically across visitors. No account required.</p>
        </form>
      </PopoverContent>
    </Popover>
  );
}
