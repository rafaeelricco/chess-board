import React from "react";

const ChessBoard: React.FC = () => {
  const ranks = Array.from({ length: 8 }, (_, i) => 8 - i); // Linhas 8 a 1
  const files = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // Colunas A a H

  const getSquareColor = (rowIndex: number, colIndex: number): string => {
    // Alterna as cores das casas
    return (rowIndex + colIndex) % 2 === 0
      ? "bg-neutral-200"
      : "bg-neutral-600";
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-8 gap-0 w-[400px] h-[400px] border border-neutral-800">
        {ranks.map((rank, rowIndex) =>
          files.map((file, colIndex) => (
            <div
              key={`${file}${rank}`}
              className={`w-full h-full flex items-center justify-center ${getSquareColor(
                rowIndex,
                colIndex
              )}`}
            >
              {/* Você pode adicionar a lógica para as peças aqui posteriormente */}
              {/* Rótulos simplificados para debug inicial, podem ser removidos/ajustados */}
              {/* <span className="text-xs text-neutral-400 select-none">{`${file}${rank}`}</span> */}
            </div>
          ))
        )}
      </div>
      {/* Rótulos das colunas (simplificado) */}
      <div className="grid grid-cols-8 gap-0 w-[400px] mt-1">
        {files.map((file) => (
          <div
            key={`file-${file}`}
            className="text-center text-sm font-semibold text-neutral-700"
          >
            {file}
          </div>
        ))}
      </div>
      {/* Rótulos das linhas (simplificado, posicionado ao lado para exemplo) */}
      {/* Para um layout mais preciso dos rótulos das linhas, seria necessário um wrapper e posicionamento absoluto ou grid mais complexo */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col h-[400px] justify-around ml-2">
        {ranks.map((rank) => (
          <div
            key={`rank-${rank}`}
            className="text-center text-sm font-semibold text-neutral-700 h-[50px] flex items-center"
          >
            {rank}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;
