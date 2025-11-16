"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumb } from "@/components/blog/breadcrumb";
import Game2048 from "@/components/game-2048";
import Game2048_3D from "@/components/game-2048-3d";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [is3D, setIs3D] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 py-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }]}>
          <Link href="/posts">
            <Button
              variant="ghost"
              size="sm"
              className="font-semibold hover:bg-primary hover:text-primary-foreground transition-colors md:text-base"
            >
              Blog
            </Button>
          </Link>
          <ThemeToggle />
        </Breadcrumb>
      </div>

      <main className="flex flex-col items-center p-4 bg-background">
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

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/about">
              <Button variant="outline" className="font-semibold">
                About
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="font-semibold">
                Contact
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="outline" className="font-semibold">
                FAQ
              </Button>
            </Link>
            <Link href="/posts">
              <Button variant="outline" className="font-semibold">
                Blog
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
