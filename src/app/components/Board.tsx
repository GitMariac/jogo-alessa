import React, { useState } from 'react';


// Definindo o tipo da nossa matriz
type GridType = string[][];

const Board: React.FC = () => {
  // Tipando o estado do React
  const [grid] = useState<GridType>([
    ['R', 'E', 'A', 'C', 'T', 'X'],
    ['A', 'L', 'E', 'S', 'S', 'A'],
    ['J', 'O', 'G', 'O', 'V', 'B'],
    ['C', 'O', 'D', 'E', 'R', 'N'],
    ['H', 'T', 'M', 'L', 'S', 'Q'],
  ]);

  // Função para lidar com o clique (já com tipagem de evento se precisar)
  const handleCellClick = (row: number, col: number, letter: string): void => {
    console.log(`Letra: ${letter} | Posição: [${row}, ${col}]`);
  };

  return (
    <div className="game-container">
      <h2>Caça-Palavras da Alessa (TS)</h2>
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((letter, colIndex) => (
              <div key={colIndex}>{letter}</div>
       ))}
       </div>
))}
      </div>
    </div>
  );
};

export default Board;