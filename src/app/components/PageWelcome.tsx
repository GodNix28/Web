import { motion } from "motion/react";
import { FloatingHearts } from "./FloatingHearts";
import { Confetti } from "./Confetti";

interface PageWelcomeProps {
  onNext: () => void;
}

export function PageWelcome({ onNext }: PageWelcomeProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F3FF",
        backgroundImage:
          "linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "24px",
      }}
    >
      <FloatingHearts count={18} colors={["#7C3AED", "#A855F7", "#DDD6FE", "#6D28D9"]} />
      <Confetti continuous />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", damping: 15 }}
        style={{
          background: "#fff",
          borderRadius: "32px",
          padding: "clamp(32px, 8vw, 56px)",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 80px rgba(124,58,237,0.2), 0 4px 16px rgba(0,0,0,0.06)",
          border: "2px solid rgba(124,58,237,0.12)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: "clamp(4rem, 14vw, 7rem)", marginBottom: "16px" }}
        >
          🌸
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.4rem, 5vw, 2.3rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}
          >
            Happy Birthday, Dundu 💜🎂
          </h1>

          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1rem, 3vw, 1.2rem)",
              color: "#A855F7",
              marginBottom: "12px",
              fontWeight: 700,
            }}
          >
            My Kanamma. My Akka. My Everything. 🌙
          </p>

          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "clamp(0.9rem, 2.3vw, 1rem)",
              color: "#4C1D95",
              lineHeight: 1.8,
              marginBottom: "32px",
              fontWeight: 500,
            }}
          >
            We met exactly a year ago — on this very day, your birthday — and you changed
            everything. You're not just my best friend. You're the elder sister my heart
            chose when life wasn't giving me easy. This journey is my small way of saying
            what words alone never could. 💜
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(124,58,237,0.45)" }}
            whileTap={{ scale: 0.96 }}
            onClick={onNext}
            style={{
              background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "16px 52px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 28px rgba(124,58,237,0.4)",
              letterSpacing: "0.02em",
            }}
          >
            Begin This Journey 🌟
          </motion.button>
        </motion.div>

        {/* Floating cats */}
        {["🐱", "🐾"].map((emoji, i) => (
          <motion.div
            key={`cat-${i}`}
            style={{
              position: "absolute", fontSize: "1.6rem",
              ...[{ top: "50%", left: "8px" }, { top: "50%", right: "8px" }][i],
            }}
            animate={{ y: [-6, 6], rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
            transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            {emoji}
          </motion.div>
        ))}

        {["💜", "🌸", "✨", "🌙"].map((emoji, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute", fontSize: "1.4rem",
              ...[{ top: "12px", left: "16px" }, { top: "12px", right: "16px" }, { bottom: "12px", left: "16px" }, { bottom: "12px", right: "16px" }][i],
            }}
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
          >
            {emoji}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
