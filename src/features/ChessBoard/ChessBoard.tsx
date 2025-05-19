import * as React from "react";

import Cell from "@/components/ui/cell";
import Piece from "@/components/ui/piece";
import { Board, Position } from "./types";

interface ChessBoardProps {
  rows: number;
  cols: number;
  boardPixelSize?: number;
  board: Board;
  gameStarted: boolean;
  currentTurn: "white" | "black";
  onMove: (from: Position, to: Position) => void;
  selectedPiece: Position | null;
  onSelectPiece: (position: Position | null) => void;
  possibleMoves: Position[];
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  rows,
  cols,
  boardPixelSize = 564,
  board,
  gameStarted,
  currentTurn,
  onMove,
  selectedPiece,
  onSelectPiece,
  possibleMoves,
}) => {
  const rowNumbers = Array.from({ length: rows }, (_, i) => rows - i);
  const columnLetters = Array.from({ length: cols }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const cellWidth = boardPixelSize / cols;
  const cellHeight = boardPixelSize / rows;

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!gameStarted) return;

    const position = { row: rowIndex, col: colIndex };
    const cell = board[rowIndex][colIndex];

    // Se já tem uma peça selecionada
    if (selectedPiece) {
      // Verificar se o clique foi em uma das possíveis jogadas
      const isValidMove = possibleMoves.some(
        (move) => move.row === rowIndex && move.col === colIndex
      );

      if (isValidMove) {
        onMove(selectedPiece, position);
        onSelectPiece(null);
      } else if (cell.piece && cell.piece.color === currentTurn) {
        // Se clicou em outra peça da mesma cor, seleciona ela
        onSelectPiece(position);
      } else {
        // Se clicou em um lugar inválido, deseleciona
        onSelectPiece(null);
      }
    } else if (cell.piece && cell.piece.color === currentTurn) {
      // Selecionar uma peça
      onSelectPiece(position);
    }
  };

  const isPossibleMove = (row: number, col: number) => {
    return possibleMoves.some((move) => move.row === row && move.col === col);
  };

  return (
    <div className="border border-[#565556] p-2 rounded-lg">
      <div
        className="grid gap-0 rounded-sm overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          width: `${boardPixelSize}px`,
          height: `${boardPixelSize}px`,
        }}
      >
        {rowNumbers.map((rowNumber, rowIndex) =>
          columnLetters.map((columnLetter, colIndex) => {
            const cellPosition = { row: rowIndex, col: colIndex };
            const cell = board[rowIndex][colIndex];
            const isSelected =
              selectedPiece?.row === rowIndex &&
              selectedPiece?.col === colIndex;
            const isHighlighted = isPossibleMove(rowIndex, colIndex);
            const isLastMove = cell.lastMoveHighlight;

            return (
              <Cell
                key={`${columnLetter}${rowNumber}`}
                isDark={(rowIndex + colIndex) % 2 !== 0}
                isActive={isSelected || isHighlighted}
                isLastMove={isLastMove}
                style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {colIndex === 0 && (
                  <span className="absolute top-2 left-2 pt-0.5 pl-1 text-xs text-neutral-500 dark:text-neutral-400 select-none">
                    {rowNumber}
                  </span>
                )}
                {rowIndex === rows - 1 && (
                  <span className="absolute bottom-0 right-0 pb-0.5 pr-1 text-xs text-neutral-500 dark:text-neutral-400 select-none">
                    {columnLetter}
                  </span>
                )}
                {cell.piece && (
                  <Piece
                    piece={{ ...cell.piece, selected: isSelected }}
                    size={Math.min(cellWidth, cellHeight) * 0.8}
                  />
                )}
              </Cell>
            );
          })
        )}
      </div>
    </div>
  );
};
