"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FAQSection } from "@/components/faq-section";
import Game2048 from "@/components/game-2048";
import Game2048_3D from "@/components/game-2048-3d";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [is3D, setIs3D] = useState(true);
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
    <main className="min-h-screen flex flex-col items-center p-4 bg-background">
      <nav className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 md:gap-3">
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
        <Link href="/posts">
          <Button
            variant="ghost"
            size="sm"
            className="font-semibold hover:bg-primary hover:text-primary-foreground transition-colors md:text-base"
          >
            Blog
          </Button>
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
        <Button
          onClick={() => setIs3D(!is3D)}
          variant="outline"
          size="lg"
          className="font-semibold"
        >
          Switch to {is3D ? "2D" : "3D"} Mode
        </Button>

        {is3D ? <Game2048_3D /> : <Game2048 />}
      </div>

      <FAQSection />
    </main>
  );
}
