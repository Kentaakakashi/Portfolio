import { NextResponse } from "next/server";
import { createChatMessage, listChatMessages } from "@/lib/firebase-firestore";

export async function GET() {
  try {
    const messages = await listChatMessages();
    return NextResponse.json({ messages }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return NextResponse.json({ error: "Chat is temporarily unavailable. Check Firebase configuration." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: unknown; text?: unknown };
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 24) : "Guest";
    const text = typeof body.text === "string" ? body.text.trim().slice(0, 500) : "";
    if (!text) return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    const message = await createChatMessage(name || "Guest", text);
    return NextResponse.json({ message }, { status: 201, headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return NextResponse.json({ error: "Could not send message. Check Firebase configuration." }, { status: 503 });
  }
}
