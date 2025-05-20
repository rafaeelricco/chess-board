interface GameStatusProps {
  currentTurn: "white" | "black";
  gameStarted: boolean;
  winner: string | null;
}

export function GameStatus({
  currentTurn,
  gameStarted,
  winner,
}: GameStatusProps) {
  if (!gameStarted || winner) return null;

  return (
    <div className="mb-4 p-3 bg-blue-800 bg-opacity-80 text-white rounded-lg shadow-lg">
      Current turn: {currentTurn === "white" ? "White" : "Black"}
    </div>
  );
}
