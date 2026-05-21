// utils/game-engine.ts

export type GridType = string[][];

export interface Position {
  row: number;
  col: number;
}

export const generateGameGrid = (
  size: number,
  wordsToPlace: string[],
): {
  grid: GridType;
  placedWords: { word: string; positions: Position[] }[];
} => {
  const grid: GridType = Array(size)
    .fill(null)
    .map(() => Array(size).fill(""));
  const placedWords: { word: string; positions: Position[] }[] = [];

  const directions = [
    { r: 0, c: 1 }, // Horizontal
    { r: 1, c: 0 }, // Vertical
    { r: 1, c: 1 }, // Diagonal
  ];

  const canPlace = (
    word: string,
    row: number,
    col: number,
    dir: { r: number; c: number },
  ) => {
    for (let i = 0; i < word.length; i++) {
      const nr = row + i * dir.r;
      const nc = col + i * dir.c;
      if (
        nr >= size ||
        nc >= size ||
        (grid[nr][nc] !== "" && grid[nr][nc] !== word[i].toUpperCase())
      ) {
        return false;
      }
    }
    return true;
  };

  const place = (
    word: string,
    row: number,
    col: number,
    dir: { r: number; c: number },
  ) => {
    const positions: Position[] = [];
    for (let i = 0; i < word.length; i++) {
      const nr = row + i * dir.r;
      const nc = col + i * dir.c;
      grid[nr][nc] = word[i].toUpperCase();
      positions.push({ row: nr, col: nc });
    }
    return positions;
  };

  // Tenta colocar cada palavra
  wordsToPlace.forEach((word) => {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 50) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (canPlace(word, row, col, dir)) {
        const positions = place(word, row, col, dir);
        placedWords.push({ word: word.toUpperCase(), positions });
        placed = true;
      }
      attempts++;
    }
  });

  // Preenche o resto com letras aleatórias
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return { grid, placedWords };
};
