import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";


const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});
export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });

    // The portfolio can build without email credentials. Configure both values
    // before enabling the contact-email endpoint in a deployment.
    if (!process.env.RESEND_API_KEY || !config.email) {
      return Response.json(
        { error: "Contact email is not configured on this deployment." },
        { status: 503 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return Response.json({ error: "Email delivery is not configured yet." }, { status: 503 });
    const resend = new Resend(apiKey);
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "Porfolio <onboarding@resend.dev>",
      to: [config.email],
      subject: "Contact me from portfolio",
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        message: zodData.message,
      }) as React.ReactElement,
    });

    if (resendError) {
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json(resendData);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
