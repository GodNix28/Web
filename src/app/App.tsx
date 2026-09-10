import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PageWelcome } from "./components/PageWelcome";
import { PageMemoryTimeline } from "./components/PageMemoryTimeline";
import { PageLoveLetter } from "./components/PageLoveLetter";
import { PageMessageBoard } from "./components/PageMessageBoard";
import { PageReasonsILoveYou } from "./components/PageReasonsILoveYou";
import { PageHeartGame } from "./components/PageHeartGame";
import { PageColoring } from "./components/PageColoring";
import { PageBirthdayCake } from "./components/PageBirthdayCake";
import { PageSurpriseNotes } from "./components/PageSurpriseNotes";
import { PageFinalCelebration } from "./components/PageFinalCelebration";

type Page =
  | "welcome"
  | "timeline"
  | "letter"
  | "message"
  | "reasons"
  | "game"
  | "coloring"
  | "cake"
  | "notes"
  | "finale";

const PAGE_ORDER: Page[] = [
  "welcome",
  "timeline",
  "letter",
  "message",
  "reasons",
  "game",
  "coloring",
  "cake",
  "notes",
  "finale",
];

const PAGE_LABELS: Record<Page, string> = {
  welcome: "Welcome",
  timeline: "Memories",
  letter: "Love Letter",
  message: "Message",
  reasons: "Reasons",
  game: "Mini Game",
  coloring: "Coloring",
  cake: "Birthday Cake",
  notes: "Notes",
  finale: "Celebration",
};

function NavigationDots({ current, onNavigate }: { current: Page; onNavigate: (p: Page) => void }) {
  const currentIdx = PAGE_ORDER.indexOf(current);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px",
        zIndex: 100,
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        borderRadius: "999px",
        padding: "8px 16px",
        boxShadow: "0 4px 16px rgba(124,58,237,0.2)",
        border: "1px solid rgba(124,58,237,0.15)",
      }}
    >
      {PAGE_ORDER.map((page) => {
        const isActive = page === current;
        const isPast = PAGE_ORDER.indexOf(page) < currentIdx;
        return (
          <motion.button
            key={page}
            title={PAGE_LABELS[page]}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate(page)}
            style={{
              width: isActive ? "24px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background: isActive ? "#7C3AED" : isPast ? "#C4B5FD" : "rgba(124,58,237,0.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        );
      })}
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, x: 60, scale: 0.97 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.97 },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("welcome");

  const goTo = (page: Page) => setCurrentPage(page);
  const goNext = () => {
    const idx = PAGE_ORDER.indexOf(currentPage);
    if (idx < PAGE_ORDER.length - 1) {
      setCurrentPage(PAGE_ORDER[idx + 1]);
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', 'Nunito', sans-serif", position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {currentPage === "welcome" && <PageWelcome onNext={goNext} />}
          {currentPage === "timeline" && <PageMemoryTimeline onNext={goNext} />}
          {currentPage === "letter" && <PageLoveLetter onNext={goNext} />}
          {currentPage === "message" && <PageMessageBoard onNext={goNext} />}
          {currentPage === "reasons" && <PageReasonsILoveYou onNext={goNext} />}
          {currentPage === "game" && <PageHeartGame onNext={goNext} />}
          {currentPage === "coloring" && <PageColoring onNext={goNext} />}
          {currentPage === "cake" && <PageBirthdayCake onNext={goNext} />}
          {currentPage === "notes" && <PageSurpriseNotes onNext={goNext} />}
          {currentPage === "finale" && (
            <PageFinalCelebration onRestart={() => goTo("welcome")} />
          )}
        </motion.div>
      </AnimatePresence>

      <NavigationDots current={currentPage} onNavigate={goTo} />
    </div>
  );
}
