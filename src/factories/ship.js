const CreateShip = (name, length, isHorizontal) => {
  const ship = new Array(length).fill(false);

  const hit = (i) => {
    ship[i] = true;
    return ship;
  };

  const isSunk = () => {
    return ship.every((i) => i);
  };

  return { ship, length, name, isHorizontal, hit, isSunk };
};

module.exports = CreateShip;
