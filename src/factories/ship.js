import { v4 as uuid } from 'uuid';

export const CreateShip = (length, isHorizontal) => {
  const ship = new Array(length).fill(false);

  const shipNames = {
    2: 'Destroyer',
    3: 'Cruiser',
    4: 'Battleship',
    5: 'Carrier',
  };

  const name = shipNames[length];

  const id = uuid();

  const hit = (i) => {
    ship[i] = true;
    return ship;
  };

  const isSunk = () => {
    return ship.every((i) => i);
  };

  return { ship, id, length, name, isHorizontal, hit, isSunk };
};

// module.exports = CreateShip;
