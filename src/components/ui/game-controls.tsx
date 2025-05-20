import { Button } from "@/components/ui/button";

interface GameControlsProps {
  gameStarted: boolean;
  winner: string | null;
  onStartGame: () => void;
  onRestart: () => void;
  onGoBack: () => void;
}

export function GameControls({
  gameStarted,
  winner,
  onStartGame,
  onRestart,
  onGoBack,
}: GameControlsProps) {
  if (!gameStarted && !winner) {
    return (
      <Button variant="outline" onClick={onStartGame}>
        Play
      </Button>
    );
  }

  if (winner) {
    return null;
  }

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        onClick={() => {
          if (confirm("Tem certeza que deseja reiniciar o jogo?")) {
            onRestart();
          }
        }}
      >
        Reiniciar
      </Button>
      <Button variant="outline" onClick={onGoBack}>
        Voltar
      </Button>
    </div>
  );
}
