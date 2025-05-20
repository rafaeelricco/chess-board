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

  board[0][cols - 1].piece = { type: "product-owner", color: "black" };
  board[0][cols - 2].piece = { type: "developer", color: "black" };
  board[0][cols - 3].piece = { type: "designer", color: "black" };

  board[rows - 1][0].piece = { type: "product-owner", color: "white" };
  board[rows - 1][1].piece = { type: "developer", color: "white" };
  board[rows - 1][2].piece = { type: "designer", color: "white" };

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
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ];

      for (const [dx, dy] of directions) {
        for (let steps = 1; steps <= 3; steps++) {
          const newRow = position.row + dx * steps;
          const newCol = position.col + dy * steps;

          if (!isValidPosition({ row: newRow, col: newCol }, rows, cols))
            continue;

          const targetCell = board[newRow][newCol];

          if (
            steps > 1 &&
            board[position.row + dx * (steps - 1)][
              position.col + dy * (steps - 1)
            ].piece
          ) {
            break;
          }

          if (targetCell.piece) {
            if (targetCell.piece.color !== piece.color) {
              possibleMoves.push({ row: newRow, col: newCol });
            }
            break;
          }

          possibleMoves.push({ row: newRow, col: newCol });
        }
      }
      break;

    case "designer":
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

        if (!targetCell.piece || targetCell.piece.color !== piece.color) {
          possibleMoves.push({ row: newRow, col: newCol });
        }
      }
      break;

    case "product-owner":
      const poDirections = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ];

      for (const [dx, dy] of poDirections) {
        const newRow = position.row + dx;
        const newCol = position.col + dy;

        if (!isValidPosition({ row: newRow, col: newCol }, rows, cols))
          continue;

        const targetCell = board[newRow][newCol];

        if (!targetCell.piece || targetCell.piece.color !== piece.color) {
          possibleMoves.push({ row: newRow, col: newCol });
        }
      }
      break;
  }

  return possibleMoves;
};

export const highlightLastMove = (
  board: Board,
  from: Position,
  to: Position
): Board => {
  const newBoard = JSON.parse(JSON.stringify(board)) as Board;

  if (isValidPosition(from, newBoard.length, newBoard[0].length)) {
    newBoard[from.row][from.col].lastMoveHighlight = true;
  }

  if (isValidPosition(to, newBoard.length, newBoard[0].length)) {
    newBoard[to.row][to.col].lastMoveHighlight = true;
  }

  return newBoard;
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

  toCell.piece = fromCell.piece;
  fromCell.piece = null;

  newBoard[from.row][from.col].lastMoveHighlight = true;
  newBoard[to.row][to.col].lastMoveHighlight = true;

  return { newBoard, capturedPiece };
};

export const clearHighlights = (board: Board): Board => {
  const newBoard = JSON.parse(JSON.stringify(board)) as Board;

  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[0].length; col++) {
      newBoard[row][col].lastMoveHighlight = false;
    }
  }

  return newBoard;
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
