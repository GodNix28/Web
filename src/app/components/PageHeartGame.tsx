import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { fireConfetti } from "./Confetti";

interface FallingHeart {
  id: number;
  x: number;
  speed: number;
  size: number;
  emoji: string;
}

interface Props {
  onNext: () => void;
}

const EMOJIS = ["❤️", "💕", "💖", "💗", "💝", "🩷"];

export function PageHeartGame({ onNext }: Props) {
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [missed, setMissed] = useState(0);
  const nextIdRef = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setScore(0);
    setMissed(0);
    setTimeLeft(30);
    setHearts([]);
    setGameState("playing");
  };

  const catchHeart = useCallback((id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((s) => s + 1);
  }, []);

  // Spawn hearts
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      const id = nextIdRef.current++;
      setHearts((prev) => [
        ...prev.slice(-20),
        {
          id,
          x: Math.random() * 85,
          speed: Math.random() * 2.5 + 1.5,
          size: Math.random() * 20 + 28,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        },
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, [gameState]);

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameState("ended");
          fireConfetti();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Remove hearts that fall off screen and count misses
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      setHearts((prev) => {
        const remaining = prev.filter((h) => true);
        return remaining;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [gameState]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F3E8FF 0%, #F5F3FF 60%, #DDD6FE 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "24px", zIndex: 10, position: "relative" }}
      >
        <div style={{ fontSize: "2.5rem" }}>🎮</div>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
            fontWeight: 900,
            color: "#7C3AED",
          }}
        >
          Catch The Hearts!
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6D4C9E", fontSize: "0.95rem" }}>
          Tap the falling hearts before they disappear! 💕
        </p>
      </motion.div>

      {/* Game card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "32px",
          padding: "24px",
          maxWidth: "480px",
          width: "100%",
          boxShadow: "0 20px 60px rgba(124,58,237,0.2)",
          border: "2px solid rgba(124,58,237,0.15)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Score + Timer */}
        {gameState !== "idle" && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "#7C3AED",
              }}
            >
              ❤️ {score}
            </div>
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: "1.2rem",
                color: timeLeft <= 10 ? "#7C3AED" : "#6D28D9",
              }}
            >
              ⏱ {timeLeft}s
            </div>
          </div>
        )}

        {/* Game area */}
        <div
          ref={gameAreaRef}
          style={{
            height: "360px",
            borderRadius: "20px",
            background: "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)",
            position: "relative",
            overflow: "hidden",
            border: "2px dashed rgba(124,58,237,0.2)",
          }}
        >
          <AnimatePresence>
            {gameState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <motion.div
                  animate={{ y: [-5, 5] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  style={{ fontSize: "4rem" }}
                >
                  💝
                </motion.div>
                <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6D4C9E", textAlign: "center" }}>
                  Hearts will fall from the sky.<br />Catch as many as you can!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "14px 40px",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
                  }}
                >
                  Start! 🎮
                </motion.button>
              </motion.div>
            )}

            {gameState === "ended" && (
              <motion.div
                key="ended"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  background: "rgba(255,255,255,0.95)",
                  zIndex: 10,
                }}
              >
                <div style={{ fontSize: "4rem" }}>🎉</div>
                <div
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 900,
                    fontSize: "2rem",
                    color: "#7C3AED",
                  }}
                >
                  {score} Hearts!
                </div>
                <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6D4C9E", textAlign: "center", fontSize: "0.95rem" }}>
                  {score >= 20 ? "Amazing! You're a heart-catching champion! 🏆" : score >= 10 ? "Great job! Dundu approves! 💜" : "Nice try! Every heart counts! ❤️"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "12px 32px",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
                  }}
                >
                  Play Again 🔄
                </motion.button>
              </motion.div>
            )}

            {gameState === "playing" &&
              hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  initial={{ y: -50 }}
                  animate={{ y: 400 }}
                  transition={{ duration: heart.speed + (30 - timeLeft) * 0.02, ease: "linear" }}
                  onAnimationComplete={() => {
                    setHearts((prev) => prev.filter((h) => h.id !== heart.id));
                  }}
                  onClick={() => catchHeart(heart.id)}
                  style={{
                    position: "absolute",
                    left: `${heart.x}%`,
                    fontSize: heart.size,
                    cursor: "pointer",
                    userSelect: "none",
                    zIndex: 5,
                    filter: "drop-shadow(0 4px 8px rgba(255,77,141,0.3))",
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0 }}
                >
                  {heart.emoji}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        style={{
          marginTop: "24px",
          background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
          color: "#fff",
          border: "none",
          borderRadius: "999px",
          padding: "16px 48px",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
          position: "relative",
          zIndex: 10,
        }}
      >
        Color Something Pretty 🎨
      </motion.button>
    </div>
  );
}
