import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GameCardProps {
  children: ReactNode;
  className?: string;
}

export function GameCard({ children, className = "" }: GameCardProps) {
  return (
    <motion.div
      className={`bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-lg p-6 ${className}`}
      whileHover={{ borderColor: "#dc2626" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
