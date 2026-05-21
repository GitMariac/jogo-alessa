// src/utils/word-selection.ts
// Utilitário para melhorar a seleção de palavras e validação de alinhamento

import { Position } from "./game-engine";

export interface Direction {
  r: number;
  c: number;
  name: string;
}

export const DIRECTIONS: Direction[] = [
  { r: 0, c: 1, name: "horizontal" },
  { r: 1, c: 0, name: "vertical" },
  { r: 1, c: 1, name: "diagonal" },
  { r: -1, c: 1, name: "diagonal-inverso" },
];

/**
 * Verifica se as células selecionadas formam uma linha reta (horizontal, vertical ou diagonal)
 */
export const isValidLineSelection = (cells: Position[]): boolean => {
  if (cells.length < 2) return true; // Uma célula é sempre válida

  const [first, ...rest] = cells;

  // Tenta encontrar uma direção consistente
  for (const direction of DIRECTIONS) {
    let valid = true;

    for (let i = 0; i < rest.length; i++) {
      const expected = {
        row: first.row + (i + 1) * direction.r,
        col: first.col + (i + 1) * direction.c,
      };

      if (rest[i].row !== expected.row || rest[i].col !== expected.col) {
        valid = false;
        break;
      }
    }

    if (valid) return true;
  }

  return false;
};

/**
 * Calcula a distância entre duas células
 */
export const cellDistance = (a: Position, b: Position): number => {
  return Math.max(Math.abs(a.row - b.row), Math.abs(a.col - b.col));
};

/**
 * Verifica se duas células são adjacentes (incluindo diagonais)
 */
export const areAdjacent = (a: Position, b: Position): boolean => {
  return cellDistance(a, b) === 1;
};

/**
 * Valida se a seleção de células é contígua (cada célula é adjacente à anterior)
 */
export const isContiguousSelection = (cells: Position[]): boolean => {
  if (cells.length < 2) return true;

  for (let i = 1; i < cells.length; i++) {
    if (!areAdjacent(cells[i - 1], cells[i])) {
      return false;
    }
  }

  return true;
};

/**
 * Valida uma seleção de células para caça-palavras
 * Pode ser configurado para exigir alinhamento ou continuidade
 */
export const validateSelection = (
  cells: Position[],
  options: {
    requireAlignment?: boolean;
    requireContiguous?: boolean;
  } = {},
): boolean => {
  const { requireAlignment = false, requireContiguous = false } = options;

  if (cells.length === 0) return false;

  if (requireAlignment && !isValidLineSelection(cells)) {
    return false;
  }

  if (requireContiguous && !isContiguousSelection(cells)) {
    return false;
  }

  return true;
};
