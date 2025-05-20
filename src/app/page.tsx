"use client";

import React from "react";

import { BoardDimensionsControl } from "@/components/ui/board-dimensions-control";
import { GameControls } from "@/components/ui/game-controls";
import { GameStatus } from "@/components/ui/game-status";
import { WinnerModal } from "@/components/ui/winner-modal";
import { ChessBoard } from "@/features/chess-board/chess-board";
import { useChessGame } from "@/hooks/useChessGame";

export default function Home() {
  const {
    rows,
    cols,
    inputRows,
    inputCols,
    error,
    gameState,
    boardDisplayWidth,
    boardDisplayHeight,
    setInputRows,
    setInputCols,
    handleApplyDimensions,
    handleStartGame,
    handleSelectPiece,
    handleMove,
    handleGoBackToHome,
    handleStartNewMatch,
  } = useChessGame();

  return (
    <React.Fragment>
      <div className="grid gap-4 place-items-center h-screen content-center">
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
          <WinnerModal
            winner={gameState.winner}
            onGoBackToHome={handleGoBackToHome}
            onStartNewMatch={handleStartNewMatch}
          />
        )}
        <div className="flex flex-col gap-4 items-center">
          <GameStatus
            currentTurn={gameState.currentTurn}
            gameStarted={gameState.gameStarted}
            winner={gameState.winner}
          />
          {!gameState.gameStarted && !gameState.winner ? (
            <div className="flex justify-between items-center w-[658px]">
              <BoardDimensionsControl
                inputRows={inputRows}
                inputCols={inputCols}
                onRowsChange={setInputRows}
                onColsChange={setInputCols}
                onApplyDimensions={handleApplyDimensions}
                error={error}
              />
              <GameControls
                gameStarted={gameState.gameStarted}
                winner={gameState.winner}
                onStartGame={handleStartGame}
                onRestart={handleStartGame}
                onGoBack={handleGoBackToHome}
              />
            </div>
          ) : (
            <GameControls
              gameStarted={gameState.gameStarted}
              winner={gameState.winner}
              onStartGame={handleStartGame}
              onRestart={handleStartGame}
              onGoBack={handleGoBackToHome}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
