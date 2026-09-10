import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { fireConfetti } from "./Confetti";

interface Props {
  onNext: () => void;
}

type CakeState = "unlit" | "lit" | "wished" | "cut";

export function PageBirthdayCake({ onNext }: Props) {
  const [cakeState, setCakeState] = useState<CakeState>("unlit");
  const [blowing, setBlowing] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const lightCandles = () => {
    setCakeState("lit");
    const s = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50,
    }));
    setSparkles(s);
  };

  const makeWish = () => {
    setBlowing(true);
    setTimeout(() => {
      setCakeState("wished");
      setBlowing(false);
      setSparkles([]);
      fireConfetti();
    }, 2000);
  };

  const cutCake = () => {
    setCakeState("cut");
    fireConfetti();
    setTimeout(() => fireConfetti(), 800);
  };

  const candleLit = cakeState === "lit" || cakeState === "wished";
  const showFlame = cakeState === "lit" && !blowing;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F5F3FF 0%, #F5F3FF 60%, #EDE9FE 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background floating emojis */}
      {["🎈", "🎊", "✨", "🌟", "💫"].map((e, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            fontSize: "2rem",
            opacity: 0.12,
            left: `${[10, 85, 15, 80, 50][i]}%`,
            top: `${[20, 15, 75, 70, 10][i]}%`,
            pointerEvents: "none",
          }}
          animate={{ y: [-10, 10], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, repeatType: "reverse" }}
        >
          {e}
        </motion.div>
      ))}

      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: [1, 0], scale: [0, 1.5], y: -60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 1.5 }}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              fontSize: "1.5rem",
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "32px", zIndex: 10, position: "relative" }}
      >
        <div style={{ fontSize: "2.5rem" }}>🎂</div>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
            fontWeight: 900,
            color: "#7C3AED",
          }}
        >
          Virtual Birthday Cake
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6D4C9E", fontSize: "0.95rem" }}>
          For our birthday girl, Dundu! 🌸
        </p>
      </motion.div>

      {/* Cake Illustration */}
      <motion.div
        animate={cakeState === "cut" ? { rotate: [0, -2, 2, -1, 0], scale: [1, 0.98, 1.02, 1] } : {}}
        transition={{ duration: 0.5 }}
        style={{ position: "relative", zIndex: 10, marginBottom: "32px" }}
      >
        <svg width="320" height="280" viewBox="0 0 320 280">
          {/* Plate */}
          <ellipse cx="160" cy="258" rx="130" ry="18" fill="#DDD6FE" opacity="0.6" />

          {/* Bottom tier */}
          <rect x="55" y="190" width="210" height="65" rx="14" fill="#A855F7" />
          <rect x="55" y="190" width="210" height="20" rx="10" fill="#C4B5FD" />
          {/* Bottom frosting drips */}
          {[75, 105, 135, 165, 195, 225].map((x, i) => (
            <ellipse key={i} cx={x} cy="190" rx="13" ry="10" fill="white" opacity="0.8" />
          ))}

          {/* Middle tier */}
          <rect x="85" y="125" width="150" height="67" rx="12" fill="#7C3AED" />
          <rect x="85" y="125" width="150" height="18" rx="9" fill="#FF6BA3" />
          {/* Mid frosting */}
          {[100, 130, 160, 190, 220].map((x, i) => (
            <ellipse key={i} cx={x} cy="125" rx="11" ry="8" fill="white" opacity="0.7" />
          ))}

          {/* Top tier */}
          <rect x="110" y="65" width="100" height="62" rx="10" fill="#6D28D9" />
          <rect x="110" y="65" width="100" height="16" rx="8" fill="#D970D9" />
          {/* Top frosting */}
          {[120, 145, 170, 195].map((x, i) => (
            <ellipse key={i} cx={x} cy="65" rx="10" ry="7" fill="white" opacity="0.7" />
          ))}

          {/* Cake cut line */}
          {cakeState === "cut" && (
            <motion.line
              x1="160" y1="60" x2="160" y2="255"
              stroke="#fff"
              strokeWidth="4"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Candles */}
          {[130, 160, 190].map((x, i) => (
            <g key={i}>
              <rect x={x - 5} y="30" width="10" height="36" rx="3" fill={["#6D28D9", "#7C3AED", "#A855F7"][i]} />
              {/* Flame */}
              {showFlame && (
                <motion.g
                  animate={{ scaleY: [1, 1.2, 0.9, 1], scaleX: [1, 0.8, 1.1, 1] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  style={{ transformOrigin: `${x}px 28px` }}
                >
                  <ellipse cx={x} cy="22" rx="6" ry="10" fill="#FFCA28" />
                  <ellipse cx={x} cy="19" rx="3" ry="6" fill="#FF6B35" />
                </motion.g>
              )}
              {/* Blown out smoke */}
              {blowing && (
                <motion.ellipse
                  cx={x} cy="18" rx="3" ry="3"
                  fill="#ccc"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -20, rx: 6 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              {/* Unlit candle tip */}
              {cakeState === "unlit" && (
                <ellipse cx={x} cy="28" rx="3" ry="3" fill="#FFF3E0" />
              )}
            </g>
          ))}

          {/* Decorative hearts */}
          <text x="75" y="225" fontSize="18" textAnchor="middle">❤️</text>
          <text x="245" y="225" fontSize="18" textAnchor="middle">❤️</text>
          <text x="78" y="163" fontSize="14" textAnchor="middle">🌸</text>
          <text x="242" y="163" fontSize="14" textAnchor="middle">🌸</text>

          {/* Celebration text when cut */}
          {cakeState === "cut" && (
            <motion.text
              x="160" y="15"
              textAnchor="middle"
              fontFamily="Poppins, sans-serif"
              fontWeight="900"
              fontSize="14"
              fill="#7C3AED"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              🎉 Let's Celebrate!
            </motion.text>
          )}
        </svg>
      </motion.div>

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "32px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {cakeState === "unlit" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={lightCandles}
            style={btnStyle("#7C3AED")}
          >
            🕯️ Light Candles
          </motion.button>
        )}

        {cakeState === "lit" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={makeWish}
            style={btnStyle("#6D28D9")}
          >
            💫 Make a Wish & Blow!
          </motion.button>
        )}

        {cakeState === "wished" && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={cutCake}
            style={btnStyle("#7C3AED")}
          >
            🎂 Cut the Cake!
          </motion.button>
        )}

        {cakeState === "cut" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              color: "#7C3AED",
              textAlign: "center",
            }}
          >
            🎉 Happy Birthday Dundu! 🎉
          </motion.div>
        )}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        style={{
          ...btnStyle("#7C3AED"),
          background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
          position: "relative",
          zIndex: 10,
        }}
      >
        Read Surprise Notes 📝
      </motion.button>
    </div>
  );
}

function btnStyle(color: string) {
  return {
    background: `linear-gradient(135deg, ${color}, ${color}CC)`,
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "14px 36px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: `0 8px 24px ${color}44`,
  } as React.CSSProperties;
}
