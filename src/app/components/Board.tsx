import React from 'react';
import { motion } from 'framer-motion';
import { Position } from '../../utils/game-engine';

interface BoardProps {
  grid: string[][];
  selectedCells: Position[];
  onCellClick: (row: number, col: number) => void;
  foundWordsPositions: Position[];
}

const Board: React.FC<BoardProps> = ({ grid, selectedCells, onCellClick, foundWordsPositions }) => {
  const isSelected = (row: number, col: number) => 
    selectedCells.some(p => p.row === row && p.col === col);

  const isFound = (row: number, col: number) => 
    foundWordsPositions.some(p => p.row === row && p.col === col);

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-xl border-2 border-[#2a2a2a] shadow-2xl">
      <div className="grid grid-cols-10 gap-1 md:gap-2">
        {grid.map((row, rowIndex) => (
          row.map((letter, colIndex) => (
            <motion.button
              key={`${rowIndex}-${colIndex}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCellClick(rowIndex, colIndex)}
              className={`
                w-8 h-8 md:w-12 md:h-12 flex items-center justify-center 
                rounded-md text-sm md:text-xl font-bold transition-colors
                ${isFound(rowIndex, colIndex) 
                  ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.5)]' 
                  : isSelected(rowIndex, colIndex)
                    ? 'bg-[#dc2626] text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                    : 'bg-[#2a2a2a] text-[#9ca3af] hover:bg-[#3a3a3a] hover:text-white'
                }
              `}
            >
              {letter}
            </motion.button>
          ))
        ))}
      </div>
    </div>
  );
};

export default Board;
