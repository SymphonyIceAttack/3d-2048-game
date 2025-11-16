export type GridSize = 4;

export interface Position2D {
  row: number;
  col: number;
}

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export type Direction2D = "up" | "down" | "left" | "right";

export type Direction3D =
  | "left"
  | "right"
  | "up"
  | "down"
  | "forward"
  | "backward";

export type MoveDirection = Direction2D | Direction3D;

export interface GameState2D {
  board: number[][];
  score: number;
  bestScore: number;
  gameOver: boolean;
  won: boolean;
}

export interface GameState3D {
  board: number[][][];
  score: number;
  bestScore: number;
  gameOver: boolean;
  won: boolean;
}

export interface MoveResult {
  board: number[][] | number[][][];
  score: number;
  moved: boolean;
}

export interface GameHistory {
  board: number[][] | number[][][];
  score: number;
  depth: number;
}

export const GRID_SIZE = 4;

export const TILE_COLORS: Record<number, string> = {
  2: "#fef3c7",
  4: "#fde68a",
  8: "#fbbf24",
  16: "#f59e0b",
  32: "#f97316",
  64: "#ef4444",
  128: "#ec4899",
  256: "#d946ef",
  512: "#a855f7",
  1024: "#8b5cf6",
  2048: "#06b6d4",
  4096: "#06d6a0",
  8192: "#10b981",
};
