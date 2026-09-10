import { motion } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";

interface Props {
  onNext: () => void;
}

const COLORS = [
  "#7C3AED", "#A855F7", "#DDD6FE", "#6D28D9", "#9B59B6",
  "#FF6B6B", "#FFA07A", "#FFCA28", "#66BB6A", "#42A5F5",
  "#26C6DA", "#EC407A", "#FF7043", "#8D6E63", "#ffffff",
  "#2D2D2D",
];

export function PageColoring({ onNext }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState("#7C3AED");
  const [brushSize, setBrushSize] = useState(12);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const drawBirthdayIllustration = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = "#F5F3FF";
    ctx.fillRect(0, 0, w, h);

    // Grid pattern
    ctx.strokeStyle = "rgba(255,77,141,0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y <= h; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    const cx = w / 2;
    const cy = h * 0.55;

    // Cake base tier (bottom)
    ctx.fillStyle = "#DDD6FE";
    ctx.strokeStyle = "#7C3AED";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cx - 100, cy + 10, 200, 70, 12);
    ctx.fill(); ctx.stroke();

    // Cake middle tier
    ctx.fillStyle = "#C4B5FD";
    ctx.beginPath();
    ctx.roundRect(cx - 75, cy - 60, 150, 72, 12);
    ctx.fill(); ctx.stroke();

    // Cake top tier
    ctx.fillStyle = "#A855F7";
    ctx.beginPath();
    ctx.roundRect(cx - 50, cy - 120, 100, 62, 12);
    ctx.fill(); ctx.stroke();

    // Frosting drips on each tier
    const drip = (x: number, y: number, count: number) => {
      ctx.fillStyle = "#fff";
      for (let i = 0; i < count; i++) {
        ctx.beginPath();
        ctx.ellipse(x - 40 + i * 20, y, 10, 14, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    drip(cx, cy - 60, 5);
    drip(cx, cy + 10, 5);

    // Candles
    const candlePositions = [cx - 30, cx, cx + 30];
    candlePositions.forEach((x) => {
      ctx.fillStyle = "#6D28D9";
      ctx.strokeStyle = "#9B2A9B";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x - 6, cy - 155, 12, 38, 4);
      ctx.fill(); ctx.stroke();

      // Flame
      ctx.fillStyle = "#FFCA28";
      ctx.beginPath();
      ctx.ellipse(x, cy - 160, 6, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FF6B35";
      ctx.beginPath();
      ctx.ellipse(x, cy - 163, 3, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Stars around cake
    const stars = [[cx - 130, cy - 80], [cx + 130, cy - 80], [cx - 110, cy + 50], [cx + 110, cy + 50], [cx, cy - 200]];
    ctx.fillStyle = "#FFCA28";
    stars.forEach(([x, y]) => {
      ctx.font = "bold 22px serif";
      ctx.fillText("⭐", x - 11, y + 8);
    });

    // Happy Birthday text (outline only)
    ctx.font = "bold 22px Poppins, sans-serif";
    ctx.strokeStyle = "#7C3AED";
    ctx.lineWidth = 2;
    ctx.strokeText("Happy Birthday Dundu!", cx - 110, cy - 220);

    // Hearts around
    const heartPositions = [[cx - 140, cy - 150], [cx + 120, cy - 120], [cx - 120, cy + 90], [cx + 130, cy + 70]];
    heartPositions.forEach(([x, y]) => {
      ctx.font = "24px serif";
      ctx.fillText("♡", x, y);
    });

    // Balloons (outlines)
    [[cx - 160, cy - 60], [cx + 165, cy - 40]].forEach(([x, y], i) => {
      ctx.strokeStyle = i === 0 ? "#7C3AED" : "#6D28D9";
      ctx.lineWidth = 3;
      ctx.fillStyle = "transparent";
      ctx.beginPath();
      ctx.ellipse(x, y, 28, 36, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y + 36);
      ctx.lineTo(x + 5, y + 60);
      ctx.stroke();
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawBirthdayIllustration(ctx, canvas.width, canvas.height);
  }, [drawBirthdayIllustration]);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const touch = e.touches[0];
      return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY };
    }
    return { x: ((e as React.MouseEvent).clientX - rect.left) * scaleX, y: ((e as React.MouseEvent).clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e, canvas);
    if (lastPos.current) {
      ctx.beginPath();
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    lastPos.current = pos;
  };

  const stopDraw = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const reset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawBirthdayIllustration(ctx, canvas.width, canvas.height);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F3FF",
        padding: "40px 24px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "24px" }}
      >
        <div style={{ fontSize: "2.5rem" }}>🎨</div>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
            fontWeight: 900,
            color: "#7C3AED",
          }}
        >
          Color For Dundu!
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6D4C9E", fontSize: "0.95rem" }}>
          Paint the birthday illustration with love 💕
        </p>
      </motion.div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          maxWidth: "900px",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Color palette */}
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "16px",
            boxShadow: "0 8px 24px rgba(124,58,237,0.12)",
            border: "2px solid rgba(124,58,237,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            height: "fit-content",
          }}
        >
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#7C3AED" }}>
            Colors
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px" }}>
            {COLORS.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(color)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: color,
                  border: selectedColor === color ? "3px solid #7C3AED" : "2px solid rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  boxShadow: selectedColor === color ? "0 0 0 2px #fff, 0 0 0 4px #7C3AED" : "none",
                }}
              />
            ))}
          </div>

          <div style={{ width: "100%", marginTop: "8px" }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#6D4C9E", marginBottom: "4px" }}>
              Brush: {brushSize}px
            </div>
            {/* using native input — no kit equivalent for range sliders */}
            <input
              type="range"
              min={3}
              max={40}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#7C3AED" }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            style={{
              background: "rgba(124,58,237,0.1)",
              color: "#7C3AED",
              border: "2px solid rgba(255,77,141,0.3)",
              borderRadius: "999px",
              padding: "8px 16px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "0.8rem",
              cursor: "pointer",
              width: "100%",
            }}
          >
            🔄 Reset
          </motion.button>
        </div>

        {/* Canvas */}
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "12px",
            boxShadow: "0 8px 32px rgba(124,58,237,0.15)",
            border: "2px solid rgba(124,58,237,0.1)",
            flex: 1,
            minWidth: "280px",
            maxWidth: "520px",
          }}
        >
          <canvas
            ref={canvasRef}
            width={520}
            height={420}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={(e) => { e.preventDefault(); startDraw(e); }}
            onTouchMove={(e) => { e.preventDefault(); draw(e); }}
            onTouchEnd={stopDraw}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "16px",
              cursor: "crosshair",
              touchAction: "none",
              display: "block",
            }}
          />
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
          marginTop: "32px",
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
        }}
      >
        Blow Out the Candles 🎂
      </motion.button>
    </div>
  );
}
