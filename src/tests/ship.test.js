import { CreateShip } from '../factories/ship';

describe('Ship', () => {
  const ship = CreateShip(5, false);
  test('Ship initially contains just falsy values', () => {
    expect(ship.ship.some((val) => val)).toBe(false);
  });

  test('Ship hit method correctly changes value', () => {
    ship.hit(3);
    expect(ship.ship[3]).toBe(true);
  });

  test('Ship sunk method returns true when all values are true', () => {
    const sunkShip = CreateShip(5, false);
    for (let i = 0; i < sunkShip.ship.length; i++) {
      sunkShip.hit(i);
    }

    expect(sunkShip.isSunk()).toBe(true);
  });
});
