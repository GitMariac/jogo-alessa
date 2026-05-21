import { motion } from "framer-motion";
import { useState } from "react";
import Board from "../Board";
import { GameCard } from "../GameCard";
import { GameButton } from "../GameButton";
import { ArrowLeft, Clock, Trophy, RefreshCw } from "lucide-react";
import {useWordSearch} from "../../../hooks/useWordSearch";


interface GamePlayProps {
  gameType: "ortografia" | "acentuacao";
  onBack: () => void;
}

export function GamePlay({ gameType, onBack }: GamePlayProps) {
  const {
    grid,
    targetWords,
    foundWords,
    selectedCells,
    score,
    timeLeft,
    isGameOver,
    toggleCell,
    resetGame
  } = useWordSearch(gameType);

  const gameTitle = gameType === "ortografia" ? "Ortografia" : "Acentuação";

  // Formatar tempo
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Pegar todas as posições de palavras já encontradas para destacar no Board
  const foundPositions = targetWords
    .filter(tw => foundWords.includes(tw.word))
    .flatMap(tw => tw.positions);

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.button
              className="text-white hover:text-[#dc2626] transition-colors"
              onClick={onBack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-8 h-8" />
            </motion.button>
            <h1 className="text-white text-xl md:text-2xl font-bold">Alessa: {gameTitle}</h1>
          </div>

          <div className="flex gap-4">
            <motion.div
              className="bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-lg px-4 py-2 flex items-center gap-2"
              animate={timeLeft < 30 ? { scale: [1, 1.1, 1], color: ['#fff', '#f00', '#fff'] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Clock className={`w-5 h-5 ${timeLeft < 30 ? 'text-red-500' : 'text-[#dc2626]'}`} />
              <span className="text-white font-bold font-mono text-xl">{timeStr}</span>
            </motion.div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Word List */}
          <div className="lg:col-span-1 space-y-4">
            <GameCard className="p-6">
              <h3 className="text-[#9ca3af] text-sm font-bold uppercase tracking-wider mb-4">Palavras para encontrar:</h3>
              <div className="space-y-2">
                {targetWords.map((tw, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded ${
                      foundWords.includes(tw.word) ? 'bg-green-900/30 text-green-400' : 'text-white'
                    }`}
                  >
                    <span className={`font-bold ${foundWords.includes(tw.word) ? 'line-through opacity-50' : ''}`}>
                      {tw.word}
                    </span>
                    {foundWords.includes(tw.word) && <Trophy className="w-4 h-4" />}
                  </div>
                ))}
              </div>
            </GameCard>

            <GameCard className="p-6">
              <div className="text-center">
                <p className="text-[#9ca3af] text-sm mb-1">Pontuação Atual</p>
                <p className="text-white text-4xl font-bold">{score}</p>
              </div>
            </GameCard>

            <GameButton 
              variant="secondary" 
              className="w-full flex items-center justify-center gap-2"
              onClick={resetGame}
            >
              <RefreshCw className="w-5 h-5" />
              Reiniciar
            </GameButton>
          </div>

          {/* Center: The Board */}
          <div className="lg:col-span-2 flex flex-col items-center">
            {grid.length > 0 && (
              <Board 
                grid={grid} 
                selectedCells={selectedCells} 
                onCellClick={toggleCell}
                foundWordsPositions={foundPositions}
              />
            )}
            
            {isGameOver && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-[#dc2626] rounded-xl text-center w-full"
              >
                <h2 className="text-white text-3xl font-bold mb-2">Fim de Jogo!</h2>
                <p className="text-white/80 mb-4">
                  {foundWords.length === targetWords.length 
                    ? "Parabéns! Você encontrou todas as palavras!" 
                    : `O tempo acabou! Você encontrou ${foundWords.length} palavras.`}
                </p>
                <GameButton variant="primary" className="bg-white text-[#dc2626] hover:bg-gray-100" onClick={resetGame}>
                  Jogar Novamente
                </GameButton>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}