import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

interface BoardDimensionsControlProps {
  inputRows: string;
  inputCols: string;
  onRowsChange: (value: string) => void;
  onColsChange: (value: string) => void;
  onApplyDimensions: () => void;
  error?: string | null;
}

export function BoardDimensionsControl({
  inputRows,
  inputCols,
  onRowsChange,
  onColsChange,
  onApplyDimensions,
  error,
}: BoardDimensionsControlProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-transparent backdrop-blur-sm border border-[#5A5A5E] rounded-lg shadow-xl flex flex-col sm:flex-row items-center min-h-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#5A5A5E] px-2">
              Scale
            </span>
            <label
              htmlFor="rowsInput"
              className="text-sm font-semibold text-white"
            >
              Y
            </label>
            <input
              id="rowsInput"
              type="number"
              value={inputRows}
              onChange={(e) => onRowsChange(e.target.value)}
              className="w-16 p-2 py-0.5 border border-neutral-600 rounded-md bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="6"
              max="12"
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="colsInput"
              className="text-sm font-semibold text-white"
            >
              X
            </label>
            <input
              id="colsInput"
              type="number"
              value={inputCols}
              onChange={(e) => onColsChange(e.target.value)}
              className="w-16 p-2 py-0.5 border border-neutral-600 rounded-md bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="6"
              max="12"
            />
          </div>
        </div>
        <div className="h-10 pl-2">
          <Separator orientation="vertical" className="h-full bg-[#5A5A5E]" />
        </div>
        <button onClick={onApplyDimensions} className="bg-transparent px-4">
          <Check className="w-4 h-4 text-[#c9c9c9]" />
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-sm mb-4 bg-red-900 bg-opacity-50 p-2 rounded">
          {error}
        </p>
      )}
    </div>
  );
}
