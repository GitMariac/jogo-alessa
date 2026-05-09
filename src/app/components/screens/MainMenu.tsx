import { motion } from "framer-motion";
import { GameButton } from "../GameButton";
import { GameAvatar } from "../GameAvatar";
import { Trophy, Settings, BookOpen, Type, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { gameStorage } from "../../../utils/storage";
interface MainMenuProps {
  onNavigate: (screen: string) => void;
}

export function MainMenu({ onNavigate }: MainMenuProps) {

    const [userName, setUserName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const profile = gameStorage.getUserProfile();
    if (profile) {
      setUserName(profile.nome);
    } else {
      setIsEditing(true);
    }
  }, []);

  const handleSaveName = () => {
    if (userName.trim()) {
      gameStorage.saveUserProfile(userName.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <GameAvatar name={userName || "A"} size="xl" />
        <div className="mt-6 flex flex-col items-center gap-4">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Digite seu nome..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-[#1a1a1a] border-2 border-[#dc2626] rounded-lg px-4 py-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50"
                autoFocus
              />
              <button 
                onClick={handleSaveName}
                className="text-[#dc2626] text-sm font-bold hover:underline"
              >
                Confirmar Nome
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-white text-2xl font-bold">Olá, {userName}!</p>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-[#9ca3af] hover:text-white transition-colors"
              >
                <UserCircle className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl transition-opacity duration-300 ${isEditing && !userName ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
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
