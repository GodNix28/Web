import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { FloatingHearts } from "./FloatingHearts";

interface Props { onNext: () => void; }

export function PageLoveLetter({ onNext }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 50%, #E9D5FF 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "40px 24px",
    }}>
      <FloatingHearts count={12} colors={["#7C3AED", "#A855F7", "#6D28D9"]} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "40px", position: "relative", zIndex: 10 }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>💌</div>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, background: "linear-gradient(135deg, #7C3AED, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          A Letter For My Akka
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6D4C9E", fontSize: "1rem" }}>
          {opened ? "Every word is true, Kanamma 💜" : "Tap the envelope — this is for you ✨"}
        </p>
      </motion.div>

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "520px" }}>
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div key="envelope"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              whileHover={{ scale: 1.04, y: -6 }} whileTap={{ scale: 0.97 }}
              onClick={() => setOpened(true)}
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <div style={{ position: "relative", width: "240px", height: "180px" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #A855F7, #7C3AED)", borderRadius: "16px", boxShadow: "0 20px 60px rgba(124,58,237,0.45)" }} />
                <motion.div animate={{ rotateX: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, height: "90px", background: "linear-gradient(135deg, #7C3AED, #6D28D9)", clipPath: "polygon(0 0, 50% 60%, 100% 0)", borderRadius: "16px 16px 0 0", transformOrigin: "top center", transformStyle: "preserve-3d" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, top: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: "3rem" }}>💜</motion.div>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, width: "120px", height: "90px", background: "rgba(255,255,255,0.12)", clipPath: "polygon(0 100%, 100% 0, 0 0)", borderRadius: "0 0 0 16px" }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: "120px", height: "90px", background: "rgba(255,255,255,0.08)", clipPath: "polygon(100% 100%, 0 0, 100% 0)", borderRadius: "0 0 16px 0" }} />
              </div>
              <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.3rem", color: "#7C3AED", fontWeight: 600 }}>
                Tap to open, Kanamma 💜
              </p>
            </motion.div>
          ) : (
            <motion.div key="letter"
              initial={{ opacity: 0, y: 60, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, type: "spring", damping: 15 }}
              style={{
                background: "#FAF5FF", borderRadius: "24px", padding: "clamp(24px, 6vw, 40px)",
                boxShadow: "0 20px 60px rgba(124,58,237,0.18)", border: "2px solid rgba(124,58,237,0.15)",
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(124,58,237,0.07) 27px, rgba(124,58,237,0.07) 28px)",
                maxHeight: "65vh", overflowY: "auto",
              }}>
              <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(1rem, 2.5vw, 1.22rem)", color: "#3B0764", lineHeight: 2 }}>
                <p style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)", fontWeight: 700, color: "#7C3AED", marginBottom: "16px" }}>
                  My dearest Dundu — my Kanamma,
                </p>
                <p>
                  I keep thinking about the fact that we met on your birthday. September 16, 2025. Of all the days the universe could have chosen — it chose that one. Your day. And now, one year later, I realise why.
                </p>
                <br />
                <p>
                  Because you were the gift that day. Not the other way around.
                </p>
                <br />
                <p>
                  You came into my life right when it was the heaviest. I was carrying things I didn't know how to put down. And you — without being asked, without knowing the full weight of it — just walked beside me. Stayed. That kind of presence is rare. That kind of love is rare.
                </p>
                <br />
                <p>
                  You are my Akka not because of blood or birth order — but because of everything you've done in this one year that elder sisters do. You checked on me. You told me the truth even when I didn't want to hear it. You made me laugh right after you made me think. You never let me disappear into the dark alone.
                </p>
                <br />
                <p>
                  And somewhere in all of that — between the late night talks, the cat memes we'd send each other, and the inside jokes only we understand — you became home to me.
                </p>
                <br />
                <p>
                  On this birthday, your 20th, I want you to know: you are loved deeply. Not for what you do — but for who you are. For the warmth you carry, the strength you show, the heart you give so freely to people like me.
                </p>
                <br />
                <p>
                  Thank you, Kanamma. For existing. For choosing to stay. For being my Akka when I needed one most.
                </p>
                <br />
                <p style={{ fontSize: "clamp(1.1rem, 2.8vw, 1.4rem)", fontWeight: 700, color: "#6D28D9" }}>
                  With everything I have,
                </p>
                <p style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.8rem)", fontWeight: 700, color: "#7C3AED" }}>
                  Yours, always 🐾💜
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {opened && (
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={onNext}
          style={{ marginTop: "32px", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: "999px", padding: "16px 48px", fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(124,58,237,0.4)", position: "relative", zIndex: 10 }}>
          Continue 💌
        </motion.button>
      )}
    </div>
  );
}
