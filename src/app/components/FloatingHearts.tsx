import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingHeartsProps {
  count?: number;
  colors?: string[];
}

export function FloatingHearts({ count = 15, colors = ["#7C3AED", "#A855F7", "#DDD6FE", "#6D28D9", "#C4B5FD"] }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.45 + 0.15,
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
            fontSize: heart.size,
            opacity: heart.opacity,
            color: colors[heart.id % colors.length],
          }}
          animate={{
            y: [0, -(window.innerHeight + 100)],
            x: [0, Math.sin(heart.id) * 80],
            rotate: [0, 360],
            opacity: [heart.opacity, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
