import { motion } from "motion/react";
import { useState } from "react";
import { FloatingHearts } from "./FloatingHearts";

interface Reason { front: string; back: string; emoji: string; color: string; }

const reasons: Reason[] = [
  { front: "You Stayed", back: "When things were hard and I wasn't easy to be around — you stayed. That alone puts you in a category of your own, Kanamma.", emoji: "🫂", color: "#7C3AED" },
  { front: "Your Realness", back: "You never pretend. What you feel, you say. What you think, you share. That honesty is something I trust completely — and trust is not something I give easily.", emoji: "💎", color: "#6D28D9" },
  { front: "Your Laugh", back: "Your laugh is the kind that makes everything feel lighter. Even the heaviest days had a crack of light in them when you laughed. That's not nothing. That's everything.", emoji: "😂", color: "#A855F7" },
  { front: "How You Show Up", back: "Not with noise or big gestures — but with presence. A message at the right time. A check-in when I least expected it. You just know. And that knowing means the world.", emoji: "🌙", color: "#7C3AED" },
  { front: "Your Strength", back: "You carry things quietly that most people would collapse under. You're stronger than you give yourself credit for, Dundu. I see it even when you don't.", emoji: "💪", color: "#6D28D9" },
  { front: "You're My Akka", back: "You became my elder sister without being asked. You guide, protect, love me in that older-sibling way that I didn't know I needed. Thank you for that.", emoji: "🌸", color: "#A855F7" },
  { front: "The Cat Thing 🐱", back: "The fact that you always laughed at my silly cat content — and sent your own back — tells me everything I need to know. We're on the same wavelength, Kanamma. Always.", emoji: "🐱", color: "#7C3AED" },
  { front: "Your Heart", back: "It's the biggest, most generous heart I know. You give and give and give — even when you're running low yourself. I see that. I appreciate that. More than you know.", emoji: "💜", color: "#6D28D9" },
  { front: "The Way You Love", back: "You love fiercely and quietly at the same time. It's in the small things — the check-ins, the care, the way you remember what matters to me. That's a rare kind of love.", emoji: "✨", color: "#A855F7" },
  { front: "Your Honesty", back: "You tell me what I need to hear, not just what I want to hear. That's not common. That's not easy. But it's one of the most loving things someone can do.", emoji: "🔮", color: "#7C3AED" },
  { front: "You Were There", back: "In my hardest time — you were there. No questions, no conditions. Just there. I will never forget that. I will carry that with me for the rest of my life.", emoji: "🌈", color: "#6D28D9" },
  { front: "Simply Dundu", back: "At the end of it all — it's just you. All of you. The chaotic, brilliant, warm, real, wonderful you. My Kanamma. My Akka. My person. I'd choose you in every lifetime.", emoji: "💜", color: "#A855F7" },
];

function FlipCard({ reason, index }: { reason: Reason; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, type: "spring" }}
      style={{ width: "100%", aspectRatio: "1 / 1", perspective: "1000px", cursor: "pointer" }}
      onClick={() => setFlipped(!flipped)}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6, type: "spring", damping: 15 }}
        style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${reason.color}18, ${reason.color}35)`,
          borderRadius: "24px", display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: "12px", backfaceVisibility: "hidden",
          border: `2px solid ${reason.color}33`, boxShadow: `0 8px 24px ${reason.color}20`, padding: "16px",
        }}>
          <div style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}>{reason.emoji}</div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "clamp(0.8rem, 2vw, 0.95rem)", color: reason.color, textAlign: "center" }}>{reason.front}</div>
          <div style={{ fontSize: "0.65rem", color: "#6D4C9E", fontFamily: "'Nunito', sans-serif" }}>tap to reveal ✨</div>
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${reason.color}, ${reason.color}DD)`,
          borderRadius: "24px", display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", padding: "16px", backfaceVisibility: "hidden",
          transform: "rotateY(180deg)", boxShadow: `0 8px 32px ${reason.color}55`,
        }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(0.75rem, 1.8vw, 0.88rem)", color: "#fff", textAlign: "center", lineHeight: 1.65, fontWeight: 600 }}>{reason.back}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface Props { onNext: () => void; }

export function PageReasonsILoveYou({ onNext }: Props) {
  return (
    <div style={{
      minHeight: "100vh", background: "#F5F3FF",
      backgroundImage: "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
      backgroundSize: "32px 32px", padding: "60px 24px 80px", position: "relative", overflow: "hidden",
    }}>
      <FloatingHearts count={10} colors={["#7C3AED", "#A855F7", "#DDD6FE", "#6D28D9"]} />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "48px", position: "relative", zIndex: 10 }}>
        <div style={{ fontSize: "3rem", marginBottom: "8px" }}>💜</div>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, background: "linear-gradient(135deg, #7C3AED, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Why You're My Akka
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6D4C9E", fontSize: "1rem" }}>
          Flip each card — every one is true 💜
        </p>
        <motion.div
          animate={{ y: [-4, 4], rotate: [-5, 5] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ fontSize: "1.8rem", marginTop: "8px" }}
        >
          🐱
        </motion.div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(160px, 100%), 1fr))", gap: "16px", maxWidth: "900px", margin: "0 auto 48px", position: "relative", zIndex: 10 }}>
        {reasons.map((reason, i) => <FlipCard key={i} reason={reason} index={i} />)}
      </div>

      <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={onNext}
          style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: "999px", padding: "16px 48px", fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(124,58,237,0.4)" }}>
          Play a Mini Game 🎮
        </motion.button>
      </div>
    </div>
  );
}
