import { NextResponse } from "next/server";
import { SKILLS } from "@/data/constants";
import { incrementKeyboardCount, listKeyboardCounts } from "@/lib/firebase-firestore";

const allowedSkills = new Set(Object.values(SKILLS).map((skill) => skill.name));
const isDevelopment = process.env.NODE_ENV === "development";

function logServerError(label: string, error: unknown) {
  if (error instanceof Error) {
    const cause = error.cause;
    const causeDetails = cause instanceof Error
      ? { name: cause.name, message: cause.message }
      : cause && typeof cause === "object"
        ? { code: "code" in cause ? cause.code : undefined, message: "message" in cause ? cause.message : undefined }
        : undefined;
    console.error(label, {
      name: error.name,
      code: "code" in error ? error.code : undefined,
      message: error.message,
      stack: error.stack,
      cause: causeDetails,
    });
    return {
      code: "code" in error && (typeof error.code === "string" || typeof error.code === "number")
        ? error.code
        : undefined,
      message: error.message,
    };
  }
  console.error(label, { message: String(error) });
  return { message: "Unknown server error" };
}

function errorResponse(error: unknown) {
  const diagnostic = logServerError("Keyboard counts request failed:", error);
  return NextResponse.json(
    isDevelopment
      ? { error: "Keyboard counter request failed", diagnostic }
      : { error: "Keyboard counter is not configured" },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET() {
  try {
    return NextResponse.json({ counts: await listKeyboardCounts() }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { skill?: unknown; amount?: unknown };
    if (typeof body.skill !== "string" || !allowedSkills.has(body.skill)) {
      return NextResponse.json({ error: "Unknown keyboard skill" }, { status: 400 });
    }
    const amount = body.amount === undefined ? 1 : body.amount;
    if (typeof amount !== "number" || !Number.isSafeInteger(amount) || amount < 1 || amount > 5000) {
      return NextResponse.json({ error: "Invalid press batch" }, { status: 400 });
    }
    await incrementKeyboardCount(body.skill, amount);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return errorResponse(error);
  }
}
