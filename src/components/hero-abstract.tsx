"use client";

import { useRef, useEffect } from "react";

/* ── PRNG (deterministic layout) ── */
function prng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ── Math ── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
const dst = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
const rgba = (c: number[], a: number) =>
  `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const lerpC = (a: number[], b: number[], t: number): number[] => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
];

/* ── Colors ── */
const CN = [61, 61, 93]; // node #3D3D5D
const CE = [45, 45, 61]; // edge #2D2D3D
const CP = [139, 126, 200]; // purple #8B7EC8

/* ── Layout ── */
const W = 600;
const HD = 550;
const HM = 500;
const CDIST = 110;
const DUR = 4.0;
const DELAY = 2000;

/* ── Types ── */
interface N {
  x: number; y: number;
  vx: number; vy: number;
  ox: number; oy: number;
  r: number; ir: number;
  op: number; alive: boolean;
  surv: boolean; tgt: number;
  flash: number;
}
interface E { a: number; b: number; op: number }
interface P { from: number; to: number; t: number; spd: number; op: number; fading: boolean }
interface F { curve: number; t: number }

export function HeroAbstract() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const wrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = cvRef.current;
    const wr = wrRef.current;
    if (!cv || !wr) return;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mob = window.innerWidth < 768;
    const H = mob ? HM : HD;
    const ms = mob ? 1.5 : 1;

    /* ── Resize ── */
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

    /* ── Generate ── */
    const R = prng(73);
    const cnt = mob ? 18 : 25;
    const cx = W / 2, cy = H / 2;

    const nodes: N[] = [];
    for (let i = 0; i < cnt; i++) {
      const a = R() * Math.PI * 2;
      const d = (R() + R()) / 2 * 180;
      const x = cx + Math.cos(a) * d * 1.0;
      const y = cy + Math.sin(a) * d * 0.85;
      const nr = (2 + R() * 1.5) * ms;
      nodes.push({
        x, y, vx: (R() - 0.5) * 0.3, vy: (R() - 0.5) * 0.3,
        ox: x, oy: y, r: nr, ir: nr,
        op: 0.5 + R() * 0.3, alive: true,
        surv: false, tgt: -1, flash: 0,
      });
    }

    // 4 survivors spread by x position
    const byX = [...Array(cnt).keys()].sort((a, b) => nodes[a].x - nodes[b].x);
    const si = [
      byX[Math.floor(cnt * 0.12)],
      byX[Math.floor(cnt * 0.37)],
      byX[Math.floor(cnt * 0.63)],
      byX[Math.floor(cnt * 0.88)],
    ];
    for (const i of si) nodes[i].surv = true;

    // Assign merge targets
    for (let i = 0; i < cnt; i++) {
      if (nodes[i].surv) { nodes[i].tgt = i; continue; }
      let best = si[0], bd = Infinity;
      for (const s of si) {
        const dd = dst(nodes[i].x, nodes[i].y, nodes[s].x, nodes[s].y);
        if (dd < bd) { bd = dd; best = s; }
      }
      nodes[i].tgt = best;
    }

    // Final arc positions
    const arcW = W * 0.7, arcX0 = (W - arcW) / 2;
    const fins: [number, number][] = si.map((_, i) => {
      const t = i / 3;
      return [arcX0 + t * arcW, cy + Math.sin(t * Math.PI) * -20];
    });

    // Edges
    const edges: E[] = [];
    for (let i = 0; i < cnt; i++)
      for (let j = i + 1; j < cnt; j++)
        if (dst(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y) < CDIST)
          edges.push({ a: i, b: j, op: 0.3 + R() * 0.35 });

    // Adjacency for pulse navigation
    const adj: number[][] = Array.from({ length: cnt }, () => []);
    for (const e of edges) { adj[e.a].push(e.b); adj[e.b].push(e.a); }

    // Pulses
    const pulses: P[] = [];
    for (let i = 0; i < 8; i++) {
      const ei = Math.floor(R() * edges.length);
      pulses.push({
        from: edges[ei].a, to: edges[ei].b,
        t: R(), spd: 0.4 + R() * 0.6,
        op: 0, fading: false,
      });
    }

    // Flow dots for final state
    const flowDots: F[] = [];
    for (let c = 0; c < 3; c++)
      for (let i = 0; i < 2; i++)
        flowDots.push({ curve: c, t: i * 0.5 + c * 0.15 });

    /* ── Animation state ── */
    let phase: "idle" | "anim" | "done" = "idle";
    let animStart = 0;
    let triggered = false;
    let last = performance.now();
    let raf = 0;

    /* ── Trigger on scroll ── */
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          setTimeout(() => {
            for (const n of nodes) { n.ox = n.x; n.oy = n.y; n.ir = n.r; }
            phase = "anim";
            animStart = performance.now();
          }, DELAY);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(wr);

    /* ── Quadratic bezier point ── */
    function qBez(
      ax: number, ay: number,
      cx_: number, cy_: number,
      bx: number, by: number,
      t: number,
    ): [number, number] {
      const u = 1 - t;
      return [
        u * u * ax + 2 * u * t * cx_ + t * t * bx,
        u * u * ay + 2 * u * t * cy_ + t * t * by,
      ];
    }

    /* ── Draw loop ── */
    function draw() {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      let p = 0;
      if (phase === "anim") {
        p = Math.min((now - animStart) / 1000 / DUR, 1);
        if (p >= 1) phase = "done";
      } else if (phase === "done") {
        p = 1;
      }

      ctx.clearRect(0, 0, W, H);

      /* ──── IDLE ──── */
      if (phase === "idle") {
        for (const n of nodes) {
          n.x += n.vx * dt * 25;
          n.y += n.vy * dt * 25;
          n.vx += (n.ox - n.x) * 0.001;
          n.vy += (n.oy - n.y) * 0.001;
          n.vx += (Math.random() - 0.5) * 0.012;
          n.vy += (Math.random() - 0.5) * 0.012;
          n.vx *= 0.99;
          n.vy *= 0.99;
        }

        for (const e of edges) {
          ctx.beginPath();
          ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
          ctx.lineTo(nodes[e.b].x, nodes[e.b].y);
          ctx.strokeStyle = rgba(CE, e.op * 0.6);
          ctx.lineWidth = 0.7 * ms;
          ctx.stroke();
        }

        for (const pl of pulses) {
          pl.t += pl.spd * dt;
          if (!pl.fading) pl.op = Math.min(0.65, pl.op + dt * 3);

          if (pl.t >= 1) {
            const nbrs = adj[pl.to].filter((n) => n !== pl.from);
            if (nbrs.length === 0) {
              pl.fading = true;
            } else {
              pl.from = pl.to;
              pl.to = nbrs[Math.floor(Math.random() * nbrs.length)];
              pl.t = 0;
            }
          }

          if (pl.fading) {
            pl.op -= dt * 2;
            if (pl.op <= 0) {
              const ei = Math.floor(Math.random() * edges.length);
              pl.from = edges[ei].a;
              pl.to = edges[ei].b;
              pl.t = 0;
              pl.op = 0;
              pl.fading = false;
              continue;
            }
          }

          const na = nodes[pl.from], nb = nodes[pl.to];
          const px = lerp(na.x, nb.x, pl.t);
          const py = lerp(na.y, nb.y, pl.t);
          ctx.beginPath();
          ctx.arc(px, py, 1.5 * ms, 0, Math.PI * 2);
          ctx.fillStyle = rgba([80, 80, 120], pl.op);
          ctx.fill();
        }

        for (const n of nodes) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = rgba(CN, n.op);
          ctx.fill();
        }

      /* ──── COLLAPSING / DONE ──── */
      } else {
        const ep = ease(p);
        const P1 = 0.375;
        const P2 = 0.75;

        for (let i = 0; i < cnt; i++) {
          const n = nodes[i];
          if (!n.alive) continue;

          if (n.surv) {
            const idx = si.indexOf(i);
            const [fx, fy] = fins[idx];
            let mt: number;
            if (p < P1) {
              mt = (p / P1) * 0.15;
            } else {
              mt = 0.15 + ((p - P1) / (1 - P1)) * 0.85;
            }
            mt = ease(Math.min(mt, 1));
            n.x = lerp(n.ox, fx, mt);
            n.y = lerp(n.oy, fy, mt);
            if (p > P2) {
              n.r = lerp(n.ir, 7 * ms, ease((p - P2) / (1 - P2)));
            }
          } else {
            const tgt = nodes[n.tgt];
            const mt = ease(Math.min(p / P2, 1));
            n.x = lerp(n.ox, tgt.x, mt);
            n.y = lerp(n.oy, tgt.y, mt);
            if (dst(n.x, n.y, tgt.x, tgt.y) < 15) {
              n.op -= dt * 4;
              if (n.op <= 0) {
                n.alive = false;
                tgt.flash = 0.2;
              }
            }
          }
          if (n.flash > 0) n.flash -= dt;
        }

        for (const e of edges) {
          if (!nodes[e.a].alive && !nodes[e.b].alive) continue;
          const bs = nodes[e.a].surv && nodes[e.b].surv;
          let op = e.op * 0.5;
          if (!bs) op *= Math.max(0, 1 - p * 2.5);
          else op *= Math.max(0, 1 - p * 1.8);
          if (op < 0.005) continue;
          ctx.beginPath();
          ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
          ctx.lineTo(nodes[e.b].x, nodes[e.b].y);
          ctx.strokeStyle = rgba(lerpC(CE, CP, ep * 0.3), op);
          ctx.lineWidth = 0.7 * ms;
          ctx.stroke();
        }

        if (p > P1) {
          const ct = ease(Math.min((p - P1) / (1 - P1), 1));

          for (let i = 0; i < 3; i++) {
            const na = nodes[si[i]], nb = nodes[si[i + 1]];
            const mx = (na.x + nb.x) / 2;
            const my = Math.min(na.y, nb.y) - 25;

            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.quadraticCurveTo(mx, my, nb.x, nb.y);
            ctx.strokeStyle = rgba(CP, ct * 0.12);
            ctx.lineWidth = 8 * ms;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.quadraticCurveTo(mx, my, nb.x, nb.y);
            ctx.strokeStyle = rgba(CP, ct * 0.6);
            ctx.lineWidth = 1.5 * ms;
            ctx.stroke();
          }

          if (ct > 0.4) {
            const fop = ease(Math.min((ct - 0.4) / 0.6, 1));
            for (const fd of flowDots) {
              fd.t = (fd.t + 0.18 * dt) % 1;
              const na = nodes[si[fd.curve]];
              const nb = nodes[si[fd.curve + 1]];
              const mx = (na.x + nb.x) / 2;
              const my = Math.min(na.y, nb.y) - 25;
              const [px, py] = qBez(na.x, na.y, mx, my, nb.x, nb.y, fd.t);
              ctx.beginPath();
              ctx.arc(px, py, 2.5 * ms, 0, Math.PI * 2);
              ctx.fillStyle = rgba(CP, fop * 0.85);
              ctx.fill();
            }
          }
        }

        for (const n of nodes) {
          if (!n.alive || n.op < 0.01) continue;
          const nc = n.surv ? lerpC(CN, CP, ep) : CN;
          const fb = n.flash > 0 ? 0.5 : 0;

          if (n.surv && p > P2) {
            const gt = ease((p - P2) / (1 - P2));
            const breath =
              phase === "done"
                ? 0.08 + Math.sin(now / 1500) * 0.04
                : 0.1;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + 8 * ms, 0, Math.PI * 2);
            ctx.fillStyle = rgba(CP, gt * breath);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = rgba(nc, Math.min(n.op + fb, 1));
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrRef} className="hero-abstract">
      <canvas ref={cvRef} aria-hidden="true" style={{ display: "block" }} />
    </div>
  );
}
