import * as React from "react";

import Cell from "@/components/ui/cell";

interface ChessBoardProps {
  rows: number;
  cols: number;
  boardPixelSize?: number;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  rows,
  cols,
  boardPixelSize = 564,
}) => {
  const rowNumbers = Array.from({ length: rows }, (_, i) => rows - i);
  const columnLetters = Array.from({ length: cols }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const cellWidth = boardPixelSize / cols;
  const cellHeight = boardPixelSize / rows;

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
          columnLetters.map((columnLetter, colIndex) => (
            <Cell
              key={`${columnLetter}${rowNumber}`}
              isDark={(rowIndex + colIndex) % 2 !== 0}
              isActive={false}
              style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
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
            </Cell>
          ))
        )}
      </div>
    </div>
  );
};
