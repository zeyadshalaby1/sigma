"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ dict }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // شكل مبدئي صغير أثناء التحميل عشان ميحصلش Layout Shift
  if (!mounted) {
    return (
      <div className="h-9 w-9 bg-card/60 backdrop-blur-md rounded-full border border-border/20" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-card/60 backdrop-blur-md hover:bg-card border border-border/30 hover:border-primary/40 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 text-muted-foreground hover:text-foreground"
      title={isDark ? (dict?.theme?.light || "Light Mode") : (dict?.theme?.dark || "Dark Mode")}
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <Sun
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      
      {/* Moon Icon */}
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}