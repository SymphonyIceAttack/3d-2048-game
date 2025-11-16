"use client";

import { RotateCcw, Undo2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGameEngine2D } from "@/lib/game-engine/hooks";
import { getTileColor, getTileSize } from "./game-utils";

const GRID_SIZE = 4;

const KeyboardKey = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        min-w-8 h-8 px-2
        bg-muted border border-border rounded
        text-xs font-semibold text-foreground
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface AnimatedTileProps {
  value: number;
  isNew?: boolean;
  isMerged?: boolean;
}

const AnimatedTile: React.FC<AnimatedTileProps> = ({
  value,
  isNew,
  isMerged,
}) => {
  if (value === 0) {
    return (
      <div
        className={`
          w-16 h-16 md:w-20 md:h-20 rounded-lg
          bg-muted/50 border border-border/20
        `}
      />
    );
  }

  return (
    <div
      className={`
        w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center
        font-bold
        ${getTileColor(value)} ${getTileSize(value)}
        ${isMerged ? "shadow-lg shadow-primary/30" : ""}
        transform transition-all duration-200 ease-out
        ${isNew ? "scale-110 animate-pulse" : "scale-100"}
        ${isMerged ? "scale-125" : ""}
      `}
    >
      {value}
    </div>
  );
};

export default function Game2048() {
  const {
    board,
    score,
    bestScore,
    gameOver,
    won,
    canUndo,
    move,
    resetGame,
    undo,
  } = useGameEngine2D("2048-best-score");

  const [displayedScore, setDisplayedScore] = useState(score);
  const [previousScore, setPreviousScore] = useState(score);
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);

  useEffect(() => {
    if (score > previousScore) {
      setIsScoreAnimating(true);
      const startScore = previousScore;
      const endScore = score;
      const duration = 600;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentScore = Math.floor(
          startScore + (endScore - startScore) * progress,
        );
        setDisplayedScore(currentScore);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setPreviousScore(score);
          setIsScoreAnimating(false);
        }
      };

      animate();
    } else {
      setDisplayedScore(score);
      setPreviousScore(score);
    }
  }, [score, previousScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
          "W",
          "A",
          "S",
          "D",
          "z",
          "Z",
        ].includes(e.key)
      ) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          move("up");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          move("down");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          move("left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          move("right");
          break;
        case "z":
        case "Z":
          if (canUndo) undo();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move, undo, canUndo]);

  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 30) move("right");
        else if (deltaX < -30) move("left");
      } else {
        if (deltaY > 30) move("down");
        else if (deltaY < -30) move("up");
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [move]);

  if (board.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground">
            2048
          </h1>
          <p className="text-muted-foreground mt-4">Initializing game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-6xl md:text-7xl font-bold text-foreground">2048</h1>
        <div className="flex flex-col items-center gap-3 mt-2">
          <p className="text-sm text-muted-foreground">
            Use keyboard to move tiles
          </p>
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-1">
              <div className="flex flex-col items-center">
                <KeyboardKey>↑</KeyboardKey>
                <div className="flex gap-1 mt-1">
                  <KeyboardKey>←</KeyboardKey>
                  <KeyboardKey>↓</KeyboardKey>
                  <KeyboardKey>→</KeyboardKey>
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                Arrow Keys
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex flex-col items-center">
                <KeyboardKey>W</KeyboardKey>
                <div className="flex gap-1 mt-1">
                  <KeyboardKey>A</KeyboardKey>
                  <KeyboardKey>S</KeyboardKey>
                  <KeyboardKey>D</KeyboardKey>
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-1">WASD</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            or swipe • Press Z to undo
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex gap-3">
          <Card
            className={`px-4 py-2 bg-muted ${isScoreAnimating ? "scale-110 transition-transform duration-200" : ""}`}
          >
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Score
            </div>
            <div className="text-2xl font-bold text-foreground">
              {displayedScore}
            </div>
          </Card>
          <Card className="px-4 py-2 bg-muted">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Best
            </div>
            <div className="text-2xl font-bold text-foreground">
              {bestScore}
            </div>
          </Card>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={undo}
            disabled={!canUndo}
            size="lg"
            variant="outline"
            className="gap-2 bg-transparent"
          >
            <Undo2 className="h-4 w-4" />
            Undo
          </Button>
          <Button
            onClick={resetGame}
            size="lg"
            variant="outline"
            className="gap-2 bg-transparent"
          >
            <RotateCcw className="h-4 w-4" />
            New Game
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          className="grid gap-3 p-4 bg-muted rounded-xl"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {board.map((row, i) =>
            row.map((cell, j) => {
              const isNew = cell !== 0 && Math.random() > 0.7;
              const isMerged = cell >= 128;
              return (
                <AnimatedTile
                  key={`${i}-${j}`}
                  value={cell}
                  isNew={isNew}
                  isMerged={isMerged}
                />
              );
            }),
          )}
        </div>

        {(gameOver || won) && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Card className="p-6 text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                {won ? "🎉 You Win!" : "Game Over"}
              </h2>
              <p className="text-muted-foreground">
                {won
                  ? `Congratulations! You reached 2048!`
                  : "No more moves available"}
              </p>
              <Button onClick={resetGame} size="lg" className="w-full">
                Play Again
              </Button>
            </Card>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>Merge tiles with the same number to reach 2048!</p>
        <p className="text-xs">Tip: Keep larger numbers in the corner</p>
      </div>
    </div>
  );
}
