import { NextResponse } from "next/server";
import { SKILLS } from "@/data/constants";
import { incrementKeyboardCount, listKeyboardCounts } from "@/lib/firebase-firestore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const allowedSkills = new Set(Object.values(SKILLS).map((skill) => skill.name));

export async function GET() {
  try {
    return NextResponse.json({ counts: await listKeyboardCounts() }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Keyboard counts unavailable:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Keyboard counter is not configured" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { skill?: unknown };
    if (typeof body.skill !== "string" || !allowedSkills.has(body.skill)) {
      return NextResponse.json({ error: "Unknown keyboard skill" }, { status: 400 });
    }
    await incrementKeyboardCount(body.skill);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Keyboard count update failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Keyboard counter is not configured" }, { status: 503 });
  }
}
