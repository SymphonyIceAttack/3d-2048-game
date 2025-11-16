"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="font-semibold hover:bg-primary/10 transition-colors h-9 w-9 md:h-10 md:w-10"
      >
        <Sun className="h-4 w-4 md:h-5 md:w-5" />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant="ghost"
      size="icon"
      className="font-semibold hover:bg-primary/10 transition-colors h-9 w-9 md:h-10 md:w-10"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 md:h-5 md:w-5" />
      ) : (
        <Sun className="h-4 w-4 md:h-5 md:w-5" />
      )}
    </Button>
  );
}
