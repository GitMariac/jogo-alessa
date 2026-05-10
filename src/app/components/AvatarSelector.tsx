import { motion } from "framer-motion";
import { GameAvatar } from "./GameAvatar";

interface AvatarSelectorProps {
  avatars: string[];
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
}

export function AvatarSelector({
  avatars,
  selectedAvatar,
  onSelect,
}: AvatarSelectorProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {avatars.map((avatar) => (
        <motion.button
          key={avatar}
          onClick={() => onSelect(avatar)}
          className={`p-4 rounded-lg transition-all ${
            selectedAvatar === avatar
              ? "bg-[#dc2626] border-2 border-[#dc2626]"
              : "bg-[#1a1a1a] border-2 border-[#2a2a2a] hover:border-[#dc2626]"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center gap-2">
            <GameAvatar name={avatar} size="md" />
            <span className="text-white text-xs font-semibold text-center">
              {avatar}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
