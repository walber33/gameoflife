const gameOfLife = () => {
  const ROWS = 10;
  const COLS = 10;

  // Gera a grade inicial, com a opção de um padrão aleatório ou fixo
  let grid = generateInitialGrid();

  // Gera a grade inicial com a escolha do usuário
  function generateInitialGrid() {
    const randomPattern = promptUserForRandomPattern();
    return Array.from({ length: ROWS }, (_, rowIndex) =>
      Array.from({ length: COLS }, (_, colIndex) =>
        randomPattern 
          ? (Math.random() > 0.7 ? '█' : ' ')
          : ((rowIndex === 3 && colIndex === 4) || (rowIndex === 5 && colIndex >= 3 && colIndex <= 5) ? '█' : ' ')
      )
    );
  }

  // Pergunta ao usuário se ele deseja iniciar com um padrão aleatório
  function promptUserForRandomPattern() {
    console.clear();
    console.log("Gostaria de iniciar com um padrão aleatório? (Digite 'S' para Sim ou qualquer outra tecla para Não)");
    const response = require('readline-sync').question('Resposta: ');
    return response.trim().toUpperCase() === 'S';
  }

  // Conta os vizinhos vivos
  const countNeighbors = (r, c) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    return directions.reduce((count, [dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      return count + (grid[nr]?.[nc] === '█' ? 1 : 0);
    }, 0);
  };

  // Atualiza a grade com as regras do Jogo da Vida
  const updateGrid = () => {
    const newGrid = grid.map((row, r) =>
      row.map((cell, c) => {
        const neighbors = countNeighbors(r, c);
        if (cell === '█' && (neighbors < 2 || neighbors > 3)) return ' ';
        if (cell === ' ' && neighbors === 3) return '█';
        return cell;
      })
    );
    grid = newGrid;
  };

  // Loop de animação
  setInterval(() => {
    process.stdout.write('\x1Bc');
    grid.forEach(row => console.log(row.join(' ')));
    updateGrid();
  }, 500);
};

gameOfLife();