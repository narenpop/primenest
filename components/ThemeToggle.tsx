"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-yellow-500 text-black dark:bg-yellow-600 dark:text-black hover:bg-yellow-400 dark:hover:bg-yellow-500 transition-colors"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
