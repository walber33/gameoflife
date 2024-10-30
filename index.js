const gameOflife = () => {
  let grid = [
  [ ' ', ' ', ' ',' ', ' ', ' ',' ', ' ', ' ',' '],
  [ ' ', ' ', ' ',' ', ' ', ' ',' ', ' ', ' ',' '],
  [ ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ',' '],
  [ ' ', ' ',' ' ,' ', '█', ' ',' ', ' ', ' ',' '],
  [ ' ', ' ', ' ',' ', ' ', ' ',' ', ' ', ' ',' '],
  [ ' ', ' ', ' ','█', '█', '█',' ', ' ', ' ',' '],
  [ ' ', ' ', ' ',' ', ' ', ' ',' ', ' ', ' ',' '],
  [ ' ', ' ', ' ',' ', ' ', ' ',' ', ' ',' ', ' '],
  [ ' ', ' ', ' ',' ', ' ', ' ',' ', ' ', ' ',' '],
  [ ' ', ' ', ' ',' ', ' ', ' ',' ', ' ', ' ',' ']];
  let gridTemp = JSON.parse(JSON.stringify(grid));;
  setInterval(() => {
    process.stdout.write('\x1Bc');
    grid.forEach((row, rindex) => {
      row.forEach((_, cindex) => {
        process.stdout.write(grid[rindex][cindex]);
        
        // game of life rules
        let neighbors = 0;
        // verifica o item na direita
        if(grid[rindex][cindex+1] ===  '█') {
          neighbors++;
        }
        // verifica o item abaixo
        if(rindex+1 <= row.length-1 && grid[rindex+1][cindex] ===  '█') {
          neighbors++;
        }
        // verifica o item abaixo na direita
        if(rindex+1 <= row.length-1 && grid[rindex+1][cindex+1] ===  '█') {
          neighbors++;
        }
        // verifica o item abaixo na esquerda
        if(rindex+1 <= row.length-1 && grid[rindex+1][cindex-1] ===  '█') {
          neighbors++;
        }
        // verifica o item na esquerda
        if(grid[rindex][cindex-1] ===  '█') {
          neighbors++;
        }
        
        // verifica o item acima na esquerda
        if(rindex-1 >= 0 && grid[rindex-1][cindex-1] ===  '█') {
          neighbors++;
        }
        // verifica o item acima
        if(rindex-1 >= 0 && grid[rindex-1][cindex] ===  '█') {
          neighbors++;
        }
        // verifica o item acima na direita
        if(rindex-1 >= 0 && grid[rindex-1][cindex+1] ===  '█') {
          neighbors++;
        }
        if((neighbors < 2 || neighbors > 3) && grid[rindex][cindex] ===  '█') {
          gridTemp[rindex][cindex] =  ' ';
        } 
        if(neighbors === 3 && grid[rindex][cindex] ===  ' ') {
          gridTemp[rindex][cindex] =  '█';
        }
        if((neighbors === 2 || neighbors === 3) && grid[rindex][cindex] ===  '█') {
          gridTemp[rindex][cindex] =  '█';
        }
      })
      
      process.stdout.write('\n');
    })
    grid = JSON.parse(JSON.stringify(gridTemp));
  }, 500);
}
  
gameOflife();