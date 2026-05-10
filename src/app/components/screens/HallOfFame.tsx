import { motion } from "framer-motion";
import { GameAvatar } from "../GameAvatar";
import { GameCard } from "../GameCard";
import { ArrowLeft, Medal } from "lucide-react";
import { gameStorage, RankingEntry } from "../../../utils/storage";
import { useEffect, useState } from "react";

interface HallOfFameProps {
  onBack: () => void;
}

export function HallOfFame({ onBack }: HallOfFameProps) {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    setRanking(gameStorage.getRanking());
  }, []);

  const topPlayers = ranking.slice(0, 3);
  const otherPlayers = ranking.slice(3);

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

        {ranking.length === 0 ? (
          <GameCard className="p-12 text-center max-w-2xl mx-auto">
            <p className="text-[#9ca3af] text-xl">Ainda não há pontuações registradas. Seja o primeiro!</p>
          </GameCard>
        ) : (
          <>
            {/* Top 3 Podium */}
            <motion.div
              className="flex items-end justify-center gap-4 md:gap-8 mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Second Place */}
              {topPlayers[1] && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-[#9ca3af] text-sm mb-2">2º Lugar</p>
                  <GameAvatar name={topPlayers[1].nome} size="lg" position={2} />
                  <p className="text-white mt-3 font-semibold">{topPlayers[1].nome}</p>
                  <p className="text-[#C0C0C0] font-bold text-xl">{topPlayers[1].score} pts</p>
                </motion.div>
              )}

              {/* First Place */}
              {topPlayers[0] && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-[#dc2626] text-sm mb-2 font-bold">1º Lugar</p>
                  <GameAvatar name={topPlayers[0].nome} size="xl" position={1} />
                  <p className="text-white mt-3 font-semibold text-lg">{topPlayers[0].nome}</p>
                  <p className="text-[#FFD700] font-bold text-2xl">{topPlayers[0].score} pts</p>
                </motion.div>
              )}

              {/* Third Place */}
              {topPlayers[2] && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-[#9ca3af] text-sm mb-2">3º Lugar</p>
                  <GameAvatar name={topPlayers[2].nome} size="lg" position={3} />
                  <p className="text-white mt-3 font-semibold">{topPlayers[2].nome}</p>
                  <p className="text-[#CD7F32] font-bold text-xl">{topPlayers[2].score} pts</p>
                </motion.div>
              )}
            </motion.div>

            {/* Rest of Rankings */}
            {otherPlayers.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <GameCard className="max-w-3xl mx-auto">
                  <div className="space-y-3">
                    {otherPlayers.map((player, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-[#dc2626] font-bold text-2xl w-8">
                            #{index + 4}
                          </span>
                          <GameAvatar name={player.nome} size="sm" />
                          <span className="text-white font-semibold">{player.nome}</span>
                        </div>
                        <span className="text-[#9ca3af] font-bold">{player.score} pts</span>
                      </motion.div>
                    ))}
                  </div>
                </GameCard>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
