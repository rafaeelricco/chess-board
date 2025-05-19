"use client";

import ChessBoard from "@/features/ChessBoard/ChessBoard";
import * as React from "react";

export default function Home() {
  const [rows, setRows] = React.useState(8);
  const [cols, setCols] = React.useState(8);
  const [inputRows, setInputRows] = React.useState("8");
  const [inputCols, setInputCols] = React.useState("8");
  const [error, setError] = React.useState<string | null>(null);

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
  };

  return (
    <React.Fragment>
      <div className="container mx-auto p-4 flex flex-col items-center">
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

        <ChessBoard rows={rows} cols={cols} />
      </div>
    </React.Fragment>
  );
}
