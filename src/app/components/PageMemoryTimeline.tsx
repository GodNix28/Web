import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { FloatingHearts } from "./FloatingHearts";

interface Memory {
  year: string;
  title: string;
  description: string;
  emoji: string;
  category: string;
  color: string;
}

const memories: Memory[] = [
  {
    year: "2006",
    title: "The Universe Planned This 🌌",
    description: "In 2006, someone was born who would one day become the most important person in my life. I didn't know it then. But the universe did — and it was already setting the stage.",
    emoji: "🌟",
    category: "Her Story",
    color: "#A855F7",
  },
  {
    year: "2006–2024",
    title: "Becoming Who You Are",
    description: "All those years before we met — you were growing, laughing, learning, becoming. Every single experience shaped you into the person who would later hold me together without even knowing it.",
    emoji: "🦋",
    category: "Her Story",
    color: "#7C3AED",
  },
  {
    year: "Sept 16, 2025",
    title: "We Met On Your Birthday 🎂",
    description: "Of all the days, of all the ways — we met on your birthday. September 16, 2025. I didn't know then that the best gift that day wasn't yours. It was mine — finding you.",
    emoji: "💜",
    category: "The Beginning",
    color: "#6D28D9",
  },
  {
    year: "2025",
    title: "From Hello to Home",
    description: "I don't know when exactly it happened — but somewhere between the first real conversation and all the ones that followed, you stopped being someone I knew and became someone I needed.",
    emoji: "🏡",
    category: "The Beginning",
    color: "#A855F7",
  },
  {
    year: "2025",
    title: "The Cat Era 🐱",
    description: "The random cat memes, the silly cat videos, sending each other the most ridiculous cat content at the most random hours — honestly one of my favourite things about us. You always got it.",
    emoji: "🐱",
    category: "Us",
    color: "#7C3AED",
  },
  {
    year: "2025",
    title: "The Night I Needed You Most",
    description: "Life hit hard. I was drowning in something I couldn't explain to most people. But you — Kanamma — you sat with me in it. You didn't fix it. You just stayed. That saved me more than you know.",
    emoji: "🌙",
    category: "Hard Times",
    color: "#4C1D95",
  },
  {
    year: "2025",
    title: "You Were My Akka First",
    description: "Before I even realised it, you were already being an elder sister to me. Guiding me. Protecting me. Checking on me. Loving me in that quiet, firm way that only a real Akka can.",
    emoji: "🤝",
    category: "Hard Times",
    color: "#6D28D9",
  },
  {
    year: "2025",
    title: "The Laughs That Healed",
    description: "And then — between all the heavy — came the laughter. The kind that makes you forget why you were sad. Those laughs are medicine I didn't know I was taking. Thank you, Dundu.",
    emoji: "😂",
    category: "Us",
    color: "#A855F7",
  },
  {
    year: "2025",
    title: "Kanamma — My Name For You",
    description: "Not everyone gets a name from me. But you — you became Kanamma. My endearment. My shorthand for everything precious. The word that means 'this person matters more than I can say.'",
    emoji: "🌸",
    category: "Us",
    color: "#7C3AED",
  },
  {
    year: "2025–2026",
    title: "Through Every Season",
    description: "You were there in the dark chapters. You were there in the ordinary days. You were there in the moments I almost gave up. One year — and somehow it feels like you've always been here.",
    emoji: "🌈",
    category: "Us",
    color: "#6D28D9",
  },
  {
    year: "Sept 16, 2026",
    title: "One Year. One Lifetime. 💜",
    description: "Today marks exactly one year since we met on your birthday. One year of you being my Akka, my Bestie, my safe place. 365 days I would relive without hesitation — every single one.",
    emoji: "🎂",
    category: "Today",
    color: "#A855F7",
  },
  {
    year: "Forever",
    title: "My Elder Sister By Heart 💜",
    description: "Not by blood. But by every hard moment you held me through, every laugh we shared, every 'you okay?' you sent — you earned the title. Dundu. Kanamma. My Akka. Forever.",
    emoji: "❤️",
    category: "Forever",
    color: "#7C3AED",
  },
];

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} style={{ display: "flex", justifyContent: isLeft ? "flex-start" : "flex-end", marginBottom: "32px", position: "relative" }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          position: "absolute", left: "50%", top: "24px", transform: "translateX(-50%)",
          width: "16px", height: "16px", borderRadius: "50%", background: memory.color,
          zIndex: 2, boxShadow: `0 0 14px ${memory.color}99`, border: "3px solid #fff",
        }}
      />
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        whileHover={{ scale: 1.02, y: -4 }}
        style={{
          width: "calc(50% - 36px)", minWidth: "140px", background: "#fff",
          borderRadius: "24px", padding: "16px 20px",
          boxShadow: `0 8px 32px ${memory.color}22, 0 2px 8px rgba(0,0,0,0.04)`,
          border: `2px solid ${memory.color}33`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <span style={{ fontSize: "2rem" }}>{memory.emoji}</span>
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "0.75rem", color: memory.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {memory.year} · {memory.category}
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(0.85rem, 2vw, 1rem)", color: "#1E1B4B" }}>
              {memory.title}
            </div>
          </div>
        </div>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)", color: "#4C1D95", lineHeight: 1.65, margin: 0 }}>
          {memory.description}
        </p>
      </motion.div>
    </div>
  );
}

interface Props { onNext: () => void; }

export function PageMemoryTimeline({ onNext }: Props) {
  return (
    <div style={{
      minHeight: "100vh", background: "#F5F3FF",
      backgroundImage: "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
      backgroundSize: "32px 32px", padding: "60px 24px 100px", position: "relative", overflow: "hidden",
    }}>
      <FloatingHearts count={8} colors={["#7C3AED", "#A855F7", "#DDD6FE", "#6D28D9"]} />

      {/* Roaming cat */}
      <motion.div
        style={{ position: "fixed", bottom: "64px", fontSize: "2rem", zIndex: 5, pointerEvents: "none" }}
        animate={{ x: ["110vw", "-10vw"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
      >
        🐾🐱
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: "60px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📸</div>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 900, background: "linear-gradient(135deg, #7C3AED, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Our Story, Kanamma
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6D4C9E", fontSize: "1.05rem" }}>
          From your birthday to today — one year of us 💜
        </p>
      </motion.div>

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", background: "linear-gradient(to bottom, #7C3AED, #A855F7, #6D28D9)", transform: "translateX(-50%)", opacity: 0.3 }} />
        {memories.map((memory, i) => <MemoryCard key={i} memory={memory} index={i} />)}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={onNext}
          style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: "999px", padding: "16px 48px", fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(124,58,237,0.4)" }}>
          Read My Letter For You 💌
        </motion.button>
      </div>
    </div>
  );
}
