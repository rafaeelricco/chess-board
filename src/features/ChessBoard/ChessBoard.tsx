import React from "react";
import Cell from "../../components/ui/cell"; // Importado o componente Cell

interface ChessBoardProps {
  rows: number;
  cols: number;
  boardPixelSize?: number; // Tamanho opcional do tabuleiro em pixels
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  rows,
  cols,
  boardPixelSize = 400,
}) => {
  const ranks = Array.from({ length: rows }, (_, i) => rows - i); // Linhas (Y)
  const files = Array.from({ length: cols }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // Colunas (X)

  const cellWidth = boardPixelSize / cols;
  const cellHeight = boardPixelSize / rows;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Rótulos das colunas (X) */}
      <div className="flex" style={{ width: `${boardPixelSize}px` }}>
        {files.map((file) => (
          <div
            key={`file-label-${file}`}
            style={{ width: `${cellWidth}px` }}
            className="text-center text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1"
          >
            {file}
          </div>
        ))}
      </div>

      <div className="flex items-start">
        {/* Rótulos das linhas (Y) - à esquerda */}
        <div
          className="flex flex-col mr-1"
          style={{ height: `${boardPixelSize}px` }}
        >
          {ranks.map((rank) => (
            <div
              key={`rank-label-${rank}`}
              style={{ height: `${cellHeight}px` }}
              className="text-center text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center justify-center w-6"
            >
              {rank}
            </div>
          ))}
        </div>

        {/* Tabuleiro */}
        <div
          className="grid gap-0 border border-neutral-800 dark:border-neutral-200"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            width: `${boardPixelSize}px`,
            height: `${boardPixelSize}px`,
          }}
        >
          {ranks.map((rank, rowIndex) =>
            files.map((file, colIndex) => (
              <Cell
                key={`${file}${rank}`}
                isDark={(rowIndex + colIndex) % 2 !== 0} // Se a soma é ímpar, a célula é escura
                isActive={false} // Estado ativo será implementado depois
                style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
              >
                {/* Futuramente: <span className="text-xs text-neutral-400 select-none">{`${file}${rank}`}</span> */}
              </Cell>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
