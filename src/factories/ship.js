import { v4 as uuid } from 'uuid';

const CreateShip = (name, length, isHorizontal) => {
  const ship = new Array(length).fill(false);

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

module.exports = CreateShip;
