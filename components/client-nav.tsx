"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ClientNav() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 md:gap-3 z-50">
      <Link href="/">
        <Button
          variant="ghost"
          size="sm"
          className="font-semibold hover:bg-primary hover:text-primary-foreground transition-colors md:text-base"
        >
          Home
        </Button>
      </Link>
      <Link href="/about">
        <Button
          variant="ghost"
          size="sm"
          className="font-semibold hover:bg-primary hover:text-primary-foreground transition-colors md:text-base"
        >
          About
        </Button>
      </Link>
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="icon"
        className="font-semibold hover:bg-primary/10 transition-colors h-9 w-9 md:h-10 md:w-10"
      >
        {theme === "light" ? (
          <Moon className="h-4 w-4 md:h-5 md:w-5" />
        ) : (
          <Sun className="h-4 w-4 md:h-5 md:w-5" />
        )}
      </Button>
    </nav>
  );
}
