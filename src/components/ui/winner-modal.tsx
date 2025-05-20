import Image from "next/image";

interface WinnerModalProps {
  winner: string;
  onGoBackToHome: () => void;
  onStartNewMatch: () => void;
}

export function WinnerModal({
  winner,
  onGoBackToHome,
  onStartNewMatch,
}: WinnerModalProps) {
  return (
    <div className="bg-[#1e1f2563] backdrop-blur-sm border border-[#5a5a5e77] rounded-lg shadow-xl flex flex-col items-center min-h-10 max-w-md min-w-[534px] py-8 gap-8">
      <Image src="/images/icon.png" alt="Victory Star" width={54} height={54} />
      <h2 className="text-white text-2xl font-bold uppercase tracking-wider my-8">
        {winner === "white" ? "WHITE" : "BLACK"} PIECES WON!
      </h2>
      <div className="w-full h-px bg-gray-700 my-8"></div>
      <div className="flex flex-col justify-center items-center md:flex-row gap-4 w-full px-8">
        <button
          onClick={onGoBackToHome}
          className="flex-1 py-2 px-4 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Go Back To Home
        </button>
        <button
          onClick={onStartNewMatch}
          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start New Match
        </button>
      </div>
    </div>
  );
}
