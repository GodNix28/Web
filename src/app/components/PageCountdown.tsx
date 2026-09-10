import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FloatingHearts } from "./FloatingHearts";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface PageCountdownProps {
  onComplete: () => void;
}

const BIRTHDAY = new Date("2025-07-23T00:00:00");

function getNextBirthday(): Date {
  const now = new Date();
  const thisYear = new Date(now.getFullYear(), 6, 23); // July is month 6
  if (now > thisYear) {
    return new Date(now.getFullYear() + 1, 6, 23);
  }
  return thisYear;
}

function getTimeLeft(): TimeLeft {
  const target = getNextBirthday();
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function CountCard({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      style={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: "24px",
        padding: "20px 16px",
        minWidth: "80px",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      <motion.div
        key={value}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1,
          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <div
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "clamp(0.65rem, 2vw, 0.85rem)",
          fontWeight: 700,
          color: "rgba(255,255,255,0.85)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginTop: "6px",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

const Sparkle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    style={{ position: "absolute", left: `${x}%`, top: `${y}%`, fontSize: "1.2rem" }}
    animate={{ scale: [0, 1, 0], rotate: [0, 180, 360], opacity: [0, 1, 0] }}
    transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: Math.random() * 3 }}
  >
    ✨
  </motion.div>
);

export function PageCountdown({ onComplete }: PageCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [birthdayNow, setBirthdayNow] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const tl = getTimeLeft();
      setTimeLeft(tl);
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setBirthdayNow(true);
        clearInterval(timer);
        setTimeout(onComplete, 3000);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete]);

  const sparkles = [
    { x: 10, y: 15, delay: 0 },
    { x: 85, y: 20, delay: 0.5 },
    { x: 5, y: 70, delay: 1 },
    { x: 90, y: 65, delay: 1.5 },
    { x: 50, y: 5, delay: 0.3 },
    { x: 20, y: 85, delay: 0.8 },
    { x: 75, y: 80, delay: 1.2 },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2D006F 0%, #6B21A8 30%, #C850C0 65%, #FF4D8D 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "24px",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <FloatingHearts count={20} colors={["#FF4D8D", "#FF8FAB", "#FFD6E7", "#C850C0", "#FFCA28"]} />

      {sparkles.map((s, i) => (
        <Sparkle key={i} {...s} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "600px", width: "100%" }}
      >
        {/* Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: "clamp(4rem, 12vw, 7rem)", marginBottom: "16px", display: "block" }}
        >
          🎂
        </motion.div>

        {birthdayNow ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2rem, 8vw, 4rem)",
              fontWeight: 900,
              color: "#fff",
              textShadow: "0 0 30px rgba(255,200,0,0.8)",
            }}
          >
            🎉 It's Time! 🎉
          </motion.div>
        ) : (
          <>
            <motion.h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(2rem, 8vw, 4.5rem)",
                fontWeight: 900,
                color: "#fff",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                marginBottom: "8px",
                lineHeight: 1.1,
              }}
            >
              Not yet...
            </motion.h1>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                color: "rgba(255,255,255,0.8)",
                fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
                marginBottom: "40px",
                fontWeight: 600,
              }}
            >
              But something magical is coming on July 23rd ✨
            </p>

            <div
              style={{
                display: "flex",
                gap: "clamp(8px, 3vw, 20px)",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <CountCard value={timeLeft.days} label="Days" />
              <CountCard value={timeLeft.hours} label="Hours" />
              <CountCard value={timeLeft.minutes} label="Mins" />
              <CountCard value={timeLeft.seconds} label="Secs" />
            </div>

            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                marginTop: "40px",
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(1rem, 3vw, 1.4rem)",
                color: "rgba(255,255,255,0.75)",
                fontWeight: 600,
              }}
            >
              A birthday surprise is being prepared for Cheeku 💕
            </motion.p>
          </>
        )}
      </motion.div>
    </div>
  );
}
