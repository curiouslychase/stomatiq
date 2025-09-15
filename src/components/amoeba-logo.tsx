"use client";

type AmoebaLogoProps = {
  size?: number;
  color?: string; // defaults to currentColor
  backgroundColor?: string;
  className?: string;
};

export function AmoebaLogo({
  size = 256,
  color = "currentColor",
  backgroundColor = "transparent",
  className,
}: AmoebaLogoProps) {
  const C = 100; // center

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
    >
      <defs>
        {/* Metaball filter merges cross lobes into one blobby plus shape */}
        <filter id="metaball" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
          <feColorMatrix
            in="b"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -12"
            result="mb"
          />
          <feComposite in="mb" in2="SourceGraphic" operator="atop" />
        </filter>

        {/* Soft shadow for satellites */}
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>

        <radialGradient id="orbGrad" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="85%" stopColor={color} stopOpacity="0.86" />
          <stop offset="100%" stopColor={color} stopOpacity="0.72" />
        </radialGradient>
      </defs>

      {backgroundColor !== "transparent" ? (
        <rect x="0" y="0" width="200" height="200" fill={backgroundColor} />
      ) : null}

      {/* Cross that blends together */}
      <g filter="url(#metaball)" className="cross">
        <circle cx={C} cy={C} r="24" fill="url(#orbGrad)" />
        <circle cx={C} cy={C - 54} r="28" fill="url(#orbGrad)" className="w1" />
        <circle cx={C + 54} cy={C} r="28" fill="url(#orbGrad)" className="w2" />
        <circle cx={C} cy={C + 54} r="28" fill="url(#orbGrad)" className="w3" />
        <circle cx={C - 54} cy={C} r="28" fill="url(#orbGrad)" className="w4" />
      </g>

      {/* Diagonal satellites */}
      <g filter="url(#softShadow)">
        <ellipse
          cx={C - 36}
          cy={C - 36}
          rx="16"
          ry="13"
          fill="url(#orbGrad)"
          className="s1"
        />
        <ellipse
          cx={C + 36}
          cy={C - 36}
          rx="16"
          ry="13"
          fill="url(#orbGrad)"
          className="s2"
        />
        <ellipse
          cx={C + 36}
          cy={C + 36}
          rx="16"
          ry="13"
          fill="url(#orbGrad)"
          className="s3"
        />
        <ellipse
          cx={C - 36}
          cy={C + 36}
          rx="16"
          ry="13"
          fill="url(#orbGrad)"
          className="s4"
        />
      </g>

      <style jsx>{`
        .cross :global(circle) {
          transform-origin: ${C}px ${C}px;
        }
        .w1 {
          animation: driftY 8s ease-in-out infinite;
        }
        .w2 {
          animation: driftX 8.5s ease-in-out infinite;
        }
        .w3 {
          animation: driftY 9s ease-in-out infinite reverse;
        }
        .w4 {
          animation: driftX 8.25s ease-in-out infinite reverse;
        }
        .s1,
        .s2,
        .s3,
        .s4 {
          animation: bob 7.5s ease-in-out infinite;
        }

        @keyframes driftY {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1.6px);
          }
        }
        @keyframes driftX {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(1.6px);
          }
        }
        @keyframes bob {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(0.7px, -0.7px);
          }
        }
      `}</style>
    </svg>
  );
}

export default AmoebaLogo;
