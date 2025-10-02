import type { APIRoute } from "astro";
import { Resend } from "resend";

const resendApiKey = import.meta.env.RESEND_API_KEY?.trim();
const audienceId = import.meta.env.RESEND_AUDIENCE_ID?.trim();
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const errorStatus: Record<string, number> = {
  missing_required_field: 422,
  invalid_idempotency_key: 400,
  invalid_idempotent_request: 409,
  concurrent_idempotent_requests: 409,
  invalid_access: 422,
  invalid_parameter: 422,
  invalid_region: 422,
  rate_limit_exceeded: 429,
  missing_api_key: 401,
  invalid_api_key: 403,
  invalid_from_address: 403,
  validation_error: 403,
  not_found: 404,
  method_not_allowed: 405,
  application_error: 500,
  internal_server_error: 500,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function sanitizeString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed.length) return undefined;
  return trimmed.slice(0, maxLength);
}

function deriveNames(options: {
  firstName?: string;
  lastName?: string;
  full?: string;
}) {
  let firstName = sanitizeString(options.firstName, 80);
  let lastName = sanitizeString(options.lastName, 120);
  if (!firstName && options.full) {
    const parts = options.full.split(/\s+/).filter(Boolean);
    if (parts.length) {
      firstName = sanitizeString(parts.shift(), 80);
      if (parts.length) {
        lastName = sanitizeString(parts.join(" "), 120);
      }
    }
  }
  return { firstName, lastName };
}

async function parsePayload(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    try {
      const data = await request.json();
      if (data && typeof data === "object") {
        return data as Record<string, unknown>;
      }
    } catch {
      // fallthrough to form parsing
    }
  }
  try {
    const form = await request.formData();
    const result: Record<string, unknown> = {};
    for (const [key, value] of form.entries()) {
      result[key] = typeof value === "string" ? value : String(value);
    }
    return result;
  } catch {
    return {};
  }
}

export const POST: APIRoute = async ({ request }) => {
  if (!resend || !audienceId) {
    return json({ success: false, error: "Newsletter configuration is incomplete." }, 500);
  }

  const payload = await parsePayload(request);
  const emailRaw = sanitizeString(payload.email, 320)?.toLowerCase();
  if (!emailRaw || !emailPattern.test(emailRaw)) {
    return json({ success: false, error: "Enter a valid email address." }, 400);
  }

  const names = deriveNames({
    firstName: sanitizeString(payload.firstName, 80),
    lastName: sanitizeString(payload.lastName, 120),
    full: sanitizeString(payload.name, 160),
  });

  const { error } = await resend.contacts.create({
    audienceId,
    email: emailRaw,
    firstName: names.firstName,
    lastName: names.lastName,
    unsubscribed: false,
  });

  if (error) {
    const message = error.message || "Unable to subscribe right now.";
    if (error.name === "invalid_idempotent_request" || /already exists/i.test(message)) {
      return json({ success: true, duplicate: true });
    }
    const status = errorStatus[error.name] ?? 500;
    return json({ success: false, error: message }, status);
  }

  return json({ success: true, duplicate: false });
};
