"use client";

import { useRef, useEffect } from "react";

/* ── Helpers ── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeIO = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
const clamp = (t: number) => Math.max(0, Math.min(1, t));
const rgba = (c: number[], a: number) =>
  `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/* ── Colors ── */
const CP = [139, 126, 200]; // #8B7EC8
const CL = [107, 114, 128]; // #6B7280

/* ── Canvas ── */
const W = 700;
const H = 580;

/* ── Aligned target ── */
const A_TILT = 0.26; // ~15°
const A_SPEED = 0.8;
const A_CX = 350;
const A_CY = 255;

/* ── Ring definitions ── */
const RINGS = [
  // inner
  { ct: -0.52, crx: 125, cry: 58, cs: 0.5, ccx: 338, ccy: 250,
    arx: 130, ary: 50, n: 5, phase: 0, label: "Workflows" },
  // middle
  { ct: 0.70, crx: 200, cry: 85, cs: 1.1, ccx: 362, ccy: 262,
    arx: 200, ary: 77, n: 4, phase: 0.39, label: "Org" },
  // outer
  { ct: -0.09, crx: 270, cry: 110, cs: 0.3, ccx: 348, ccy: 256,
    arx: 270, ary: 103, n: 6, phase: 0.63, label: "Mindset" },
];

/* ── Lock timing (seconds) ── */
const LOCKS: [number, number][] = [
  [2.0, 3.2],
  [3.5, 4.7],
  [5.0, 6.2],
];
const LBL_FADE_S = 8.5;
const LBL_FADE_E = 9.5;

/* ── Loop timing ── */
const CYCLE = 12;       // total loop duration (seconds)
const FADE_IN = 0.8;    // fade-in at cycle start
const FADE_OUT = 1.0;   // fade-out at cycle end

const TOTAL_P = RINGS.reduce((s, r) => s + r.n, 0);

/* ── Position on tilted ellipse ── */
function rpos(
  cx: number, cy: number, rx: number, ry: number,
  tilt: number, a: number,
): [number, number] {
  const ca = Math.cos(a), sa = Math.sin(a);
  const ct = Math.cos(tilt), st = Math.sin(tilt);
  return [
    cx + rx * ca * ct - ry * sa * st,
    cy + rx * ca * st + ry * sa * ct,
  ];
}

export function HeroAbstract() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const wrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = cvRef.current;
    const wr = wrRef.current;
    if (!cv || !wr) return;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const w = wr!.clientWidth;
      const s = w / W;
      cv!.width = w * dpr;
      cv!.height = H * s * dpr;
      cv!.style.width = w + "px";
      cv!.style.height = H * s + "px";
      ctx.setTransform(dpr * s, 0, 0, dpr * s, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wr);

    const t0 = performance.now();
    let last = t0;
    let raf = 0;

    /* ── State ── */
    let sharedA = 0;
    const chaosA = [0, 0.8, 1.6]; // staggered starts
    const stall = [1, 1, 1];
    let lastCycle = 0;

    // Pre-allocated particle buffers
    const ppx = new Float64Array(TOTAL_P);
    const ppy = new Float64Array(TOTAL_P);
    const ppd = new Float64Array(TOTAL_P); // depth
    const ppri = new Uint8Array(TOTAL_P); // ring index
    const sortIdx = Array.from({ length: TOTAL_P }, (_, i) => i);

    function draw() {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const el = (now - t0) / 1000;

      // Cycle tracking
      const cycleNum = Math.floor(el / CYCLE);
      const cel = el - cycleNum * CYCLE;

      // Reset state on new cycle
      if (cycleNum !== lastCycle) {
        lastCycle = cycleNum;
        chaosA[0] = 0; chaosA[1] = 0.8; chaosA[2] = 1.6;
        stall[0] = 1; stall[1] = 1; stall[2] = 1;
      }

      // Global fade in/out between cycles
      let globalAlpha = 1;
      if (cel < FADE_IN) globalAlpha = cel / FADE_IN;
      if (cel > CYCLE - FADE_OUT) globalAlpha = (CYCLE - cel) / FADE_OUT;

      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = globalAlpha;

      // Lock progress per ring (use cycle-local time)
      const lk = RINGS.map((_, i) =>
        easeIO(clamp((cel - LOCKS[i][0]) / (LOCKS[i][1] - LOCKS[i][0]))),
      );
      const allLocked = lk[0] >= 1 && lk[1] >= 1 && lk[2] >= 1;

      // Advance angles
      sharedA += A_SPEED * dt;
      for (let i = 0; i < 3; i++) {
        const noise = Math.sin(cel * 2.3 + i * 1.7) * 0.15 * RINGS[i].cs;
        chaosA[i] += (RINGS[i].cs + noise) * stall[i] * dt;
      }

      // ── Compute particle positions ──
      let pi = 0;
      for (let ri = 0; ri < 3; ri++) {
        const r = RINGS[ri];
        const l = lk[ri];
        const tilt = lerp(r.ct, A_TILT, l);
        const rx = lerp(r.crx, r.arx, l);
        const ry = lerp(r.cry, r.ary, l);
        const cx = lerp(r.ccx, A_CX, l);
        const cy = lerp(r.ccy, A_CY, l);

        for (let j = 0; j < r.n; j++) {
          const cAng = chaosA[ri] + j * (Math.PI * 2 / r.n);
          const aAng = sharedA + r.phase + j * (Math.PI * 2 / r.n);
          const ang = lerp(cAng, aAng, l);
          const [x, y] = rpos(cx, cy, rx, ry, tilt, ang);
          ppx[pi] = x;
          ppy[pi] = y;
          ppd[pi] = Math.sin(ang);
          ppri[pi] = ri;
          pi++;
        }
      }

      // ── Near-collision stalling ──
      if (!allLocked) {
        for (let i = 0; i < 3; i++)
          stall[i] = Math.min(stall[i] + dt * 4, 1.0);

        for (let a = 0; a < TOTAL_P; a++) {
          for (let b = a + 1; b < TOTAL_P; b++) {
            if (ppri[a] === ppri[b]) continue;
            const dx = ppx[a] - ppx[b];
            const dy = ppy[a] - ppy[b];
            if (dx * dx + dy * dy < 625) {
              stall[ppri[a]] = Math.min(stall[ppri[a]], 0.2);
              stall[ppri[b]] = Math.min(stall[ppri[b]], 0.2);
            }
          }
        }
      }

      // ── Draw rings (outer to inner for layering) ──
      for (let ri = 2; ri >= 0; ri--) {
        const r = RINGS[ri];
        const l = lk[ri];
        const tilt = lerp(r.ct, A_TILT, l);
        const rx = lerp(r.crx, r.arx, l);
        const ry = lerp(r.cry, r.ary, l);
        const cx = lerp(r.ccx, A_CX, l);
        const cy = lerp(r.ccy, A_CY, l);

        // Soft glow
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, tilt, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(CP, 0.04);
        ctx.lineWidth = 5;
        ctx.stroke();

        // Back half (far from viewer = dim)
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, tilt, Math.PI, Math.PI * 2);
        ctx.strokeStyle = rgba(CP, 0.08);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Front half (near viewer = brighter)
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, tilt, 0, Math.PI);
        ctx.strokeStyle = rgba(CP, 0.2);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Draw particles (depth-sorted) ──
      sortIdx.sort((a, b) => ppd[a] - ppd[b]);

      for (const idx of sortIdx) {
        const depth = ppd[idx] * 0.5 + 0.5; // 0 (back) to 1 (front)
        const op = 0.35 + 0.65 * depth;
        const sz = lerp(1.8, 3.5, depth);

        ctx.beginPath();
        ctx.arc(ppx[idx], ppy[idx], sz, 0, Math.PI * 2);
        ctx.fillStyle = rgba(CP, op * 0.9);
        ctx.fill();
      }

      // ── Labels ──
      const lblX = [175, A_CX, 525];
      const lblY = A_CY + 150;

      for (let i = 0; i < 3; i++) {
        if (lk[i] < 1) continue;
        let op = clamp((cel - LOCKS[i][1]) / 0.8);
        if (cel > LBL_FADE_S)
          op *= 1 - clamp((cel - LBL_FADE_S) / (LBL_FADE_E - LBL_FADE_S));
        if (op < 0.01) continue;

        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.fillStyle = rgba(CL, op * 0.7);
        ctx.fillText(RINGS[i].label, lblX[i], lblY);
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrRef} className="hero-abstract">
      <canvas ref={cvRef} aria-hidden="true" style={{ display: "block" }} />
    </div>
  );
}
