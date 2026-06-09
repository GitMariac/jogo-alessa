import { useCallback, useMemo, useState } from "react";
import type { Grid, PlacedWord, Pos } from "@/lib/grid";
import { cellsEqual, lineBetween } from "@/lib/grid";

export type GridSelectionResult =
  | { word: PlacedWord }
  | { word: null; letters: string };

export function WordGrid({
  grid,
  foundWords,
  revealedWords = [],
  onSelection,
}: {
  grid: Grid;
  foundWords: PlacedWord[];
  revealedWords?: PlacedWord[];
  onSelection: (result: GridSelectionResult) => void;
}) {
  const [start, setStart] = useState<Pos | null>(null);
  const [current, setCurrent] = useState<Pos | null>(null);

  const previewLine = useMemo(() => {
    if (!start || !current) return null;
    return lineBetween(start, current);
  }, [start, current]);

  const foundCorrectSet = useMemo(() => {
    const s = new Set<string>();
    for (const w of foundWords) if (w.word.isCorrect) for (const c of w.cells) s.add(`${c.row}:${c.col}`);
    return s;
  }, [foundWords]);

  const foundWrongSet = useMemo(() => {
    const s = new Set<string>();
    for (const w of foundWords) if (!w.word.isCorrect) for (const c of w.cells) s.add(`${c.row}:${c.col}`);
    return s;
  }, [foundWords]);

  const revealedCellSet = useMemo(() => {
    const s = new Set<string>();
    for (const w of revealedWords) for (const c of w.cells) s.add(`${c.row}:${c.col}`);
    return s;
  }, [revealedWords]);

  const previewSet = useMemo(() => {
    const s = new Set<string>();
    if (previewLine) for (const c of previewLine) s.add(`${c.row}:${c.col}`);
    return s;
  }, [previewLine]);

  const finish = useCallback(() => {
    if (!start || !current || !previewLine) {
      setStart(null);
      setCurrent(null);
      return;
    }
    const reversed = [...previewLine].reverse();
    const match = grid.words.find(
      (w) => cellsEqual(w.cells, previewLine) || cellsEqual(w.cells, reversed),
    );
    if (match) {
      onSelection({ word: match });
    } else {
      const letters = previewLine.map((p) => grid.cells[p.row][p.col]).join("");
      onSelection({ word: null, letters });
    }
    setStart(null);
    setCurrent(null);
  }, [start, current, previewLine, grid, onSelection]);

  return (
    <div
      className="select-none touch-none"
      onPointerUp={finish}
      onPointerLeave={finish}
    >
      <div
        className="grid gap-1 rounded-2xl border border-border/60 bg-card/40 p-2 shadow-2xl sm:p-3"
        style={{ gridTemplateColumns: `repeat(${grid.size}, minmax(0, 1fr))` }}
      >
        {grid.cells.flatMap((row, r) =>
          row.map((letter, c) => {
            const key = `${r}:${c}`;
            const isCorrect = foundCorrectSet.has(key);
            const isWrong = !isCorrect && foundWrongSet.has(key);
            const isRevealed = !isCorrect && !isWrong && revealedCellSet.has(key);
            const isPreview = previewSet.has(key);
            return (
              <button
                type="button"
                key={key}
                onPointerDown={(e) => {
                  e.preventDefault();
                  setStart({ row: r, col: c });
                  setCurrent({ row: r, col: c });
                }}
                onPointerEnter={() => {
                  if (start) setCurrent({ row: r, col: c });
                }}
                className={
                  "flex aspect-square items-center justify-center rounded-md text-xs font-semibold uppercase transition-colors sm:text-base md:text-xl " +
                  (isCorrect
                    ? "bg-green-600 text-white"
                    : isWrong
                      ? "bg-red-600 text-white"
                      : isRevealed
                        ? "bg-green-600/20 text-foreground ring-2 ring-green-600/60"
                        : isPreview
                          ? "bg-primary text-primary-foreground shadow-[var(--glow-primary)]"
                          : "cell-surface text-foreground hover:bg-secondary")
                }
              >
                {letter}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}