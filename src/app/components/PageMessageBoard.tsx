import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Props { onNext: () => void; }

const fullMessage = `
Dundu. Kanamma. Akka.

Three names. One person. The most important person who walked into my life in 2025.

I want to say this clearly, because I don't think I've said it clearly enough — you were there when I was falling apart. Not everyone shows up for that. Most people are around for the good days, the easy versions, the fun moments. But you? You showed up when I was the hardest version of myself to be around. When I didn't have much to give. When I was just... surviving.

And you stayed.

You didn't try to fix me with big solutions or loud words. You just sat with me in it. That quiet, steady presence — that's what I needed more than anything. And somehow you knew that without me having to say it.

That is not something a friend does. That is something a sister does.

So let me say it the way it deserves to be said: You are my Akka. Not because of blood or birth or shared parents — but because of the way you've loved me. Fiercely. Gently. Honestly. Without conditions.

You turned 20 today. And I genuinely believe the world is better for every year you've been in it. Especially mine.

On this birthday — your birthday, the same day we met one year ago — I hope you feel every bit of the love you've given out coming right back to you. Because you deserve a love that's as big and as steady as the one you give.

Happy Birthday, Kanamma. Here's to 20 years of you — and to all the ones still ahead. 🌙💜
`.trim();

export function PageMessageBoard({ onNext }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullMessage.slice(0, i));
      if (i >= fullMessage.length) { clearInterval(interval); setDone(true); }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1E0045 0%, #3B0764 40%, #6D28D9 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 24px", position: "relative", overflow: "hidden",
    }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={i}
          style={{ position: "absolute", left: `${[5,15,80,90,40,60,25,75,50,10,35,70][i]}%`, top: `${[10,80,20,70,50,30,60,40,85,45,15,65][i]}%`, fontSize: `${14 + i * 2}px`, opacity: 0.1, pointerEvents: "none" }}
          animate={{ y: [-20, 20], x: [-10, 10], rotate: [0, 360] }}
          transition={{ duration: 5 + i * 0.5, repeat: Infinity, repeatType: "reverse" }}>
          💜
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
        style={{
          background: "rgba(255,255,255,0.07)", backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.12)", borderRadius: "32px",
          padding: "clamp(28px, 6vw, 48px)", maxWidth: "700px", width: "100%",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)", position: "relative", zIndex: 10,
        }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>💬</div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 900, color: "#DDD6FE" }}>
            From Me, To My Kanamma
          </h1>
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1rem", color: "#C4B5FD", marginTop: "4px" }}>
            Read slowly. Every word is meant. 💜
          </div>
        </div>

        <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(0.88rem, 2vw, 1.02rem)", color: "rgba(237,233,254,0.92)", lineHeight: 1.95, whiteSpace: "pre-wrap", minHeight: "300px" }}>
          {displayed}
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: done ? 0 : Infinity }}
            style={{ display: "inline-block", width: "2px", height: "1.1em", background: "#A855F7", marginLeft: "2px", verticalAlign: "middle" }} />
        </div>

        {done && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ textAlign: "center", marginTop: "32px" }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={onNext}
              style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: "999px", padding: "16px 48px", fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(124,58,237,0.5)" }}>
              See Why You're My Akka 💜
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
