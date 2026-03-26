import { Logo } from "@/components/logo";
import { DotDivider } from "@/components/ui/dot-divider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer style={{ position: "relative", overflow: "hidden" }}>
      <div className="mx-auto max-w-[1440px] px-8">
        <DotDivider />
      </div>

      {/* Info row */}
      <div className="flex flex-col items-center justify-between gap-4 mx-auto max-w-[1440px] px-8 py-10 sm:flex-row">
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--color-text-muted)" }}>
          <Logo size={24} />
          <span style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 500,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}>
            STOMATIQ
          </span>
        </div>

        {/* Email */}
        <a href={`mailto:${siteConfig.email}`} className="footer-link" style={{ fontSize: "0.85rem" }}>
          {siteConfig.email}
        </a>

        {/* Theme + Copyright */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
            &copy; 2026 stomatiq LLC
          </span>
        </div>
      </div>

      {/* Giant typographic treatment */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-work-sans), system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(8rem, 18vw, 20rem)",
          lineHeight: 0.85,
          color: "var(--color-text-muted)",
          opacity: 0.05,
          textAlign: "center",
          letterSpacing: "-0.04em",
          userSelect: "none",
          paddingBottom: "0",
          marginBottom: "-0.15em",
        }}
      >
        STOMATIQ
      </div>
    </footer>
  );
}
