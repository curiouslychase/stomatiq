interface LogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function Logo({ className, size = 48, animated = false }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1149 1149"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? "logo-animated" : ""} ${className ?? ""}`}
    >
      <g className="cardinal-group" style={{ transformOrigin: "574px 574px" }}>
        <ellipse cx="159.468" cy="113.171" rx="159.468" ry="113.171" transform="matrix(1 0 0 -1 414.643 226.342)" fill="currentColor" />
        <ellipse cx="159.468" cy="113.171" rx="159.468" ry="113.171" transform="matrix(0 1 1 0 921.88 414.643)" fill="currentColor" />
        <ellipse cx="159.468" cy="113.171" rx="159.468" ry="113.171" transform="matrix(-1 0 0 1 733.58 921.88)" fill="currentColor" />
        <ellipse cx="159.468" cy="113.171" rx="159.468" ry="113.171" transform="matrix(0 -1 -1 0 226.342 733.58)" fill="currentColor" />
      </g>
      <ellipse className="center-ellipse" cx="574.143" cy="573.5" rx="121.5" ry="122.5" fill="currentColor" />
      <g className="diagonal-group" style={{ transformOrigin: "574px 574px" }}>
        <ellipse cx="305.821" cy="294.178" rx="128.481" ry="88.1456" transform="rotate(-45 305.821 294.178)" fill="currentColor" />
        <ellipse cx="838.924" cy="304.178" rx="128.481" ry="88.1456" transform="rotate(45 838.924 304.178)" fill="currentColor" />
        <ellipse cx="838.923" cy="827.281" rx="128.481" ry="88.1456" transform="rotate(135 838.923 827.281)" fill="currentColor" />
        <ellipse cx="305.821" cy="837.281" rx="128.481" ry="88.1456" transform="rotate(-135 305.821 837.281)" fill="currentColor" />
      </g>
    </svg>
  );
}
