const Gameboard = () => {
  const grid = new Array(10).fill(new Array(10).fill(null));

  const addShip = (ship, i, j) => {
    let x = 0;

    while (x < ship.length) {
      if (ship.isHorizontal) {
        grid[i + x][j] = [ship.name, x + 1];
      } else {
        grid[i][j + x] = [ship.name, x + 1];
      }
      x++;
    }
  };

  return { grid, addShip };
};

module.exports = Gameboard;
