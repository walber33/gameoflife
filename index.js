const gameOfLife = () => {
  // Tamanho da grade
  const ROWS = 10;
  const COLS = 10;

  // Criação da grade inicial com uma configuração específica
  let grid = Array.from({ length: ROWS }, (_, rowIndex) =>
    Array.from({ length: COLS }, (_, colIndex) => (
      (rowIndex === 3 && colIndex === 4) ||
      (rowIndex === 5 && colIndex >= 3 && colIndex <= 5)
        ? '█' : ' '
    ))
  );
  
  // Função para contar vizinhos vivos
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

  // Função principal de atualização da grade
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
