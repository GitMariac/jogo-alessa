import { motion } from "framer-motion";
import { GameButton } from "../GameButton";
import { GameAvatar } from "../GameAvatar";
import { Trophy, Settings, BookOpen, Type } from "lucide-react";

interface MainMenuProps {
  onNavigate: (screen: string) => void;
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <GameAvatar name="Sandrinha" size="xl" />
        <p className="text-white mt-4 text-xl">Avatar da Sandrinha</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, staggerChildren: 0.1 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GameButton
            variant="primary"
            className="w-full h-24 flex items-center justify-center gap-3"
            onClick={() => onNavigate("ortografia")}
          >
            <BookOpen className="w-6 h-6" />
            Ortografia
          </GameButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GameButton
            variant="primary"
            className="w-full h-24 flex items-center justify-center gap-3"
            onClick={() => onNavigate("acentuacao")}
          >
            <Type className="w-6 h-6" />
            Acentuação
          </GameButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GameButton
            variant="secondary"
            className="w-full h-24 flex items-center justify-center gap-3"
            onClick={() => onNavigate("hall")}
          >
            <Trophy className="w-6 h-6" />
            Hall da Fama
          </GameButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GameButton
            variant="secondary"
            className="w-full h-24 flex items-center justify-center gap-3"
            onClick={() => onNavigate("configuracoes")}
          >
            <Settings className="w-6 h-6" />
            Configurações
          </GameButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-12 text-center"
      >
        <p className="text-[#9ca3af] text-sm">Créditos e contact us</p>
      </motion.div>
    </div>
  );
}
