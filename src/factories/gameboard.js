const Gameboard = () => {
  const grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  // Array for the ships (which will be added by user)
  let ships = [];

  const checkShipAvailability = (ship, i, j) => {
    for (let x = 0; x < ship.length; x++) {
      if (ship.isHorizontal) {
        if (j + x < 9 && grid[i][j + x] === null) continue;
        else return false;
      } else {
        if (i + x < 9 && grid[i + x][j] === null) continue;
        else return false;
      }
    }
    return true;
  };

  const addShip = (ship, i, j) => {
    // don't add if not available
    if (!checkShipAvailability(ship, i, j)) return false;

    for (let x = 0; x < ship.length; x++) {
      if (ship.isHorizontal) {
        grid[i][j + x] = [ship.name, ship.id, x + 1];
      } else {
        grid[i + x][j] = [ship.name, ship.id, x + 1];
      }
    }

    ships.push(ship);
    return true;
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

  const checkDone = () => {
    return ships.every((ship) => ship.isSunk());
  };

  return { grid, ships, addShip, receiveAttack, checkDone };
};

module.exports = Gameboard;
