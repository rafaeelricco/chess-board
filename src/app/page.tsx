"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ChessBoard } from "@/features/ChessBoard/ChessBoard";
import {
  checkWinner,
  getPossibleMoves,
  initializeGame,
  movePiece,
} from "@/features/ChessBoard/gameLogic";
import { GameState, Position } from "@/features/ChessBoard/types";

export default function Home() {
  const [rows, setRows] = React.useState(8);
  const [cols, setCols] = React.useState(8);
  const [inputRows, setInputRows] = React.useState("8");
  const [inputCols, setInputCols] = React.useState("8");
  const [error, setError] = React.useState<string | null>(null);

  // Estado do jogo
  const [gameState, setGameState] = React.useState<GameState>({
    board: initializeGame(8, 8),
    currentTurn: "white",
    selectedPiece: null,
    possibleMoves: [],
    gameStarted: false,
    winner: null,
  });

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

    // Resetar o jogo com as novas dimensões
    setGameState({
      board: initializeGame(numRows, numCols),
      currentTurn: "white",
      selectedPiece: null,
      possibleMoves: [],
      gameStarted: false,
      winner: null,
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
    }));
  };

  return (
    <React.Fragment>
      <div className="grid gap-4 place-items-center h-screen content-center">
        <div className="absolute top-4 right-4">
          <Link href="/rules">
            <Button variant="ghost" className="text-white hover:text-blue-300">
              Regras do Jogo
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Unvoid Chess Game
        </h1>

        <ChessBoard
          rows={rows}
          cols={cols}
          board={gameState.board}
          gameStarted={gameState.gameStarted}
          currentTurn={gameState.currentTurn}
          onMove={handleMove}
          selectedPiece={gameState.selectedPiece}
          onSelectPiece={handleSelectPiece}
          possibleMoves={gameState.possibleMoves}
        />
        <div className="flex flex-col items-center">
          {gameState.winner && (
            <div className="mb-4 p-3 bg-green-800 bg-opacity-80 text-white rounded-lg shadow-lg">
              Vencedor: {gameState.winner === "white" ? "Brancas" : "Pretas"}!
            </div>
          )}
          {gameState.gameStarted && !gameState.winner && (
            <div className="mb-4 p-3 bg-blue-800 bg-opacity-80 text-white rounded-lg shadow-lg">
              Vez das peças:{" "}
              {gameState.currentTurn === "white" ? "Brancas" : "Pretas"}
            </div>
          )}
          {!gameState.gameStarted ? (
            <>
              <div className="mb-6 p-4 bg-neutral-800 bg-opacity-70 rounded-lg shadow-xl flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="rowsInput"
                    className="text-sm font-medium text-neutral-200"
                  >
                    Linhas (Y):
                  </label>
                  <input
                    id="rowsInput"
                    type="number"
                    value={inputRows}
                    onChange={(e) => setInputRows(e.target.value)}
                    className="w-20 p-2 border border-neutral-600 rounded-md bg-neutral-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="6"
                    max="12"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="colsInput"
                    className="text-sm font-medium text-neutral-200"
                  >
                    Colunas (X):
                  </label>
                  <input
                    id="colsInput"
                    type="number"
                    value={inputCols}
                    onChange={(e) => setInputCols(e.target.value)}
                    className="w-20 p-2 border border-neutral-600 rounded-md bg-neutral-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="6"
                    max="12"
                  />
                </div>
                <button
                  onClick={handleApplyDimensions}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Aplicar Escala
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm mb-4 bg-red-900 bg-opacity-50 p-2 rounded">
                  {error}
                </p>
              )}
              <Button variant="outline" onClick={handleStartGame}>
                Play
              </Button>
            </>
          ) : (
            <div className="flex gap-4">
              {!gameState.winner && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (confirm("Tem certeza que deseja reiniciar o jogo?")) {
                      handleStartGame();
                    }
                  }}
                >
                  Reiniciar
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setGameState((prev) => ({
                    ...prev,
                    gameStarted: false,
                    winner: null,
                  }));
                }}
              >
                {gameState.winner ? "Novo Jogo" : "Voltar"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
