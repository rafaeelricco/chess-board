import { Piece as PieceType } from "@/features/ChessBoard/types";
import Image from "next/image";
import React from "react";

interface PieceProps {
  piece: PieceType;
  size?: number;
}

const Piece: React.FC<PieceProps> = ({ piece, size = 42 }) => {
  const { type, color, selected } = piece;

  return (
    <div
      className={`relative ${
        selected ? "scale-110 z-10" : ""
      } transition-transform duration-200`}
    >
      <Image
        src={`/images/${type}-${color}.png`}
        alt={`${color} ${type}`}
        width={size}
        height={size}
        className={`user-select-none pointer-events-none transition-opacity duration-300`}
        priority
      />
    </div>
  );
};

export default Piece;
