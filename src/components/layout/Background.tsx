import { useEffect, useRef } from "react";
import { useMotion } from "../../hooks/useMotion";
import { useTheme } from "../providers/ThemeProvider";

type Ripple = { x: number; y: number; radius: number; alpha: number };

const SPACING = 48;
const PROXIMITY_RADIUS = 180;
const GLOW_RADIUS = 210;
const RIPPLE_INTERVAL_MS = 80;
const MAX_RIPPLES = 10;

export default function Background() {
  const { reduced } = useMotion();
  const { theme } = useTheme();
  const ACCENT = theme.rgb;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const rawCanvas = canvasRef.current;
    if (!rawCanvas) return;
    const canvas: HTMLCanvasElement = rawCanvas;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const mouse = { x: -9999, y: -9999, active: false };
    const ripples: Ripple[] = [];
    let lastRippleAt = 0;
    let frame = 0;
    let raf: number;

    function buildDots() {
      const out: { x: number; y: number; phase: number }[] = [];
      for (let col = 0; col * SPACING <= W + SPACING; col++) {
        for (let row = 0; row * SPACING <= H + SPACING; row++) {
          out.push({ x: col * SPACING, y: row * SPACING, phase: Math.random() * Math.PI * 2 });
        }
      }
      return out;
    }
    let dots = buildDots();

    function tick() {
      raf = requestAnimationFrame(tick);
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Ambient glow position: cursor on desktop, slow drift on mobile/touch
      const t = frame * 0.004;
      const ambientX = W * 0.5 + Math.sin(t) * W * 0.28;
      const ambientY = H * 0.32 + Math.cos(t * 0.71) * H * 0.18;
      const mx = mouse.active ? mouse.x : ambientX;
      const my = mouse.active ? mouse.y : ambientY;

      // Dot grid
      for (const dot of dots) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const prox = Math.max(0, 1 - dist / PROXIMITY_RADIUS);
        const breathe = Math.sin(frame * 0.016 + dot.phase) * 0.01;
        const alpha = 0.04 + prox * 0.38 + breathe;
        const r = 1 + prox * 2;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${Math.min(alpha, 0.48)})`;
        ctx.fill();
      }

      // Ripple rings
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 2.0;
        rp.alpha *= 0.958;
        if (rp.alpha < 0.006) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACCENT}, ${rp.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Soft ambient glow orb
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, GLOW_RADIUS);
      grad.addColorStop(0, `rgba(${ACCENT}, 0.055)`);
      grad.addColorStop(0.5, `rgba(${ACCENT}, 0.022)`);
      grad.addColorStop(1, `rgba(${ACCENT}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(mx - GLOW_RADIUS, my - GLOW_RADIUS, GLOW_RADIUS * 2, GLOW_RADIUS * 2);
    }

    tick();

    function spawnRipple(x: number, y: number) {
      const now = performance.now();
      if (now - lastRippleAt > RIPPLE_INTERVAL_MS) {
        ripples.push({ x, y, radius: 2, alpha: 0.14 });
        if (ripples.length > MAX_RIPPLES) ripples.shift();
        lastRippleAt = now;
      }
    }

    function onMove(e: MouseEvent) {
      spawnRipple(e.clientX, e.clientY);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }

    function onTouch(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      spawnRipple(t.clientX, t.clientY);
      mouse.x = t.clientX;
      mouse.y = t.clientY;
      mouse.active = true;
    }

    function onTouchEnd() {
      mouse.active = false;
    }

    function onLeave() {
      mouse.active = false;
    }

    // Debounce resize and ignore keyboard-triggered height-only shrinks (mobile)
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newW = window.innerWidth;
        const newH = window.innerHeight;
        // Skip if only the height shrank (soft keyboard appeared on mobile)
        if (newW === W && newH < H * 0.8) return;
        W = newW;
        H = newH;
        canvas.width = W;
        canvas.height = H;
        dots = buildDots();
      }, 150);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, ACCENT]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {reduced ? (
        <div
          style={{
            backgroundImage: `radial-gradient(circle, rgba(${ACCENT}, 0.1) 1px, transparent 1px)`,
            backgroundSize: `${SPACING}px ${SPACING}px`,
          }}
          className="absolute inset-0"
        />
      ) : (
        <>
          <canvas ref={canvasRef} className="absolute inset-0" style={{ display: "block" }} />
          {/* Vignette: full visibility at top (hero), dims toward content sections */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(9,9,11,0.35) 65%, rgba(9,9,11,0.55) 100%)",
            }}
          />
        </>
      )}
    </div>
  );
}
