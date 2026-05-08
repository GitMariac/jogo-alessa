// utils/game-engine.ts

export type GridType = string[][];

export const generateGameGrid = (size: number, words: string[]): GridType => {
  // Por enquanto, retorna uma matriz vazia preenchida com 'A'
  // Depois implementaremos a lógica de espalhar as palavras reais
  return Array(size)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))),
    );
};
