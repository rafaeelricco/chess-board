export type PieceType = "developer" | "designer" | "product-owner";
export type PieceColor = "white" | "black";

export interface Piece {
  type: PieceType;
  color: PieceColor;
  selected?: boolean;
}

export interface Cell {
  piece: Piece | null;
  position: Position;
  isHighlighted?: boolean;
  lastMoveHighlight?: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export type Board = Cell[][];

export interface GameState {
  board: Board;
  currentTurn: PieceColor;
  selectedPiece: Position | null;
  possibleMoves: Position[];
  gameStarted: boolean;
  winner: PieceColor | null;
  lastMove: { from: Position; to: Position } | null;
}
