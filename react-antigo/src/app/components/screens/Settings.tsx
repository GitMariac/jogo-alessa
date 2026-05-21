import { motion } from "framer-motion";
import { GameCard } from "../GameCard";
import { ArrowLeft, Volume2, Music, Zap, User } from "lucide-react";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { gameStorage, GameSettings } from "../../../utils/storage";
import { AvatarSelector } from "../AvatarSelector";

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const [settings, setSettings] = useState<GameSettings>(gameStorage.getSettings());
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    gameStorage.getUserProfile()?.avatar || "Sandrinha"
  );
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const avatarOptions = ["Sandrinha", "Alessa", "Marina", "Sofia", "Luna", "Iris"];

  const updateSetting = <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    gameStorage.saveSettings(newSettings);
  };

  const handleAvatarChange = (avatar: string) => {
    setSelectedAvatar(avatar);
    const profile = gameStorage.getUserProfile();
    if (profile) {
      gameStorage.saveUserProfile(profile.nome, avatar);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-white text-3xl font-bold">Configurações</h1>
        </div>

        {/* Settings Cards */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Audio do jogo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GameCard>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Volume2 className="w-6 h-6 text-[#dc2626]" />
                  <div>
                    <h3 className="text-white font-semibold text-lg">Áudio do jogo</h3>
                    <p className="text-[#9ca3af] text-sm">Ativar/desativar sons do jogo</p>
                  </div>
                </div>
                <Switch checked={settings.audioGame} onCheckedChange={(val) => updateSetting("audioGame", val)} />
              </div>
              
              {settings.audioGame && (
                <motion.div
                  className="mt-6 pl-10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <p className="text-[#9ca3af] text-sm mb-3">Volume</p>
                  <Slider
                    value={[settings.volume]}
                    onValueChange={(val) => updateSetting("volume", val[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-white text-sm mt-2 text-right">{settings.volume}%</p>
                </motion.div>
              )}
            </GameCard>
          </motion.div>

          {/* Música */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GameCard>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Music className="w-6 h-6 text-[#dc2626]" />
                  <div>
                    <h3 className="text-white font-semibold text-lg">Música</h3>
                    <p className="text-[#9ca3af] text-sm">Música de fundo</p>
                  </div>
                </div>
                <Switch checked={settings.music} onCheckedChange={(val) => updateSetting("music", val)} />
              </div>
            </GameCard>
          </motion.div>

          {/* Animação */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GameCard>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Zap className="w-6 h-6 text-[#dc2626]" />
                  <div>
                    <h3 className="text-white font-semibold text-lg">Animação</h3>
                    <p className="text-[#9ca3af] text-sm">Efeitos visuais e transições</p>
                  </div>
                </div>
                <Switch checked={settings.animation} onCheckedChange={(val) => updateSetting("animation", val)} />
              </div>
            </GameCard>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GameCard>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <User className="w-6 h-6 text-[#dc2626]" />
                  <div>
                    <h3 className="text-white font-semibold text-lg">Avatar</h3>
                    <p className="text-[#9ca3af] text-sm">Personalizar avatar do jogador</p>
                  </div>
                </div>
                <motion.button
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                >
                  {showAvatarSelector ? "Fechar" : "Editar"}
                </motion.button>
              </div>
              
              {showAvatarSelector && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-[#2a2a2a]"
                >
                  <p className="text-[#9ca3af] text-sm mb-4">Escolha seu avatar:</p>
                  <AvatarSelector
                    avatars={avatarOptions}
                    selectedAvatar={selectedAvatar}
                    onSelect={handleAvatarChange}
                  />
                </motion.div>
              )}
            </GameCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
