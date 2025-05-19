import { Board, Piece, PieceColor, Position } from "./types";

export const createEmptyBoard = (rows: number, cols: number): Board => {
  const board: Board = [];

  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let col = 0; col < cols; col++) {
      board[row][col] = {
        piece: null,
        position: { row, col },
      };
    }
  }

  return board;
};

export const initializeGame = (rows: number, cols: number): Board => {
  const board = createEmptyBoard(rows, cols);

  // Posicionar peças pretas no canto superior direito
  board[0][cols - 1].piece = { type: "product-owner", color: "black" }; // Product Owner preto
  board[0][cols - 2].piece = { type: "developer", color: "black" }; // Developer preto
  board[0][cols - 3].piece = { type: "designer", color: "black" }; // Designer preto

  // Posicionar peças brancas no canto inferior esquerdo
  board[rows - 1][0].piece = { type: "product-owner", color: "white" }; // Product Owner branco
  board[rows - 1][1].piece = { type: "developer", color: "white" }; // Developer branco
  board[rows - 1][2].piece = { type: "designer", color: "white" }; // Designer branco

  return board;
};

export const isValidPosition = (
  pos: Position,
  rows: number,
  cols: number
): boolean => {
  return pos.row >= 0 && pos.row < rows && pos.col >= 0 && pos.col < cols;
};

export const getPossibleMoves = (
  board: Board,
  position: Position,
  rows: number,
  cols: number
): Position[] => {
  const cell = board[position.row][position.col];
  if (!cell.piece) return [];

  const piece = cell.piece;
  const possibleMoves: Position[] = [];

  switch (piece.type) {
    case "developer":
      // Developer pode pular até 3 casas em qualquer direção
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1], // Vertical e Horizontal
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1], // Diagonal
      ];

      for (const [dx, dy] of directions) {
        for (let steps = 1; steps <= 3; steps++) {
          const newRow = position.row + dx * steps;
          const newCol = position.col + dy * steps;

          if (!isValidPosition({ row: newRow, col: newCol }, rows, cols))
            continue;

          const targetCell = board[newRow][newCol];

          // Se encontrou uma peça no caminho
          if (
            steps > 1 &&
            board[position.row + dx * (steps - 1)][
              position.col + dy * (steps - 1)
            ].piece
          ) {
            break;
          }

          // Não pode pular para casas ocupadas
          if (targetCell.piece) break;

          possibleMoves.push({ row: newRow, col: newCol });
        }
      }
      break;

    case "designer":
      // Designer move-se em formato de "L" (como o cavalo)
      const designerMoves = [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1],
      ];

      for (const [dx, dy] of designerMoves) {
        const newRow = position.row + dx;
        const newCol = position.col + dy;

        if (!isValidPosition({ row: newRow, col: newCol }, rows, cols))
          continue;

        const targetCell = board[newRow][newCol];

        // Pode se mover para casas vazias ou capturar peças adversárias
        if (!targetCell.piece || targetCell.piece.color !== piece.color) {
          possibleMoves.push({ row: newRow, col: newCol });
        }
      }
      break;

    case "product-owner":
      // Product Owner move-se uma casa em qualquer direção
      const poDirections = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1], // Vertical e Horizontal
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1], // Diagonal
      ];

      for (const [dx, dy] of poDirections) {
        const newRow = position.row + dx;
        const newCol = position.col + dy;

        if (!isValidPosition({ row: newRow, col: newCol }, rows, cols))
          continue;

        const targetCell = board[newRow][newCol];

        // Pode se mover para casas vazias ou capturar peças adversárias
        if (!targetCell.piece || targetCell.piece.color !== piece.color) {
          possibleMoves.push({ row: newRow, col: newCol });
        }
      }
      break;
  }

  return possibleMoves;
};

export const movePiece = (
  board: Board,
  from: Position,
  to: Position
): { newBoard: Board; capturedPiece: Piece | null } => {
  const newBoard = JSON.parse(JSON.stringify(board)) as Board;
  const fromCell = newBoard[from.row][from.col];
  const toCell = newBoard[to.row][to.col];

  const capturedPiece = toCell.piece;

  // Mover a peça
  toCell.piece = fromCell.piece;
  fromCell.piece = null;

  return { newBoard, capturedPiece };
};

export const checkWinner = (board: Board): PieceColor | null => {
  let hasWhitePO = false;
  let hasBlackPO = false;

  for (const row of board) {
    for (const cell of row) {
      if (cell.piece?.type === "product-owner") {
        if (cell.piece.color === "white") hasWhitePO = true;
        if (cell.piece.color === "black") hasBlackPO = true;
      }
    }
  }

  if (!hasWhitePO) return "black";
  if (!hasBlackPO) return "white";
  return null;
};
