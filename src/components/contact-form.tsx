"use client";

import { useState } from "react";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  backgroundColor: "var(--color-bg)",
  border: "1px solid var(--color-border)",
  borderRadius: "2px",
  color: "var(--color-text)",
  fontSize: "0.95rem",
  fontFamily: "inherit",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  color: "var(--color-text-muted)",
  marginBottom: "0.5rem",
};

const selectOptions = {
  teamSize: [
    { value: "", label: "Select team size" },
    { value: "1-5", label: "1\u20135" },
    { value: "6-20", label: "6\u201320" },
    { value: "21-50", label: "21\u201350" },
    { value: "50+", label: "50+" },
  ],
  service: [
    { value: "", label: "Select a service" },
    { value: "10x Diagnostic", label: "10x Diagnostic" },
    { value: "Exponential Design Sprint", label: "Exponential Design Sprint" },
    { value: "Full Implementation", label: "Full Implementation" },
    { value: "Not sure yet", label: "Not sure yet" },
  ],
  budget: [
    { value: "", label: "Select budget range" },
    { value: "Under $5k", label: "Under $5k" },
    { value: "$5k-$15k", label: "$5k\u2013$15k" },
    { value: "$15k-$50k", label: "$15k\u2013$50k" },
    { value: "$50k+", label: "$50k+" },
  ],
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "2px",
        padding: "3rem 2rem",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "0.85rem",
          fontWeight: 500,
          color: "var(--color-accent)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "0.75rem",
        }}>
          Message sent
        </p>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem" }}>
          Thanks for reaching out. I&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: "var(--color-bg-card)",
      border: "1px solid var(--color-border)",
      borderRadius: "2px",
      padding: "2rem",
    }}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label style={labelStyle}>Name *</label>
          <input name="name" required style={fieldStyle} placeholder="Your name" />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email *</label>
          <input name="email" type="email" required style={fieldStyle} placeholder="you@company.com" />
        </div>

        {/* Team Size */}
        <div>
          <label style={labelStyle}>Team Size</label>
          <select name="teamSize" style={{ ...fieldStyle, appearance: "none", cursor: "pointer" }}>
            {selectOptions.teamSize.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Service Interest */}
        <div>
          <label style={labelStyle}>Service Interest *</label>
          <select name="service" required style={{ ...fieldStyle, appearance: "none", cursor: "pointer" }}>
            {selectOptions.service.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div className="md:col-span-2">
          <label style={labelStyle}>Budget Range</label>
          <select name="budget" style={{ ...fieldStyle, appearance: "none", cursor: "pointer" }}>
            {selectOptions.budget.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label style={labelStyle}>Message</label>
          <textarea
            name="message"
            rows={4}
            style={{ ...fieldStyle, resize: "vertical" }}
            placeholder="Tell me about your team and what you're looking to achieve."
          />
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <p style={{
          marginTop: "1rem",
          color: "#ef4444",
          fontSize: "0.9rem",
          fontFamily: "var(--font-jetbrains-mono), monospace",
        }}>
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <div style={{ marginTop: "1.5rem" }}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="contact-submit-btn"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.75rem",
            backgroundColor: "var(--color-accent)",
            color: "#fff",
            border: "1px solid var(--color-accent-hover)",
            borderRadius: "2px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 500,
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            cursor: status === "sending" ? "not-allowed" : "pointer",
            opacity: status === "sending" ? 0.6 : 1,
            transition: "transform 0.2s ease-out, opacity 0.2s",
          }}
        >
          {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
        </button>
      </div>
    </form>
  );
}
