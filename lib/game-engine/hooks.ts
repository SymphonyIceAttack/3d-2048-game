import { useCallback, useEffect, useState } from "react";
import {
  addRandomTile2D,
  addRandomTile3D,
  checkWin,
  createSnapshot,
  initializeBoard2D,
  initializeBoard3D,
  isGameOver2D,
  isGameOver3D,
  loadBestScore,
  moveBoard2D,
  moveBoard3D,
  saveBestScore,
} from "./engine";
import type { Direction2D, Direction3D, GameHistory } from "./types";

export function useGameEngine2D(storageKey: string = "2048-best-score") {
  const [board, setBoard] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [history, setHistory] = useState<GameHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const savedBest = loadBestScore(storageKey);
    setBestScore(savedBest);
    setBoard(initializeBoard2D());
  }, [storageKey]);

  const saveToHistory = useCallback(
    (board: number[][], score: number) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(createSnapshot(board, score));
        return newHistory.slice(-50);
      });
      setHistoryIndex((prev) => Math.min(prev + 1, 49));
    },
    [historyIndex],
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setBoard((prevState.board as number[][]).map((row) => [...row]));
      setScore(prevState.score);
      setHistoryIndex((prev) => prev - 1);
    }
  }, [history, historyIndex]);

  const resetGame = useCallback(() => {
    const newBoard = initializeBoard2D();
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  const move = useCallback(
    (direction: Direction2D) => {
      if (gameOver) return;

      setBoard((currentBoard) => {
        const {
          board: newBoard,
          moved,
          scoreGained,
        } = moveBoard2D(currentBoard, direction);

        if (!moved) return currentBoard;

        const newScore = score + scoreGained;
        const boardWithTile = newBoard.map((row) => [...row]);
        addRandomTile2D(boardWithTile);

        saveToHistory(boardWithTile, newScore);
        setScore(newScore);

        if (newScore > bestScore) {
          setBestScore(newScore);
          saveBestScore(newScore, storageKey);
        }

        const gameIsOver = isGameOver2D(boardWithTile);
        const hasWon = checkWin(boardWithTile);

        setGameOver(gameIsOver);
        if (hasWon && !won) {
          setWon(true);
        }

        return boardWithTile;
      });
    },
    [gameOver, score, bestScore, won, saveToHistory, storageKey],
  );

  return {
    board,
    score,
    bestScore,
    gameOver,
    won,
    canUndo: historyIndex > 0,
    move,
    resetGame,
    undo,
  };
}

export function useGameEngine3D(storageKey: string = "2048-3d-best-score") {
  const [board, setBoard] = useState<number[][][]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [history, setHistory] = useState<GameHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const savedBest = loadBestScore(storageKey);
    setBestScore(savedBest);
    setBoard(initializeBoard3D());
  }, [storageKey]);

  const saveToHistory = useCallback(
    (board: number[][][], score: number) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(createSnapshot(board, score));
        return newHistory.slice(-50);
      });
      setHistoryIndex((prev) => Math.min(prev + 1, 49));
    },
    [historyIndex],
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setBoard(
        (prevState.board as number[][][]).map((layer) =>
          layer.map((row) => [...row]),
        ),
      );
      setScore(prevState.score);
      setHistoryIndex((prev) => prev - 1);
    }
  }, [history, historyIndex]);

  const resetGame = useCallback(() => {
    const newBoard = initializeBoard3D();
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  const move = useCallback(
    (direction: Direction3D) => {
      if (gameOver) return;

      setBoard((currentBoard) => {
        const {
          board: newBoard,
          moved,
          scoreGained,
        } = moveBoard3D(currentBoard, direction);

        if (!moved) return currentBoard;

        const newScore = score + scoreGained;
        const boardWithTile = newBoard.map((layer) =>
          layer.map((row) => [...row]),
        );
        addRandomTile3D(boardWithTile);

        saveToHistory(boardWithTile, newScore);
        setScore(newScore);

        if (newScore > bestScore) {
          setBestScore(newScore);
          saveBestScore(newScore, storageKey);
        }

        const gameIsOver = isGameOver3D(boardWithTile);
        const hasWon = checkWin(boardWithTile);

        setGameOver(gameIsOver);
        if (hasWon && !won) {
          setWon(true);
        }

        return boardWithTile;
      });
    },
    [gameOver, score, bestScore, won, saveToHistory, storageKey],
  );

  return {
    board,
    score,
    bestScore,
    gameOver,
    won,
    canUndo: historyIndex > 0,
    move,
    resetGame,
    undo,
  };
}
