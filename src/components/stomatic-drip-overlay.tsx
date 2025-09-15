type Props = {
  size?: number;
  className?: string;
  color?: string; // defaults to currentColor
};

// Subtle ink "drip" overlay. Renders beneath the base logo.
export function StomaticDripOverlay({
  size = 111,
  className,
  color = "currentColor",
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 111 111"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <filter id="dripSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Vertical line that elongates (center ↔ top/bottom) */}
      <g
        stroke={color}
        strokeLinecap="round"
        strokeWidth="4"
        fill="none"
        opacity="0.65"
      >
        {/* Upwards */}
        <path d="M55 55 L55 33" pathLength="100">
          <animate
            attributeName="stroke-dasharray"
            values="0,100;100,0;0,100"
            keyTimes="0;0.5;1"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        {/* Downwards (staggered) */}
        <path d="M55 55 L55 78" pathLength="100">
          <animate
            attributeName="stroke-dasharray"
            values="0,100;100,0;0,100"
            keyTimes="0;0.5;1"
            dur="8s"
            begin="1.2s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Horizontal line that elongates (center ↔ left/right), phase-shifted */}
      <g
        stroke={color}
        strokeLinecap="round"
        strokeWidth="4"
        fill="none"
        opacity="0.65"
      >
        {/* Left */}
        <path d="M55 55 L33 55" pathLength="100">
          <animate
            attributeName="stroke-dasharray"
            values="0,100;100,0;0,100"
            keyTimes="0;0.5;1"
            dur="8s"
            begin="4s"
            repeatCount="indefinite"
          />
        </path>
        {/* Right */}
        <path d="M55 55 L78 55" pathLength="100">
          <animate
            attributeName="stroke-dasharray"
            values="0,100;100,0;0,100"
            keyTimes="0;0.5;1"
            dur="8s"
            begin="5.2s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
}

export default StomaticDripOverlay;
