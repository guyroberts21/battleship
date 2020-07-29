const Gameboard = () => {
  const grid = new Array(10).fill(new Array(10).fill(null));
  // Array for the ships (which will be added by user)
  let ships = [];

  const addShip = (ship, i, j) => {
    try {
      ships.push(ship);

      let x = 0;

      while (x < ship.length) {
        if (ship.isHorizontal) {
          grid[i + x][j] = [ship.name, ship.id, x + 1];
        } else {
          grid[i][j + x] = [ship.name, ship.id, x + 1];
        }
        x++;
      }
    } catch (e) {
      console.log('Ship cannot be added:', e);
      return;
    }
  };

  const receiveAttack = (i, j) => {
    if (grid[i][j] !== null && grid[i][j] !== 'missed') {
      // use 1 to represent the id of a ship (see above addShip fn)
      let ship = ships.find((ship) => ship.id === grid[i][j][1]);
      // use 2 to represent the idx of point hit (^)
      ship.hit(grid[i][j][2] - 1);
      // replace the ship in array
      const idx = ships.indexOf(ship);
      ships[idx] = ship;
    } else {
      grid[i][j] = 'missed';
    }
  };

  return { grid, ships, addShip, receiveAttack };
};

module.exports = Gameboard;
