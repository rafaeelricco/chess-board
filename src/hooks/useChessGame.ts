import {
  checkWinner,
  clearHighlights,
  getPossibleMoves,
  initializeGame,
  movePiece,
} from "@/features/chess-board/game-logic";
import { GameState, Position } from "@/features/chess-board/types";
import React from "react";

const TARGET_CELL_SIZE = 80;
const MAX_BOARD_DIMENSION = 800;

export function useChessGame() {
  const [rows, setRows] = React.useState(8);
  const [cols, setCols] = React.useState(8);
  const [inputRows, setInputRows] = React.useState("8");
  const [inputCols, setInputCols] = React.useState("8");
  const [error, setError] = React.useState<string | null>(null);

  const [gameState, setGameState] = React.useState<GameState>({
    board: initializeGame(8, 8),
    currentTurn: "white",
    selectedPiece: null,
    possibleMoves: [],
    gameStarted: false,
    winner: null,
    lastMove: null,
  });

  React.useEffect(() => {
    if (gameState.lastMove) {
      const timer = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          board: clearHighlights(prev.board),
          lastMove: null,
        }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [gameState.lastMove]);

  const handleApplyDimensions = () => {
    const numRows = parseInt(inputRows, 10);
    const numCols = parseInt(inputCols, 10);

    if (
      isNaN(numRows) ||
      isNaN(numCols) ||
      numRows < 6 ||
      numRows > 12 ||
      numCols < 6 ||
      numCols > 12
    ) {
      setError("As dimensões devem ser números entre 6 e 12.");
      return;
    }
    setError(null);
    setRows(numRows);
    setCols(numCols);

    setGameState({
      board: initializeGame(numRows, numCols),
      currentTurn: "white",
      selectedPiece: null,
      possibleMoves: [],
      gameStarted: false,
      winner: null,
      lastMove: null,
    });
  };

  const handleStartGame = () => {
    setGameState((prev) => ({
      ...prev,
      board: initializeGame(rows, cols),
      currentTurn: "white",
      selectedPiece: null,
      possibleMoves: [],
      gameStarted: true,
      winner: null,
      lastMove: null,
    }));
  };

  const handleSelectPiece = (position: Position | null) => {
    if (!gameState.gameStarted || gameState.winner) return;

    if (!position) {
      setGameState((prev) => ({
        ...prev,
        selectedPiece: null,
        possibleMoves: [],
      }));
      return;
    }

    const possibleMoves = getPossibleMoves(
      gameState.board,
      position,
      rows,
      cols
    );

    setGameState((prev) => ({
      ...prev,
      selectedPiece: position,
      possibleMoves,
    }));
  };

  const handleMove = (from: Position, to: Position) => {
    if (!gameState.gameStarted || gameState.winner) return;

    const { newBoard, capturedPiece } = movePiece(gameState.board, from, to);
    const winner = checkWinner(newBoard);

    setGameState((prev) => ({
      ...prev,
      board: newBoard,
      currentTurn: prev.currentTurn === "white" ? "black" : "white",
      selectedPiece: null,
      possibleMoves: [],
      winner,
      lastMove: { from, to },
    }));
  };

  const handleGoBackToHome = () => {
    setGameState((prev) => ({
      ...prev,
      gameStarted: false,
      winner: null,
    }));
  };

  const handleStartNewMatch = () => {
    setGameState({
      board: initializeGame(rows, cols),
      currentTurn: "white",
      selectedPiece: null,
      possibleMoves: [],
      gameStarted: true,
      winner: null,
      lastMove: null,
    });
  };

  // Calculate board dimensions
  let cellSize = TARGET_CELL_SIZE;
  if (cols * cellSize > MAX_BOARD_DIMENSION) {
    cellSize = MAX_BOARD_DIMENSION / cols;
  }
  if (rows * cellSize > MAX_BOARD_DIMENSION) {
    cellSize = Math.min(cellSize, MAX_BOARD_DIMENSION / rows);
  }

  const boardDisplayWidth = cols * cellSize;
  const boardDisplayHeight = rows * cellSize;

  return {
    // State
    rows,
    cols,
    inputRows,
    inputCols,
    error,
    gameState,
    boardDisplayWidth,
    boardDisplayHeight,

    // Actions
    setInputRows,
    setInputCols,
    handleApplyDimensions,
    handleStartGame,
    handleSelectPiece,
    handleMove,
    handleGoBackToHome,
    handleStartNewMatch,
  };
}
