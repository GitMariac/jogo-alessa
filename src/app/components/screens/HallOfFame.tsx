import { motion } from "framer-motion";
import { GameAvatar } from "../GameAvatar";
import { GameCard } from "../GameCard";
import { GameButton } from "../GameButton";
import { ArrowLeft, Medal } from "lucide-react";

interface HallOfFameProps {
  onBack: () => void;
}

interface Player {
  name: string;
  score: number;
  position: number;
}

export function HallOfFame({ onBack }: HallOfFameProps) {
  const topPlayers: Player[] = [
    { name: "João Silva", score: 2500, position: 1 },
    { name: "Maria Santos", score: 2300, position: 2 },
    { name: "Pedro Costa", score: 2100, position: 3 }
  ];

  const otherPlayers: Player[] = [
    { name: "Ana Oliveira", score: 1900, position: 4 },
    { name: "Carlos Lima", score: 1850, position: 5 },
    { name: "Lucia Ferreira", score: 1800, position: 6 },
    { name: "Roberto Alves", score: 1750, position: 7 },
    { name: "Julia Mendes", score: 1700, position: 8 },
    { name: "Fernando Dias", score: 1650, position: 9 },
    { name: "Camila Rocha", score: 1600, position: 10 }
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <motion.button
            className="text-white hover:text-[#dc2626] transition-colors"
            onClick={onBack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-8 h-8" />
          </motion.button>
          <h1 className="text-white text-3xl font-bold flex items-center gap-3">
            <Medal className="w-10 h-10 text-[#dc2626]" />
            Hall da Fama
          </h1>
        </div>

        {/* Top 3 Podium */}
        <motion.div
          className="flex items-end justify-center gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Second Place */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-[#9ca3af] text-sm mb-2">Segundo lugar</p>
            <GameAvatar name={topPlayers[1].name} size="lg" position={2} />
            <p className="text-white mt-3 font-semibold">{topPlayers[1].name}</p>
            <p className="text-[#C0C0C0] font-bold text-xl">{topPlayers[1].score} pts</p>
          </motion.div>

          {/* First Place */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-[#dc2626] text-sm mb-2 font-bold">Primeiro lugar</p>
            <GameAvatar name={topPlayers[0].name} size="xl" position={1} />
            <p className="text-white mt-3 font-semibold text-lg">{topPlayers[0].name}</p>
            <p className="text-[#FFD700] font-bold text-2xl">{topPlayers[0].score} pts</p>
          </motion.div>

          {/* Third Place */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[#9ca3af] text-sm mb-2">Terceiro Lugar</p>
            <GameAvatar name={topPlayers[2].name} size="lg" position={3} />
            <p className="text-white mt-3 font-semibold">{topPlayers[2].name}</p>
            <p className="text-[#CD7F32] font-bold text-xl">{topPlayers[2].score} pts</p>
          </motion.div>
        </motion.div>

        {/* Rest of Rankings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-white text-xl font-bold mb-4">
            Lista com demais lugares até o décimo.
          </h2>
          <GameCard className="max-w-3xl mx-auto">
            <div className="space-y-3">
              {otherPlayers.map((player, index) => (
                <motion.div
                  key={player.position}
                  className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[#dc2626] font-bold text-2xl w-8">
                      #{player.position}
                    </span>
                    <GameAvatar name={player.name} size="sm" />
                    <span className="text-white font-semibold">{player.name}</span>
                  </div>
                  <span className="text-[#9ca3af] font-bold">{player.score} pts</span>
                </motion.div>
              ))}
            </div>
          </GameCard>
        </motion.div>
      </div>
    </div>
  );
}
