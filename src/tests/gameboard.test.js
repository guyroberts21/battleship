const Gameboard = require('../factories/gameboard');
const CreateShip = require('../factories/ship');

describe('Gameboard', () => {
  test('Place a new ship', () => {
    const myBoard = Gameboard();
    const myShip = CreateShip('Battleship', 4, false);
    myBoard.addShip(myShip, 4, 3);
    expect(myBoard.grid[4][3]).toStrictEqual([myShip.name, myShip.id, 1]);
    expect(myBoard.grid[4][4]).toStrictEqual([myShip.name, myShip.id, 2]);
    expect(myBoard.grid[4][5]).toStrictEqual([myShip.name, myShip.id, 3]);
    expect(myBoard.grid[4][6]).toStrictEqual([myShip.name, myShip.id, 4]);
  });

  test('Gameboard correctly stores new ship', () => {
    const myBoard = Gameboard();
    const myShip = CreateShip('Battleship', 4, false);
    myBoard.addShip(myShip, 4, 2);
    expect(myBoard.ships[0]).toBe(myShip);
  });

  test('Receive attack correctly sends hit function to ship', () => {
    const myBoard = Gameboard();
    const myShip = CreateShip('Battleship', 4, false);
    myBoard.addShip(myShip, 4, 3);
    myBoard.receiveAttack(4, 4);
    expect(myBoard.ships[0].ship[1]).toBe(true);
  });
});
