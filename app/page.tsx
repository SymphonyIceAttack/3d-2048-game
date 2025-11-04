"use client";

import Link from "next/link";
import { useState } from "react";
import Game2048 from "@/components/game-2048";
import Game2048_3D from "@/components/game-2048-3d";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [is3D, setIs3D] = useState(true);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background gap-6">
      <nav className="absolute top-6 right-6">
        <Link href="/blog">
          <Button
            variant="ghost"
            size="lg"
            className="font-semibold hover:bg-primary/10 transition-colors"
          >
            Blog
          </Button>
        </Link>
      </nav>

      <Button
        onClick={() => setIs3D(!is3D)}
        variant="outline"
        size="lg"
        className="font-semibold"
      >
        Switch to {is3D ? "2D" : "3D"} Mode
      </Button>

      {is3D ? <Game2048_3D /> : <Game2048 />}
    </main>
  );
}
