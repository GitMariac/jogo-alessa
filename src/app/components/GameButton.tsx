import { motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function GameButton({ 
  variant = "primary", 
  children, 
  className = "",
  ...props 
}: GameButtonProps) {
  const baseClasses = "px-8 py-4 rounded-lg font-semibold transition-all duration-200";
  
  const variantClasses = {
    primary: "bg-[#dc2626] hover:bg-[#b91c1c] text-white border-2 border-[#dc2626]",
    secondary: "bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border-2 border-[#3a3a3a]"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
