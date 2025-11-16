import {
  type Direction2D,
  type Direction3D,
  type GameHistory,
  GRID_SIZE,
} from "./types";

export function initializeBoard2D(): number[][] {
  const board: number[][] = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(0));
  addRandomTile2D(board);
  addRandomTile2D(board);
  return board;
}

export function initializeBoard3D(): number[][][] {
  const board: number[][][] = Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(0)),
    );
  addRandomTile3D(board);
  addRandomTile3D(board);
  return board;
}

export function addRandomTile2D(board: number[][]): void {
  const emptyCells: [number, number][] = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (board[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  if (emptyCells.length > 0) {
    const [row, col] =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
}

export function addRandomTile3D(board: number[][][]): void {
  const emptyCells: [number, number, number][] = [];
  for (let z = 0; z < GRID_SIZE; z++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (board[z][y][x] === 0) {
          emptyCells.push([z, y, x]);
        }
      }
    }
  }
  if (emptyCells.length > 0) {
    const [z, y, x] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[z][y][x] = Math.random() < 0.9 ? 2 : 4;
  }
}

export function moveAndMerge(line: number[]): {
  merged: number[];
  moved: boolean;
  scoreGained: number;
} {
  const filtered = line.filter((cell) => cell !== 0);
  const merged: number[] = [];
  let skip = false;
  let moved = false;
  let scoreGained = 0;

  for (let i = 0; i < filtered.length; i++) {
    if (skip) {
      skip = false;
      continue;
    }
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      const mergedValue = filtered[i] * 2;
      merged.push(mergedValue);
      scoreGained += mergedValue;
      skip = true;
      moved = true;
    } else {
      merged.push(filtered[i]);
    }
  }

  while (merged.length < GRID_SIZE) {
    merged.push(0);
  }

  if (JSON.stringify(merged) !== JSON.stringify(line)) {
    moved = true;
  }

  return { merged, moved, scoreGained };
}

export function moveBoard2D(
  board: number[][],
  direction: Direction2D,
): { board: number[][]; moved: boolean; scoreGained: number } {
  const newBoard = board.map((row) => [...row]);
  let moved = false;
  let scoreGained = 0;

  if (direction === "left") {
    for (let i = 0; i < GRID_SIZE; i++) {
      const {
        merged,
        moved: lineMoved,
        scoreGained: gained,
      } = moveAndMerge(newBoard[i]);
      if (lineMoved) moved = true;
      scoreGained += gained;
      newBoard[i] = merged;
    }
  } else if (direction === "right") {
    for (let i = 0; i < GRID_SIZE; i++) {
      const reversed = [...newBoard[i]].reverse();
      const { merged, scoreGained: gained } = moveAndMerge(reversed);
      const newRow = merged.reverse();
      if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i])) {
        moved = true;
      }
      scoreGained += gained;
      newBoard[i] = newRow;
    }
  } else if (direction === "up") {
    for (let j = 0; j < GRID_SIZE; j++) {
      const column = newBoard.map((row) => row[j]);
      const { merged, scoreGained: gained } = moveAndMerge(column);
      scoreGained += gained;
      for (let i = 0; i < GRID_SIZE; i++) {
        newBoard[i][j] = merged[i];
      }
    }
  } else if (direction === "down") {
    for (let j = 0; j < GRID_SIZE; j++) {
      const column = newBoard.map((row) => row[j]).reverse();
      const { merged, scoreGained: gained } = moveAndMerge(column);
      const newColumn = merged.reverse();
      const originalColumn = newBoard.map((row) => row[j]);
      if (JSON.stringify(newColumn) !== JSON.stringify(originalColumn)) {
        moved = true;
      }
      scoreGained += gained;
      for (let i = 0; i < GRID_SIZE; i++) {
        newBoard[i][j] = newColumn[i];
      }
    }
  }

  return { board: newBoard, moved, scoreGained };
}

export function moveBoard3D(
  board: number[][][],
  direction: Direction3D,
): { board: number[][][]; moved: boolean; scoreGained: number } {
  const newBoard = board.map((layer) => layer.map((row) => [...row]));
  let moved = false;
  let scoreGained = 0;

  if (direction === "left") {
    for (let z = 0; z < GRID_SIZE; z++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const {
          merged,
          moved: lineMoved,
          scoreGained: gained,
        } = moveAndMerge(newBoard[z][y]);
        if (lineMoved) moved = true;
        scoreGained += gained;
        newBoard[z][y] = merged;
      }
    }
  } else if (direction === "right") {
    for (let z = 0; z < GRID_SIZE; z++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const reversed = [...newBoard[z][y]].reverse();
        const { merged, scoreGained: gained } = moveAndMerge(reversed);
        const newRow = merged.reverse();
        if (JSON.stringify(newRow) !== JSON.stringify(newBoard[z][y])) {
          moved = true;
        }
        scoreGained += gained;
        newBoard[z][y] = newRow;
      }
    }
  } else if (direction === "up") {
    for (let z = 0; z < GRID_SIZE; z++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const column = newBoard[z].map((row) => row[x]);
        const { merged, scoreGained: gained } = moveAndMerge(column);
        scoreGained += gained;
        for (let y = 0; y < GRID_SIZE; y++) {
          newBoard[z][y][x] = merged[y];
        }
      }
    }
  } else if (direction === "down") {
    for (let z = 0; z < GRID_SIZE; z++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const column = newBoard[z].map((row) => row[x]).reverse();
        const { merged, scoreGained: gained } = moveAndMerge(column);
        const newColumn = merged.reverse();
        const originalColumn = newBoard[z].map((row) => row[x]);
        if (JSON.stringify(newColumn) !== JSON.stringify(originalColumn)) {
          moved = true;
        }
        scoreGained += gained;
        for (let y = 0; y < GRID_SIZE; y++) {
          newBoard[z][y][x] = newColumn[y];
        }
      }
    }
  } else if (direction === "forward") {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const column = newBoard.map((layer) => layer[y][x]);
        const { merged, scoreGained: gained } = moveAndMerge(column);
        scoreGained += gained;
        for (let z = 0; z < GRID_SIZE; z++) {
          newBoard[z][y][x] = merged[z];
        }
      }
    }
  } else if (direction === "backward") {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const column = newBoard.map((layer) => layer[y][x]).reverse();
        const { merged, scoreGained: gained } = moveAndMerge(column);
        const newColumn = merged.reverse();
        const originalColumn = newBoard.map((layer) => layer[y][x]);
        if (JSON.stringify(newColumn) !== JSON.stringify(originalColumn)) {
          moved = true;
        }
        scoreGained += gained;
        for (let z = 0; z < GRID_SIZE; z++) {
          newBoard[z][y][x] = newColumn[z];
        }
      }
    }
  }

  return { board: newBoard, moved, scoreGained };
}

export function isGameOver2D(board: number[][]): boolean {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (board[i][j] === 0) return false;
      if (j < GRID_SIZE - 1 && board[i][j] === board[i][j + 1]) return false;
      if (i < GRID_SIZE - 1 && board[i][j] === board[i + 1][j]) return false;
    }
  }
  return true;
}

export function isGameOver3D(board: number[][][]): boolean {
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
}

export function checkWin(board: number[][] | number[][][]): boolean {
  const flatBoard = Array.isArray(board[0][0])
    ? (board as number[][][]).flat(2)
    : (board as number[][]).flat();
  return flatBoard.includes(2048);
}

export function saveBestScore(score: number, storageKey: string): void {
  const saved = localStorage.getItem(storageKey);
  if (saved && Number(saved) < score) {
    localStorage.setItem(storageKey, score.toString());
  } else if (!saved) {
    localStorage.setItem(storageKey, score.toString());
  }
}

export function loadBestScore(storageKey: string): number {
  const saved = localStorage.getItem(storageKey);
  return saved ? Number.parseInt(saved, 10) : 0;
}

export function createSnapshot(
  board: number[][] | number[][][],
  score: number,
): GameHistory {
  return {
    board: Array.isArray(board[0][0])
      ? (board as number[][][]).map((layer) => layer.map((row) => [...row]))
      : (board as number[][]).map((row) => [...row]),
    score,
    depth: 0,
  };
}
