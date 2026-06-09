import type { WordItem } from "./words";

export type Pos = { row: number; col: number };

export type PlacedWord = {
  word: WordItem;
  cells: Pos[];
};

export type Grid = {
  size: number;
  cells: string[][];
  words: PlacedWord[];
};

const DIRS: Pos[] = [
  { row: 0, col: 1 },   // →
  { row: 1, col: 0 },   // ↓
  { row: 1, col: 1 },   // ↘
  { row: -1, col: 1 },  // ↗
];

const FILL_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÂÊÔÃÕÀÇ";

function randInt(n: number) {
  return Math.floor(Math.random() * n);
}

function tryPlace(cells: string[][], letters: string[], size: number): Pos[] | null {
  const len = letters.length;
  for (let attempt = 0; attempt < 200; attempt++) {
    const dir = DIRS[randInt(DIRS.length)];
    const row = randInt(size);
    const col = randInt(size);
    const endRow = row + dir.row * (len - 1);
    const endCol = col + dir.col * (len - 1);
    if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue;
    let ok = true;
    const positions: Pos[] = [];
    for (let i = 0; i < len; i++) {
      const r = row + dir.row * i;
      const c = col + dir.col * i;
      const existing = cells[r][c];
      if (existing && existing !== letters[i]) { ok = false; break; }
      positions.push({ row: r, col: c });
    }
    if (!ok) continue;
    for (let i = 0; i < len; i++) {
      cells[positions[i].row][positions[i].col] = letters[i];
    }
    return positions;
  }
  return null;
}

export function buildGrid(words: WordItem[], size = 16): Grid {
  const cells: string[][] = Array.from({ length: size }, () => Array(size).fill(""));
  const placed: PlacedWord[] = [];
  // Sort by length desc to improve placement
  const sorted = [...words].sort((a, b) => b.letters.length - a.letters.length);
  for (const w of sorted) {
    if (w.letters.length > size) continue;
    const positions = tryPlace(cells, w.letters, size);
    if (positions) placed.push({ word: w, cells: positions });
  }
  // Fill empty
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!cells[r][c]) {
        cells[r][c] = FILL_ALPHABET[randInt(FILL_ALPHABET.length)];
      }
    }
  }
  return { size, cells, words: placed };
}

export function cellsEqual(a: Pos[], b: Pos[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].row !== b[i].row || a[i].col !== b[i].col) return false;
  }
  return true;
}

/** Return positions along a straight line (H, V, or 45° diagonal). null if not aligned. */
export function lineBetween(start: Pos, end: Pos): Pos[] | null {
  const dr = end.row - start.row;
  const dc = end.col - start.col;
  if (dr === 0 && dc === 0) return [start];
  const absR = Math.abs(dr);
  const absC = Math.abs(dc);
  const aligned = dr === 0 || dc === 0 || absR === absC;
  if (!aligned) return null;
  const steps = Math.max(absR, absC);
  const sr = Math.sign(dr);
  const sc = Math.sign(dc);
  const cells: Pos[] = [];
  for (let i = 0; i <= steps; i++) {
    cells.push({ row: start.row + sr * i, col: start.col + sc * i });
  }
  return cells;
}