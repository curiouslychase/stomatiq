import { HalftoneZone } from "./halftone-zone";
import { CornerFrame } from "./corner-frame";
import { DiamondConnector } from "./diamond-connector";

interface GridCardProps {
  title?: string;
  number?: string;
  description?: string;
  illustration?: React.ReactNode;
  variant?: "default" | "featured" | "minimal";
  children?: React.ReactNode;
  className?: string;
  href?: string;
  span?: number;
}

export function GridCard({
  title,
  number,
  description,
  illustration,
  variant = "default",
  children,
  className = "",
  href,
  span,
}: GridCardProps) {
  const isFeatured = variant === "featured";
  const isMinimal = variant === "minimal";

  const cardBg = isFeatured ? "var(--color-accent)" : "var(--color-bg-card)";
  const cardText = isFeatured ? "#0C0D10" : "var(--color-text)";
  const cardSecondary = isFeatured ? "rgba(12,13,16,0.6)" : "var(--color-text-secondary)";
  const cardBorder = isFeatured ? "var(--color-accent-hover)" : "var(--color-border)";

  const variantClass = isFeatured ? "grid-card grid-card-featured" : "grid-card";

  const style: React.CSSProperties = {
    backgroundColor: cardBg,
    border: `1px solid ${cardBorder}`,
    borderRadius: "2px",
    color: cardText,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    ...(span ? { gridColumn: `span ${span}` } : {}),
  };

  const inner = (
    <>
      {(title || number) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "1.25rem 1.5rem" }}>
          {title && <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>{title}</span>}
          {number && (
            <span style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "0.8rem",
              fontWeight: 400,
              color: cardSecondary,
            }}>
              {number}
            </span>
          )}
        </div>
      )}

      {illustration && !isMinimal && (
        <div style={{ position: "relative" }}>
          <HalftoneZone>
            <CornerFrame tinted={isFeatured}>
              <div style={{ padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "160px", color: cardText }}>
                {illustration}
              </div>
            </CornerFrame>
          </HalftoneZone>
          <div style={{ position: "absolute", bottom: "-4px", left: "50%", transform: "translateX(-50%)", zIndex: 2, backgroundColor: cardBg }}>
            <DiamondConnector variant="filled" tinted={isFeatured} />
          </div>
        </div>
      )}

      {description && (
        <div style={{
          padding: "1.25rem 1.5rem",
          borderTop: illustration && !isMinimal ? `1px solid ${cardBorder}` : "none",
          color: cardSecondary,
          fontSize: "0.9rem",
          lineHeight: 1.6,
          fontWeight: 400,
          flex: 1,
        }}>
          {description}
        </div>
      )}

      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${variantClass} ${className}`} style={{ ...style, textDecoration: "none" }}>
        {inner}
      </a>
    );
  }

  return (
    <div className={`${variantClass} ${className}`} style={style}>
      {inner}
    </div>
  );
}
