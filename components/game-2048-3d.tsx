"use client";

import { a, useSpring } from "@react-spring/three";
import {
  Environment,
  OrbitControls,
  RoundedBox,
  Sparkles,
  Text,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RotateCcw, Undo2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Mesh } from "three";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGameEngine3D } from "@/lib/game-engine/hooks";
import { TILE_COLORS } from "@/lib/game-engine/types";
import { GlowEffect, ParticleBurst } from "./particle-system";

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

interface TileProps {
  value: number;
  position: [number, number, number];
  isNew?: boolean;
  isMerged?: boolean;
}

function Tile({ value, position, isNew, isMerged }: TileProps) {
  const meshRef = useRef<Mesh>(null);
  const [showParticles, setShowParticles] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  const color = TILE_COLORS[value] || TILE_COLORS[4096];

  const targetScale = isNew ? 1.2 : isMerged ? 1.3 : 1.0;

  const springs = useSpring({
    scale: [targetScale, targetScale, targetScale],
    config: { tension: 300, friction: 20 },
  });

  useEffect(() => {
    if (isMerged) {
      setShowParticles(true);
      setShowGlow(true);
      const timer = setTimeout(() => {
        setShowGlow(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isMerged]);

  if (value === 0) return null;

  return (
    <group position={position}>
      {showGlow && (
        <GlowEffect
          position={[0, 0, 0]}
          color={color}
          size={2}
          duration={0.8}
        />
      )}

      {showParticles && (
        <ParticleBurst
          position={[0, 0, 0]}
          count={25}
          color={color}
          onComplete={() => setShowParticles(false)}
        />
      )}

      <a.group scale={springs.scale.to((s) => [s, s, s])}>
        <RoundedBox
          ref={meshRef}
          args={[0.8, 0.8, 0.8]}
          radius={0.08}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.1}
            emissive={isMerged ? color : "#000000"}
            emissiveIntensity={isMerged ? 0.3 : 0}
          />
        </RoundedBox>

        {value >= 128 && (
          <Sparkles
            count={20}
            scale={[1.2, 1.2, 1.2]}
            size={2}
            speed={0.3}
            color={color}
          />
        )}

        <Text
          position={[0, 0, 0.41]}
          fontSize={0.3}
          color="#1f2937"
          anchorX="center"
          anchorY="middle"
        >
          {value}
        </Text>
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
      </a.group>
    </group>
  );
}

function GameBoard({ board }: { board: number[][][] }) {
  const spacing = 1.0;

  const gridElements = useMemo(() => {
    const elements: React.ReactNode[] = [];

    for (let i = 0; i <= GRID_SIZE; i++) {
      const pos = -1.5 + i * spacing;

      for (let j = 0; j <= GRID_SIZE; j++) {
        const posY = -1.5 + j * spacing;
        elements.push(
          <mesh key={`x-${i}-${j}`} position={[pos, posY, 0]}>
            <boxGeometry args={[0.02, 0.02, 4]} />
            <meshStandardMaterial color="#6b7280" transparent opacity={0.3} />
          </mesh>,
        );
      }

      for (let k = 0; k <= GRID_SIZE; k++) {
        const posZ = -1.5 + k * spacing;
        elements.push(
          <mesh key={`y-${i}-${k}`} position={[pos, 0, posZ]}>
            <boxGeometry args={[4, 0.02, 0.02]} />
            <meshStandardMaterial color="#6b7280" transparent opacity={0.3} />
          </mesh>,
        );
      }

      for (let j = 0; j <= GRID_SIZE; j++) {
        const posY = -1.5 + j * spacing;
        elements.push(
          <mesh key={`z-${i}-${j}`} position={[0, posY, pos]}>
            <boxGeometry args={[4, 0.02, 0.02]} />
            <meshStandardMaterial color="#6b7280" transparent opacity={0.3} />
          </mesh>,
        );
      }
    }

    return elements;
  }, [spacing]);

  return (
    <group>
      {gridElements}

      {board.map((layer, z) =>
        layer.map((row, y) =>
          row.map((cell, x) => {
            const posX = -1.5 + x * spacing;
            const posY = 1.5 - y * spacing;
            const posZ = -1.5 + z * spacing;
            const isNew = cell !== 0 && Math.random() > 0.7;
            const isMerged = cell >= 128;
            return (
              <Tile
                key={`${x}-${y}-${z}`}
                value={cell}
                position={[posX, posY, posZ]}
                isNew={isNew}
                isMerged={isMerged}
              />
            );
          }),
        ),
      )}
    </group>
  );
}

export default function Game2048_3D() {
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
  } = useGameEngine3D("2048-3d-best-score");

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
          "q",
          "e",
          "Q",
          "E",
          "z",
          "Z",
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
        case "z":
        case "Z":
          if (canUndo) undo();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move, undo, canUndo]);

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
            Drag to rotate and view the cube • Press Z to undo
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

      <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <Canvas
          shadows
          camera={{ position: [6, 6, 6], fov: 50 }}
          gl={{ antialias: true }}
          frameloop="always"
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
