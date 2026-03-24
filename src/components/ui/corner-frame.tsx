interface CornerFrameProps {
  children: React.ReactNode;
  className?: string;
  tinted?: boolean;
}

export function CornerFrame({ children, className = "", tinted = false }: CornerFrameProps) {
  const borderColor = tinted ? "var(--color-accent)" : "var(--color-border)";
  const markStyle = (borders: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    width: "16px",
    height: "16px",
    ...borders,
    borderColor,
    transition: "border-color 0.2s",
  });

  return (
    <div className={className} style={{ position: "relative" }}>
      <div style={markStyle({ top: 0, left: 0, borderTop: "1px solid", borderLeft: "1px solid" })} />
      <div style={markStyle({ top: 0, right: 0, borderTop: "1px solid", borderRight: "1px solid" })} />
      <div style={markStyle({ bottom: 0, left: 0, borderBottom: "1px solid", borderLeft: "1px solid" })} />
      <div style={markStyle({ bottom: 0, right: 0, borderBottom: "1px solid", borderRight: "1px solid" })} />
      {children}
    </div>
  );
}
