interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
      {/* Diamond icon */}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
        <rect x="6" y="0.5" width="7.78" height="7.78" rx="1" transform="rotate(45 6 0.5)" stroke="var(--color-accent)" strokeWidth="1.2" />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontWeight: 500,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-accent)",
          flexShrink: 0,
        }}
      >
        {children}
      </span>
      {/* Dotted line */}
      <div
        style={{
          flexGrow: 1,
          height: "1px",
          borderBottom: "1px dotted var(--color-border)",
        }}
      />
    </div>
  );
}
