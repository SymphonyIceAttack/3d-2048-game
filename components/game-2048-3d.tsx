"use client";

import {
  Environment,
  OrbitControls,
  RoundedBox,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { RotateCcw } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Mesh } from "three";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Board = number[][][];

const GRID_SIZE = 4;

const getTileColor = (value: number): string => {
  const colors: Record<number, string> = {
    0: "#e5e7eb",
    2: "#f3f4f6",
    4: "#e5e7eb",
    8: "#fbbf24",
    16: "#f59e0b",
    32: "#f97316",
    64: "#ef4444",
    128: "#eab308",
    256: "#84cc16",
    512: "#22c55e",
    1024: "#10b981",
    2048: "#06b6d4",
  };
  return colors[value] || "#06b6d4";
};

interface TileProps {
  value: number;
  position: [number, number, number];
}

function Tile({ value, position }: TileProps) {
  const meshRef = useRef<Mesh>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    setScale(value === 0 ? 0 : 1);
  }, [value]);

  useFrame(() => {
    if (meshRef.current) {
      const lerp = (start: number, end: number, t: number) =>
        start * (1 - t) + end * t;
      meshRef.current.scale.x = lerp(meshRef.current.scale.x, scale, 0.2);
      meshRef.current.scale.y = lerp(meshRef.current.scale.y, scale, 0.2);
      meshRef.current.scale.z = lerp(meshRef.current.scale.z, scale, 0.2);
    }
  });

  if (value === 0) return null;

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[0.8, 0.8, 0.8]}
        radius={0.08}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={getTileColor(value)}
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>
      {/* Front face (Z+) */}
      <Text
        position={[0, 0, 0.41]}
        fontSize={0.3}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>
      {/* Back face (Z-) */}
      <Text
        position={[0, 0, -0.41]}
        fontSize={0.3}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
      >
        {value}
      </Text>
      {/* Right face (X+) */}
      <Text
        position={[0.41, 0, 0]}
        fontSize={0.3}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
      >
        {value}
      </Text>
      {/* Left face (X-) */}
      <Text
        position={[-0.41, 0, 0]}
        fontSize={0.3}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
        rotation={[0, -Math.PI / 2, 0]}
      >
        {value}
      </Text>
      {/* Top face (Y+) */}
      <Text
        position={[0, 0.41, 0]}
        fontSize={0.3}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {value}
      </Text>
      {/* Bottom face (Y-) */}
      <Text
        position={[0, -0.41, 0]}
        fontSize={0.3}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 2, 0, 0]}
      >
        {value}
      </Text>
    </group>
  );
}

function GameBoard({ board }: { board: Board }) {
  const spacing = 1.0;

  return (
    <group>
      {/* Grid frame */}
      {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => {
        const pos = -1.5 + i * spacing;
        return (
          <React.Fragment key={`grid-${i}`}>
            {/* X-axis lines */}
            {Array.from({ length: GRID_SIZE + 1 }).map((_, j) => {
              const posY = -1.5 + j * spacing;
              return (
                <React.Fragment key={`x-${i}-${j}`}>
                  <mesh position={[pos, posY, 0]}>
                    <boxGeometry args={[0.02, 0.02, 4]} />
                    <meshStandardMaterial
                      color="#6b7280"
                      transparent
                      opacity={0.3}
                    />
                  </mesh>
                </React.Fragment>
              );
            })}
            {/* Y-axis lines */}
            {Array.from({ length: GRID_SIZE + 1 }).map((_, k) => {
              const posZ = -1.5 + k * spacing;
              return (
                <React.Fragment key={`y-${i}-${k}`}>
                  <mesh position={[pos, 0, posZ]}>
                    <boxGeometry args={[4, 0.02, 0.02]} />
                    <meshStandardMaterial
                      color="#6b7280"
                      transparent
                      opacity={0.3}
                    />
                  </mesh>
                </React.Fragment>
              );
            })}
            {/* Z-axis lines */}
            {Array.from({ length: GRID_SIZE + 1 }).map((_, j) => {
              const posY = -1.5 + j * spacing;
              return (
                <React.Fragment key={`z-${i}-${j}`}>
                  <mesh position={[0, posY, pos]}>
                    <boxGeometry args={[4, 0.02, 0.02]} />
                    <meshStandardMaterial
                      color="#6b7280"
                      transparent
                      opacity={0.3}
                    />
                  </mesh>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}

      {/* Tiles in 3D space */}
      {board.map((layer, z) =>
        layer.map((row, y) =>
          row.map((cell, x) => {
            const posX = -1.5 + x * spacing;
            const posY = 1.5 - y * spacing;
            const posZ = -1.5 + z * spacing;
            return (
              <Tile
                key={`${x}-${y}-${z}`}
                value={cell}
                position={[posX, posY, posZ]}
              />
            );
          }),
        ),
      )}
    </group>
  );
}

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

export default function Game2048_3D() {
  const [board, setBoard] = useState<Board>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const initializeBoard = useCallback(() => {
    const newBoard: Board = Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => Array(GRID_SIZE).fill(0)),
      );
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  }, []);

  useEffect(() => {
    const savedBest = localStorage.getItem("2048-3d-best-score");
    if (savedBest) setBestScore(Number.parseInt(savedBest, 10));
    setBoard(initializeBoard());
  }, [initializeBoard]);

  const addRandomTile = (board: Board) => {
    const emptyCells: [number, number, number][] = [];
    for (let z = 0; z < GRID_SIZE; z++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          if (board[z][y][x] === 0) emptyCells.push([z, y, x]);
        }
      }
    }
    if (emptyCells.length > 0) {
      const [z, y, x] =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[z][y][x] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const move = useCallback(
    (direction: "left" | "right" | "up" | "down" | "forward" | "backward") => {
      if (gameOver) return;

      const newBoard = board.map((layer) => layer.map((row) => [...row]));
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
        // Move along X-axis (negative direction)
        for (let z = 0; z < GRID_SIZE; z++) {
          for (let y = 0; y < GRID_SIZE; y++) {
            const newRow = moveAndMerge(newBoard[z][y]);
            if (JSON.stringify(newRow) !== JSON.stringify(newBoard[z][y]))
              moved = true;
            newBoard[z][y] = newRow;
          }
        }
      } else if (direction === "right") {
        // Move along X-axis (positive direction)
        for (let z = 0; z < GRID_SIZE; z++) {
          for (let y = 0; y < GRID_SIZE; y++) {
            const reversed = [...newBoard[z][y]].reverse();
            const newRow = moveAndMerge(reversed).reverse();
            if (JSON.stringify(newRow) !== JSON.stringify(newBoard[z][y]))
              moved = true;
            newBoard[z][y] = newRow;
          }
        }
      } else if (direction === "up") {
        // Move along Y-axis (positive direction)
        for (let z = 0; z < GRID_SIZE; z++) {
          for (let x = 0; x < GRID_SIZE; x++) {
            const column = newBoard[z].map((row) => row[x]);
            const newColumn = moveAndMerge(column);
            if (JSON.stringify(newColumn) !== JSON.stringify(column))
              moved = true;
            for (let y = 0; y < GRID_SIZE; y++) {
              newBoard[z][y][x] = newColumn[y];
            }
          }
        }
      } else if (direction === "down") {
        // Move along Y-axis (negative direction)
        for (let z = 0; z < GRID_SIZE; z++) {
          for (let x = 0; x < GRID_SIZE; x++) {
            const column = newBoard[z].map((row) => row[x]).reverse();
            const newColumn = moveAndMerge(column).reverse();
            const originalColumn = newBoard[z].map((row) => row[x]);
            if (JSON.stringify(newColumn) !== JSON.stringify(originalColumn))
              moved = true;
            for (let y = 0; y < GRID_SIZE; y++) {
              newBoard[z][y][x] = newColumn[y];
            }
          }
        }
      } else if (direction === "forward") {
        // Move along Z-axis (negative direction)
        for (let y = 0; y < GRID_SIZE; y++) {
          for (let x = 0; x < GRID_SIZE; x++) {
            const column = newBoard.map((layer) => layer[y][x]);
            const newColumn = moveAndMerge(column);
            if (JSON.stringify(newColumn) !== JSON.stringify(column))
              moved = true;
            for (let z = 0; z < GRID_SIZE; z++) {
              newBoard[z][y][x] = newColumn[z];
            }
          }
        }
      } else if (direction === "backward") {
        // Move along Z-axis (positive direction)
        for (let y = 0; y < GRID_SIZE; y++) {
          for (let x = 0; x < GRID_SIZE; x++) {
            const column = newBoard.map((layer) => layer[y][x]).reverse();
            const newColumn = moveAndMerge(column).reverse();
            const originalColumn = newBoard.map((layer) => layer[y][x]);
            if (JSON.stringify(newColumn) !== JSON.stringify(originalColumn))
              moved = true;
            for (let z = 0; z < GRID_SIZE; z++) {
              newBoard[z][y][x] = newColumn[z];
            }
          }
        }
      }

      if (moved) {
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(newScore);

        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem("2048-3d-best-score", newScore.toString());
        }

        if (isGameOver(newBoard)) {
          setGameOver(true);
        }
      }
    },
    [board, score, gameOver, bestScore, won],
  );

  const isGameOver = (board: Board) => {
    for (let z = 0; z < GRID_SIZE; z++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          if (board[z][y][x] === 0) return false;
          if (x < GRID_SIZE - 1 && board[z][y][x] === board[z][y][x + 1])
            return false;
          if (y < GRID_SIZE - 1 && board[z][y][x] === board[z][y + 1][x])
            return false;
          if (z < GRID_SIZE - 1 && board[z][y][x] === board[z + 1][y][x])
            return false;
        }
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
          "q",
          "e",
          "Q",
          "E",
        ].includes(e.key)
      ) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
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
        case "w":
        case "W":
          move("forward");
          break;
        case "s":
        case "S":
          move("backward");
          break;
        case "q":
        case "Q":
          move("forward");
          break;
        case "e":
        case "E":
          move("backward");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  if (board.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-6xl md:text-7xl font-bold text-foreground">
          2048 3D
        </h1>
        <div className="flex flex-col items-center gap-3 mt-2">
          <p className="text-sm text-muted-foreground">
            Move tiles in 3D space
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
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
                Up/Down/Left/Right
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-1">
                  <KeyboardKey>Q</KeyboardKey>
                  <KeyboardKey>W</KeyboardKey>
                  <KeyboardKey>E</KeyboardKey>
                </div>
                <div className="flex gap-1">
                  <KeyboardKey>A</KeyboardKey>
                  <KeyboardKey>S</KeyboardKey>
                  <KeyboardKey>D</KeyboardKey>
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                Forward/Back/Left/Right
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Drag to rotate and view the cube
          </p>
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

      <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <Canvas
          shadows
          camera={{ position: [6, 6, 6], fov: 50 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.3} />
          <pointLight position={[5, -5, 5]} intensity={0.3} />

          <GameBoard board={board} />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={5}
            maxDistance={15}
          />

          <Environment preset="city" />
        </Canvas>

        {(gameOver || won) && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Card className="p-6 text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                {won ? "🎉 You Win!" : "Game Over"}
              </h2>
              <p className="text-muted-foreground">
                {won
                  ? `Congratulations! You reached 2048 in 3D space!`
                  : "No more moves available"}
              </p>
              <Button onClick={resetGame} size="lg" className="w-full">
                Try Again
              </Button>
            </Card>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>Merge tiles with the same number in a 4×4×4 cube to reach 2048!</p>
        <p className="text-xs">
          Tip: Rotate the view to observe the entire cube space
        </p>
      </div>
    </div>
  );
}
