"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush } from "lucide-react";

const themes = [
  { name: "Green", className: "theme-green", color: "#34D399" },
  { name: "Red", className: "theme-red", color: "#F87171" },
  { name: "Blue", className: "theme-blue", color: "#60A5FA" },
  { name: "Yellow", className: "theme-yellow", color: "#FACC15" },
  { name: "Dark", className: "theme-dark", color: "#1F2937" },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("theme-green");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    themes.forEach((t) => html.classList.remove(t.className));
    html.classList.remove("dark");
    if (theme) html.classList.add(theme);
  }, [theme]);

  const radius = 80; // Distance from center for color buttons

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative w-10 h-10">
        {/* Central Toggle Button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-xl hover:rotate-180 transition-transform duration-500"
        >
          <Paintbrush className="w-6 h-6" />
        </button>

        {/* Color Buttons in Left Half-Circle */}
        <AnimatePresence>
          {open &&
            themes.map((t, i) => {
              const angleDeg = 180 / (themes.length - 1) * i; // spread over 180°
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = -radius * Math.cos(angleRad);
              const y = -radius * Math.sin(angleRad);

              return (
                <motion.button
                  key={t.className}
                  onClick={() => {
                    setTheme(t.className);
                    setOpen(false);
                  }}
                  className="absolute w-10 h-10 rounded-full shadow-xl border-2 border-white"
                  style={{
                    backgroundColor: t.color,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ x: 0, y: 0, scale: 0 }}
                  animate={{ x, y, scale: 1 }}
                  exit={{ x: 0, y: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                />
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}
