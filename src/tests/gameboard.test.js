const Gameboard = require('../factories/gameboard');
const CreateShip = require('../factories/ship');

describe('Gameboard', () => {
  test('Place a new ship', () => {
    const myBoard = Gameboard();
    const myShip = CreateShip('Battleship', 4, false);
    myBoard.addShip(myShip, 4, 3);
    expect(myBoard.grid[4][3]).toStrictEqual([myShip.name, 1]);
    expect(myBoard.grid[4][4]).toStrictEqual([myShip.name, 2]);
    expect(myBoard.grid[4][5]).toStrictEqual([myShip.name, 3]);
    expect(myBoard.grid[4][6]).toStrictEqual([myShip.name, 4]);
  });
});
