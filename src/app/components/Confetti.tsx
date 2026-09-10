import { useEffect, useRef } from "react";
import canvasConfetti from "canvas-confetti";

interface ConfettiProps {
  trigger?: boolean;
  continuous?: boolean;
}

export function Confetti({ trigger = false, continuous = false }: ConfettiProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fire = () => {
    canvasConfetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#7C3AED", "#A855F7", "#DDD6FE", "#6D28D9", "#C4B5FD", "#ffffff", "#E879F9"],
    });
  };

  useEffect(() => {
    if (trigger) { fire(); fire(); }
  }, [trigger]);

  useEffect(() => {
    if (continuous) {
      intervalRef.current = setInterval(() => {
        canvasConfetti({
          particleCount: 28,
          spread: 60,
          origin: { x: Math.random(), y: 0.3 },
          colors: ["#7C3AED", "#A855F7", "#DDD6FE", "#6D28D9", "#C4B5FD", "#ffffff"],
        });
      }, 900);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [continuous]);

  return null;
}

export function fireConfetti() {
  const count = 300;
  const defaults = { origin: { y: 0.7 } };
  function fireLocal(particleRatio: number, opts: canvasConfetti.Options) {
    canvasConfetti({
      ...defaults, ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ["#7C3AED", "#A855F7", "#DDD6FE", "#6D28D9", "#C4B5FD", "#ffffff", "#E879F9"],
    });
  }
  fireLocal(0.25, { spread: 26, startVelocity: 55 });
  fireLocal(0.2, { spread: 60 });
  fireLocal(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fireLocal(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fireLocal(0.1, { spread: 120, startVelocity: 45 });
}
