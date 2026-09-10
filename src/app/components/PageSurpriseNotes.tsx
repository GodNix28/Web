import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { FloatingHearts } from "./FloatingHearts";

interface Note { id: number; front: string; back: string; emoji: string; bg: string; rotate: number; }

const notes: Note[] = [
  { id: 1, front: "You are my safe place 🌙", back: "When the world feels too loud and too heavy — you are the quiet I come to. The fact that you exist in my life makes everything more survivable.", emoji: "🌙", bg: "#EDE9FE", rotate: -3 },
  { id: 2, front: "Thank you for staying 💜", back: "I know I wasn't always easy. I know there were moments I probably pushed people away. But you stayed. And I will never stop being grateful for that.", emoji: "💜", bg: "#DDD6FE", rotate: 2 },
  { id: 3, front: "My Akka forever 🌸", back: "You didn't choose to be born as my sister. But you chose to show up as one — every single day. That choice means more to me than blood ever could.", emoji: "🌸", bg: "#F3E8FF", rotate: -1 },
  { id: 4, front: "The cat memes 🐱", back: "The silly cats, the chaotic cat videos, the absolutely unhinged cat content we'd send each other — that's us. That's our language. And I wouldn't change it for anything.", emoji: "🐱", bg: "#EDE9FE", rotate: 3 },
  { id: 5, front: "We met on your birthday ✨", back: "September 16, 2025. Your birthday. That day gave me more than I think either of us expected. It gave me you. I'd call that the best birthday gift — even if it was yours.", emoji: "✨", bg: "#F3E8FF", rotate: -2 },
  { id: 6, front: "You inspire me, Dundu 💫", back: "Watching how you carry yourself — with realness, with heart, with strength — makes me want to be better too. You don't even try to inspire people. You just do.", emoji: "💫", bg: "#EDE9FE", rotate: 1 },
  { id: 7, front: "You held me together 🫂", back: "There was a time I was barely holding it together. And quietly, without making it a big deal — you helped hold me. I see that. I feel that. I'll never forget it.", emoji: "🫂", bg: "#DDD6FE", rotate: -3 },
  { id: 8, front: "Happy 20th, Kanamma 🎂", back: "20 years of you. One year with me. And somehow it feels like I've always known you. That's how real this is. Happy Birthday, my Akka. You deserve the whole universe.", emoji: "🎂", bg: "#F3E8FF", rotate: 2 },
  { id: 9, front: "I'm proud of you 🌟", back: "For who you are. For how you love. For the way you show up for people even when you're tired. I'm proud to call you my Akka, every single day.", emoji: "🌟", bg: "#EDE9FE", rotate: -1 },
];

function StickyNote({ note, index }: { note: Note; index: number }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: note.rotate }}
      transition={{ delay: index * 0.08, type: "spring", damping: 12 }}
      whileHover={{ scale: 1.05, rotate: 0, y: -8, zIndex: 20 }}
      onClick={() => setRevealed(!revealed)}
      style={{ background: note.bg, borderRadius: "16px", padding: "20px", cursor: "pointer", boxShadow: "0 8px 24px rgba(124,58,237,0.12), 0 2px 8px rgba(0,0,0,0.05)", border: "2px solid rgba(124,58,237,0.1)", position: "relative", userSelect: "none", minHeight: "160px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ position: "absolute", top: "-8px", left: "50%", transform: "translateX(-50%)", width: "16px", height: "16px", borderRadius: "50%", background: "#7C3AED", boxShadow: "0 2px 6px rgba(124,58,237,0.45)" }} />
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "2.5rem" }}>{note.emoji}</div>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "#3B0764", textAlign: "center", fontWeight: 700, margin: 0 }}>{note.front}</p>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: "#6D4C9E" }}>tap to reveal 💜</div>
          </motion.div>
        ) : (
          <motion.div key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)", color: "#1E1B4B", lineHeight: 1.65, margin: 0, fontWeight: 600 }}>{note.back}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface Props { onNext: () => void; }

export function PageSurpriseNotes({ onNext }: Props) {
  return (
    <div style={{
      minHeight: "100vh", background: "#F5F3FF",
      backgroundImage: "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
      backgroundSize: "32px 32px", padding: "60px 24px 80px", position: "relative", overflow: "hidden",
    }}>
      <FloatingHearts count={10} colors={["#7C3AED", "#A855F7", "#DDD6FE", "#6D28D9"]} />

      {/* Walking cat across the page */}
      <motion.div
        style={{ position: "fixed", bottom: "60px", fontSize: "2rem", zIndex: 5, pointerEvents: "none" }}
        animate={{ x: ["-10vw", "110vw"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      >
        🐱
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "48px", position: "relative", zIndex: 10 }}>
        <div style={{ fontSize: "3rem", marginBottom: "8px" }}>📝</div>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, background: "linear-gradient(135deg, #7C3AED, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Notes For My Kanamma
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6D4C9E", fontSize: "1rem" }}>
          Each one is something I've been wanting to say 💜
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "24px", maxWidth: "900px", margin: "0 auto 48px", position: "relative", zIndex: 10 }}>
        {notes.map((note, i) => <StickyNote key={note.id} note={note} index={i} />)}
      </div>

      <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={onNext}
          style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: "999px", padding: "16px 48px", fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(124,58,237,0.4)" }}>
          The Grand Finale 🎉
        </motion.button>
      </div>
    </div>
  );
}
