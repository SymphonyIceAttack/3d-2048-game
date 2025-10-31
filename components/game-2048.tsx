"use client";

import { RotateCcw } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Board = number[][];

const GRID_SIZE = 4;

const getTileColor = (value: number) => {
  const colors: Record<number, string> = {
    0: "bg-muted/50",
    2: "bg-secondary text-secondary-foreground",
    4: "bg-secondary text-secondary-foreground",
    8: "bg-primary/70 text-primary-foreground",
    16: "bg-primary/80 text-primary-foreground",
    32: "bg-primary text-primary-foreground",
    64: "bg-primary text-primary-foreground",
    128: "bg-accent/70 text-accent-foreground",
    256: "bg-accent/80 text-accent-foreground",
    512: "bg-accent/90 text-accent-foreground",
    1024: "bg-accent text-accent-foreground",
    2048: "bg-accent text-accent-foreground",
  };
  return colors[value] || "bg-accent text-accent-foreground";
};

const getTileSize = (value: number) => {
  if (value >= 1024) return "text-2xl md:text-3xl";
  if (value >= 128) return "text-3xl md:text-4xl";
  return "text-4xl md:text-5xl";
};

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

export default function Game2048() {
  const [board, setBoard] = useState<Board>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const initializeBoard = useCallback(() => {
    const newBoard: Board = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  }, []);

  useEffect(() => {
    const savedBest = localStorage.getItem("2048-best-score");
    if (savedBest) setBestScore(Number.parseInt(savedBest, 10));
    setBoard(initializeBoard());
  }, [initializeBoard]);

  const addRandomTile = (board: Board) => {
    const emptyCells: [number, number][] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (board[i][j] === 0) emptyCells.push([i, j]);
      }
    }
    if (emptyCells.length > 0) {
      const [row, col] =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const move = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      if (gameOver) return;

      const newBoard = board.map((row) => [...row]);
      let moved = false;
      let newScore = score;

      const moveAndMerge = (line: number[]) => {
        const filtered = line.filter((cell) => cell !== 0);
        const merged: number[] = [];
        let skip = false;

        for (let i = 0; i < filtered.length; i++) {
          if (skip) {
            skip = false;
            continue;
          }
          if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
            const mergedValue = filtered[i] * 2;
            merged.push(mergedValue);
            newScore += mergedValue;
            skip = true;
            moved = true;

            if (mergedValue === 2048 && !won) {
              setWon(true);
            }
          } else {
            merged.push(filtered[i]);
          }
        }

        while (merged.length < GRID_SIZE) {
          merged.push(0);
        }

        return merged;
      };

      if (direction === "left") {
        for (let i = 0; i < GRID_SIZE; i++) {
          const newRow = moveAndMerge(newBoard[i]);
          if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i]))
            moved = true;
          newBoard[i] = newRow;
        }
      } else if (direction === "right") {
        for (let i = 0; i < GRID_SIZE; i++) {
          const reversed = [...newBoard[i]].reverse();
          const newRow = moveAndMerge(reversed).reverse();
          if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i]))
            moved = true;
          newBoard[i] = newRow;
        }
      } else if (direction === "up") {
        for (let j = 0; j < GRID_SIZE; j++) {
          const column = newBoard.map((row) => row[j]);
          const newColumn = moveAndMerge(column);
          if (JSON.stringify(newColumn) !== JSON.stringify(column))
            moved = true;
          for (let i = 0; i < GRID_SIZE; i++) {
            newBoard[i][j] = newColumn[i];
          }
        }
      } else if (direction === "down") {
        for (let j = 0; j < GRID_SIZE; j++) {
          const column = newBoard.map((row) => row[j]).reverse();
          const newColumn = moveAndMerge(column).reverse();
          const originalColumn = newBoard.map((row) => row[j]);
          if (JSON.stringify(newColumn) !== JSON.stringify(originalColumn))
            moved = true;
          for (let i = 0; i < GRID_SIZE; i++) {
            newBoard[i][j] = newColumn[i];
          }
        }
      }

      if (moved) {
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(newScore);

        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem("2048-best-score", newScore.toString());
        }

        if (isGameOver(newBoard)) {
          setGameOver(true);
        }
      }
    },
    [board, score, gameOver, bestScore, won],
  );

  const isGameOver = (board: Board) => {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (board[i][j] === 0) return false;
        if (j < GRID_SIZE - 1 && board[i][j] === board[i][j + 1]) return false;
        if (i < GRID_SIZE - 1 && board[i][j] === board[i + 1][j]) return false;
      }
    }
    return true;
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  // Touch support
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

  if (board.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-6xl md:text-7xl font-bold text-foreground">2048</h1>
        <div className="flex flex-col items-center gap-3 mt-2">
          <p className="text-sm text-muted-foreground">
            Use keyboard to move tiles
          </p>
          <div className="flex gap-6">
            {/* Arrow keys */}
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

            {/* WASD keys */}
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
          <p className="text-xs text-muted-foreground">or swipe</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex gap-3">
          <Card className="px-4 py-2 bg-muted">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Score
            </div>
            <div className="text-2xl font-bold text-foreground">{score}</div>
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

      <div className="relative">
        <div
          className="grid gap-3 p-4 bg-muted rounded-xl"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {board.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`
                  w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center
                  font-bold transition-all duration-150
                  ${getTileColor(cell)} ${getTileSize(cell)}
                  ${cell !== 0 ? "animate-in zoom-in-50 duration-200" : ""}
                `}
              >
                {cell !== 0 && cell}
              </div>
            )),
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
