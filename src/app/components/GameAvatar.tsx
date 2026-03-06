import { motion } from "framer-motion";

interface GameAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  position?: number;
}

export function GameAvatar({ name, size = "md", position }: GameAvatarProps) {
  const sizeClasses = {
    sm: "w-16 h-16 text-sm",
    md: "w-24 h-24 text-base",
    lg: "w-32 h-32 text-lg",
    xl: "w-40 h-40 text-xl"
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getPodiumColor = (pos?: number) => {
    if (pos === 1) return "bg-gradient-to-br from-[#FFD700] to-[#FFA500]";
    if (pos === 2) return "bg-gradient-to-br from-[#C0C0C0] to-[#A0A0A0]";
    if (pos === 3) return "bg-gradient-to-br from-[#CD7F32] to-[#A0522D]";
    return "bg-gradient-to-br from-[#dc2626] to-[#b91c1c]";
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${getPodiumColor(position)} rounded-full flex items-center justify-center font-bold text-white border-4 border-[#2a2a2a] shadow-lg`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {getInitials(name)}
    </motion.div>
  );
}
