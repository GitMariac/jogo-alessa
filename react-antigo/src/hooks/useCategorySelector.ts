// src/hooks/useCategorySelector.ts
// Hook para gerenciar a seleção de categorias de palavras

import { useState, useCallback } from "react";
import { wordsDatabase } from "../data/words-database";

export type GameCategory = keyof typeof wordsDatabase;

export interface CategoryInfo {
  name: GameCategory;
  label: string;
  wordCount: number;
  description: string;
}

export const CATEGORY_INFO: Record<GameCategory, Omit<CategoryInfo, "name">> = {
  oxitonas: {
    label: "Oxítonas",
    description: "Palavras com acento na última sílaba",
    wordCount: wordsDatabase.oxitonas.length,
  },
  paroxitonas: {
    label: "Paroxítonas",
    description: "Palavras com acento na penúltima sílaba",
    wordCount: wordsDatabase.paroxitonas.length,
  },
  proparoxitonas: {
    label: "Proparoxítonas",
    description: "Palavras com acento na antepenúltima sílaba",
    wordCount: wordsDatabase.proparoxitonas.length,
  },
  hiatos: {
    label: "Hiatos",
    description: "Palavras com acentuação por regra de hiato",
    wordCount: wordsDatabase.hiatos.length,
  },
  excessoes: {
    label: "Exceções",
    description: "Exceções às regras de acentuação",
    wordCount: wordsDatabase.excessoes.length,
  },
};

export const useCategorySelector = () => {
  const [selectedCategories, setSelectedCategories] = useState<GameCategory[]>(
    [],
  );

  const getAvailableCategories = useCallback(
    (gameType: "ortografia" | "acentuacao"): GameCategory[] => {
      if (gameType === "ortografia") {
        return ["excessoes"];
      } else {
        return ["oxitonas", "paroxitonas", "proparoxitonas", "hiatos"];
      }
    },
    [],
  );

  const toggleCategory = useCallback((category: GameCategory) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  }, []);

  const getRandomCategory = useCallback(
    (gameType: "ortografia" | "acentuacao"): GameCategory => {
      const available = getAvailableCategories(gameType);
      return available[Math.floor(Math.random() * available.length)];
    },
    [getAvailableCategories],
  );

  const resetSelection = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  return {
    selectedCategories,
    toggleCategory,
    getAvailableCategories,
    getRandomCategory,
    resetSelection,
  };
};
