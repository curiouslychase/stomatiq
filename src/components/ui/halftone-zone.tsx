interface HalftoneZoneProps {
  children: React.ReactNode;
  className?: string;
}

export function HalftoneZone({ children, className = "" }: HalftoneZoneProps) {
  return (
    <div className={`halftone-zone ${className}`}>
      {children}
    </div>
  );
}
