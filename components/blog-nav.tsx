"use client";

import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function BlogNav() {
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
    <nav className="sticky top-0 z-50 border-b-2 border-purple-500 dark:border-purple-400 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="/logo.png"
              alt="3D 2048 Logo"
              fill
              className="object-contain group-hover:scale-110 transition-transform"
            />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            3D 2048
          </span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/">
            <Button variant="ghost" className="font-bold">
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="font-bold">
              About
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="ghost" className="font-bold">
              FAQ
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="font-bold">
              Contact
            </Button>
          </Link>
          <Link href="/posts">
            <Button variant="ghost" className="font-bold">
              Blog
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
        </div>
      </div>
    </nav>
  );
}
