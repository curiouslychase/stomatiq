interface DiamondConnectorProps {
  variant?: "outline" | "filled";
  tinted?: boolean;
  className?: string;
}

export function DiamondConnector({ variant = "outline", tinted = false, className = "" }: DiamondConnectorProps) {
  const color = tinted ? "var(--color-accent)" : "var(--color-border)";
  return (
    <div
      className={className}
      style={{
        width: "8px",
        height: "8px",
        transform: "rotate(45deg)",
        border: variant === "outline" ? `1px solid ${color}` : "none",
        backgroundColor: variant === "filled" ? color : "transparent",
      }}
    />
  );
}
