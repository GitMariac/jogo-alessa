import { motion } from "framer-motion";
import { useState } from "react";
import { GameCard } from "../GameCard";
import { GameButton } from "../GameButton";
import { ArrowLeft, Clock, Trophy } from "lucide-react";

interface GamePlayProps {
  gameType: "ortografia" | "acentuacao";
  onBack: () => void;
}

export function GamePlay({ gameType, onBack }: GamePlayProps) {
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState(15);

  const gameTitle = gameType === "ortografia" ? "Ortografia" : "Acentuação";

  return (
    <div className="min-h-screen bg-black p-8">
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
            <h1 className="text-white text-2xl font-bold">Título do Jogo ({gameTitle})</h1>
          </div>

          <motion.div
            className="bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-lg px-6 py-3 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Clock className="w-5 h-5 text-[#dc2626]" />
            <span className="text-white font-bold">00:00</span>
          </motion.div>
        </div>

        {/* Main Game Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <GameCard className="min-h-[400px] flex items-center justify-center relative">
            <div className="text-center">
              <p className="text-[#9ca3af] text-xl mb-8">Caça palavras</p>
              <div className="text-white text-6xl font-bold">🎮</div>
              <p className="text-[#9ca3af] mt-4">Área do jogo</p>
            </div>

            {/* Score indicator in corner */}
            <motion.div
              className="absolute bottom-6 right-6 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-full w-32 h-32 flex items-center justify-center border-4 border-[#2a2a2a] shadow-lg"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <div className="text-center">
                <Trophy className="w-8 h-8 text-white mx-auto mb-1" />
                <p className="text-white text-2xl font-bold">{score}</p>
              </div>
            </motion.div>
          </GameCard>
        </motion.div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GameCard>
            <div className="text-center">
              <p className="text-[#9ca3af] text-sm mb-2">Pontuação</p>
              <p className="text-white text-4xl font-bold">{score}</p>
            </div>
          </GameCard>

          <GameCard>
            <div className="text-center">
              <p className="text-[#9ca3af] text-sm mb-2">Posição no Ranking</p>
              <p className="text-[#dc2626] text-4xl font-bold">#{ranking}</p>
            </div>
          </GameCard>
        </div>
      </div>
    </div>
  );
}
