import { useState, useEffect, useCallback } from "react";
import { generateGameGrid, GridType, Position } from "../utils/game-engine";
import { wordsDatabase } from "../data/words-database";
import { gameStorage } from "../utils/storage";

export function useWordSearch(
  gameType: "ortografia" | "acentuacao",
  size: number = 10,
) {
  const [grid, setGrid] = useState<GridType>([]);
  const [targetWords, setTargetWords] = useState<
    { word: string; positions: Position[] }[]
  >([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<Position[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos
  const [isGameOver, setIsGameOver] = useState(false);

  // Inicializar o jogo
  const initGame = useCallback(() => {
    // Escolhe categorias baseadas no tipo de jogo
    let category: keyof typeof wordsDatabase =
      gameType === "ortografia" ? "excessoes" : "oxitonas";
    const allWords = wordsDatabase[category];

    // Pegar 5 palavras aleatórias da categoria
    const selected = [...allWords]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map((w) => w[0]); // Usar a versão sem acento para a grade

    const { grid: newGrid, placedWords } = generateGameGrid(size, selected);
    setGrid(newGrid);
    setTargetWords(placedWords);
    setFoundWords([]);
    setSelectedCells([]);
    setScore(0);
    setTimeLeft(120);
    setIsGameOver(false);
  }, [gameType, size]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  const toggleCell = (row: number, col: number) => {
    if (isGameOver) return;

    const isAlreadySelected = selectedCells.find(
      (p) => p.row === row && p.col === col,
    );

    if (isAlreadySelected) {
      setSelectedCells(
        selectedCells.filter((p) => !(p.row === row && p.col === col)),
      );
    } else {
      const newSelection = [...selectedCells, { row, col }];
      setSelectedCells(newSelection);

      // Verificar se a nova seleção forma uma palavra
      const selectedWordStr = newSelection
        .map((p) => grid[p.row][p.col])
        .join("");

      const match = targetWords.find(
        (tw) => tw.word === selectedWordStr && !foundWords.includes(tw.word),
      );

      if (match) {
        setFoundWords([...foundWords, match.word]);
        setScore((prev) => prev + 100);
        setSelectedCells([]);

        if (foundWords.length + 1 === targetWords.length) {
          setIsGameOver(true);
          const profile = gameStorage.getUserProfile();
          gameStorage.saveScore(
            profile?.nome || "Aluno",
            "Sandrinha",
            score + 100,
          );
        }
      }
    }
  };

  useEffect(() => {
    if (isGameOver && timeLeft === 0) {
      const profile = gameStorage.getUserProfile();
      gameStorage.saveScore(profile?.nome || "Aluno", "Sandrinha", score);
    }
  }, [isGameOver, timeLeft, score]);

  return {
    grid,
    targetWords,
    foundWords,
    selectedCells,
    score,
    timeLeft,
    isGameOver,
    toggleCell,
    resetGame: initGame,
  };
}
