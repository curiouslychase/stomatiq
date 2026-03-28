import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, teamSize, service, budget, message } = body;

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Name, email, and service interest are required." },
        { status: 400 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Stomatiq <noreply@stomatiq.com>",
      to: "hello@stomatiq.com",
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Team size: ${teamSize || "Not specified"}`,
        `Service: ${service}`,
        `Budget: ${budget || "Not specified"}`,
        message ? `\nMessage:\n${message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
