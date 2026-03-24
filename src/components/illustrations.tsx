const svgProps = {
  viewBox: "0 0 200 200",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  width: 120,
  height: 120,
} as const;

/* Concentric circles with crosshair — audit/focus */
export function ConcentricCircles() {
  return (
    <svg {...svgProps}>
      <circle cx="100" cy="100" r="75" />
      <circle cx="100" cy="100" r="52" />
      <circle cx="100" cy="100" r="28" />
      <circle cx="100" cy="100" r="4" fill="currentColor" stroke="none" />
      <line x1="100" y1="15" x2="100" y2="45" />
      <line x1="100" y1="155" x2="100" y2="185" />
      <line x1="15" y1="100" x2="45" y2="100" />
      <line x1="155" y1="100" x2="185" y2="100" />
      <line x1="100" y1="22" x2="100" y2="28" strokeWidth={1} />
      <line x1="100" y1="172" x2="100" y2="178" strokeWidth={1} />
      <line x1="22" y1="100" x2="28" y2="100" strokeWidth={1} />
      <line x1="172" y1="100" x2="178" y2="100" strokeWidth={1} />
    </svg>
  );
}

/* Triangle with internal grid — transformation/redesign */
export function TriangleGrid() {
  return (
    <svg {...svgProps}>
      <polygon points="100,20 180,170 20,170" />
      <line x1="60" y1="95" x2="140" y2="95" strokeWidth={0.75} opacity={0.5} />
      <line x1="40" y1="132.5" x2="160" y2="132.5" strokeWidth={0.75} opacity={0.5} />
      <line x1="80" y1="57.5" x2="120" y2="57.5" strokeWidth={0.75} opacity={0.5} />
      <line x1="100" y1="20" x2="100" y2="170" strokeWidth={0.75} opacity={0.5} />
      <line x1="70" y1="72" x2="50" y2="170" strokeWidth={0.75} opacity={0.3} />
      <line x1="130" y1="72" x2="150" y2="170" strokeWidth={0.75} opacity={0.3} />
      <circle cx="100" cy="95" r="3" fill="currentColor" stroke="none" opacity={0.6} />
    </svg>
  );
}

/* Three overlapping circles — collaboration/build */
export function OverlappingCircles() {
  return (
    <svg {...svgProps}>
      <circle cx="82" cy="78" r="45" />
      <circle cx="118" cy="78" r="45" />
      <circle cx="100" cy="112" r="45" />
      <circle cx="100" cy="89" r="3" fill="currentColor" stroke="none" opacity={0.6} />
    </svg>
  );
}

/* Compass crosshair — discovery */
export function CompassCrosshair() {
  return (
    <svg {...svgProps}>
      <circle cx="100" cy="100" r="68" />
      <circle cx="100" cy="100" r="38" strokeDasharray="4 4" />
      <line x1="100" y1="22" x2="100" y2="178" strokeWidth={0.75} />
      <line x1="22" y1="100" x2="178" y2="100" strokeWidth={0.75} />
      <line x1="93" y1="32" x2="107" y2="32" />
      <line x1="93" y1="168" x2="107" y2="168" />
      <line x1="32" y1="93" x2="32" y2="107" />
      <line x1="168" y1="93" x2="168" y2="107" />
      <rect x="96" y="96" width="8" height="8" transform="rotate(45 100 100)" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Blueprint grid — design sprint */
export function BlueprintGrid() {
  return (
    <svg {...svgProps} strokeWidth={0.75}>
      {/* Grid lines */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <line x1={30 + i * 23.3} y1="30" x2={30 + i * 23.3} y2="170" opacity={0.3} />
          <line x1="30" y1={30 + i * 23.3} x2="170" y2={30 + i * 23.3} opacity={0.3} />
        </g>
      ))}
      {/* Highlighted structure */}
      <line x1="53.3" y1="30" x2="53.3" y2="170" strokeWidth={1.5} />
      <line x1="30" y1="76.6" x2="170" y2="76.6" strokeWidth={1.5} />
      <rect x="53.3" y="76.6" width="46.6" height="46.6" strokeWidth={1.5} opacity={0.6} />
      <circle cx="76.6" cy="99.9" r="3" fill="currentColor" stroke="none" opacity={0.5} />
    </svg>
  );
}

/* Interlocking gears — implementation */
export function GearMechanism() {
  return (
    <svg {...svgProps}>
      {/* Gear 1 */}
      <circle cx="78" cy="88" r="32" />
      <circle cx="78" cy="88" r="18" />
      <circle cx="78" cy="88" r="4" fill="currentColor" stroke="none" />
      {/* Teeth on gear 1 */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 78 + Math.cos(rad) * 30;
        const y1 = 88 + Math.sin(rad) * 30;
        const x2 = 78 + Math.cos(rad) * 38;
        const y2 = 88 + Math.sin(rad) * 38;
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={2} />;
      })}
      {/* Gear 2 */}
      <circle cx="128" cy="118" r="24" />
      <circle cx="128" cy="118" r="13" />
      <circle cx="128" cy="118" r="3" fill="currentColor" stroke="none" />
      {/* Teeth on gear 2 */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 128 + Math.cos(rad) * 22;
        const y1 = 118 + Math.sin(rad) * 22;
        const x2 = 128 + Math.cos(rad) * 29;
        const y2 = 118 + Math.sin(rad) * 29;
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={2} />;
      })}
    </svg>
  );
}
