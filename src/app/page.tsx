"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChessBoard } from "@/features/ChessBoard/ChessBoard";
import {
  checkWinner,
  clearHighlights,
  getPossibleMoves,
  initializeGame,
  movePiece,
} from "@/features/ChessBoard/gameLogic";
import { GameState, Position } from "@/features/ChessBoard/types";
import { Check } from "lucide-react";

const TARGET_CELL_SIZE = 80; // Define o tamanho desejado para cada célula
const MAX_BOARD_DIMENSION = 800; // Define a dimensão máxima para o tabuleiro (largura/altura)

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
    lastMove: null,
  });

  // Limpar destaques depois de 3 segundos
  React.useEffect(() => {
    if (gameState.lastMove) {
      // Timer mais longo para dar um sinal visual mais claro
      const timer = setTimeout(() => {
        // Aplicar limpeza do destaque
        setGameState((prev) => ({
          ...prev,
          board: clearHighlights(prev.board),
          lastMove: null,
        }));
      }, 3000); // Mantém 3 segundos conforme requisitos

      return () => clearTimeout(timer);
    }
  }, [gameState.lastMove]);

  // Selecionar automaticamente uma peça quando o turno mudar
  React.useEffect(() => {
    if (gameState.gameStarted && !gameState.winner) {
      // Seleciona uma peça automaticamente quando o turno muda
      selectFirstAvailablePiece();
    }
  }, [gameState.currentTurn, gameState.gameStarted, gameState.winner]);

  // Função que seleciona a primeira peça disponível do turno atual
  const selectFirstAvailablePiece = () => {
    if (!gameState.gameStarted || gameState.winner) return;

    const currentTurn = gameState.currentTurn;

    // Procura a primeira peça disponível da cor do turno atual
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = gameState.board[row][col];
        if (cell.piece && cell.piece.color === currentTurn) {
          const position = { row, col };
          const possibleMoves = getPossibleMoves(
            gameState.board,
            position,
            rows,
            cols
          );

          // Só seleciona se a peça tiver movimentos possíveis
          if (possibleMoves.length > 0) {
            setGameState((prev) => ({
              ...prev,
              selectedPiece: position,
              possibleMoves,
            }));
            return;
          }
        }
      }
    }
  };

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

  // Calcula o tamanho da célula dinamicamente para caber no MAX_BOARD_DIMENSION
  let cellSize = TARGET_CELL_SIZE;
  if (cols * cellSize > MAX_BOARD_DIMENSION) {
    cellSize = MAX_BOARD_DIMENSION / cols;
  }
  // Recalcula baseado nas linhas, caso a restrição de altura seja mais forte ou após ajuste da largura
  if (rows * cellSize > MAX_BOARD_DIMENSION) {
    cellSize = Math.min(cellSize, MAX_BOARD_DIMENSION / rows);
  }

  const boardDisplayWidth = cols * cellSize;
  const boardDisplayHeight = rows * cellSize;

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

        {!gameState.winner ? (
          <ChessBoard
            rows={rows}
            cols={cols}
            boardWidth={boardDisplayWidth}
            boardHeight={boardDisplayHeight}
            board={gameState.board}
            gameStarted={gameState.gameStarted}
            currentTurn={gameState.currentTurn}
            onMove={handleMove}
            selectedPiece={gameState.selectedPiece}
            onSelectPiece={handleSelectPiece}
            possibleMoves={gameState.possibleMoves}
          />
        ) : (
          <div className="bg-[#1e1f2563] backdrop-blur-sm border border-[#5a5a5e77] rounded-lg shadow-xl flex flex-col items-center min-h-10 max-w-md min-w-[534px] py-8 gap-8">
            <Image
              src="/images/icon.png"
              alt="Victory Star"
              width={54}
              height={54}
            />
            <h2 className="text-white text-2xl font-bold uppercase tracking-wider my-8">
              {gameState.winner === "white" ? "WHITE" : "BLACK"} PIECES WON!
            </h2>
            <div className="w-full h-px bg-gray-700 my-8"></div>
            <div className="flex flex-col justify-center items-center md:flex-row gap-4 w-full px-8">
              <button
                onClick={handleGoBackToHome}
                className="flex-1 py-2 px-4 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Go Back To Home
              </button>
              <button
                onClick={handleStartNewMatch}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start New Match
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center">
          {!gameState.gameStarted && !gameState.winner ? (
            <div className="flex justify-between items-center w-[658px]">
              <div className="bg-transparent backdrop-blur-sm border border-[#5A5A5E] rounded-lg shadow-xl flex flex-col sm:flex-row items-center min-h-10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#5A5A5E] px-2">
                      Scale
                    </span>
                    <label
                      htmlFor="rowsInput"
                      className="text-sm font-semibold text-white"
                    >
                      Y
                    </label>
                    <input
                      id="rowsInput"
                      type="number"
                      value={inputRows}
                      onChange={(e) => setInputRows(e.target.value)}
                      className="w-16 p-2 py-0.5 border border-neutral-600 rounded-md bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="6"
                      max="12"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="colsInput"
                      className="text-sm font-semibold text-white"
                    >
                      X
                    </label>
                    <input
                      id="colsInput"
                      type="number"
                      value={inputCols}
                      onChange={(e) => setInputCols(e.target.value)}
                      className="w-16 p-2 py-0.5 border border-neutral-600 rounded-md bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="6"
                      max="12"
                    />
                  </div>
                </div>
                <div className="h-10 pl-2">
                  <Separator
                    orientation="vertical"
                    className="h-full bg-[#5A5A5E]"
                  />
                </div>
                <button
                  onClick={handleApplyDimensions}
                  className="bg-transparent px-4"
                >
                  <Check className="w-4 h-4 text-[#c9c9c9]" />
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
            </div>
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
              {!gameState.winner && (
                <Button variant="outline" onClick={handleGoBackToHome}>
                  Voltar
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
