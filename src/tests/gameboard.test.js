const Gameboard = require('../factories/gameboard');
import { CreateShip } from '../factories/ship';

describe('Gameboard', () => {
  test('Place a new ship', () => {
    const myBoard = Gameboard();
    const myShip = CreateShip(4, false);
    myBoard.addShip(myShip, 4, 3);
    expect(myBoard.grid[4][3]).toStrictEqual([myShip.name, myShip.id, 1]);
    expect(myBoard.grid[5][3]).toStrictEqual([myShip.name, myShip.id, 2]);
    expect(myBoard.grid[6][3]).toStrictEqual([myShip.name, myShip.id, 3]);
    expect(myBoard.grid[7][3]).toStrictEqual([myShip.name, myShip.id, 4]);
  });

  test('Gameboard correctly stores new ship', () => {
    const myBoard = Gameboard();
    const myShip = CreateShip(4, false);
    myBoard.addShip(myShip, 4, 2);
    expect(myBoard.ships[0]).toBe(myShip);
  });

  test('Receive attack correctly sends hit function to ship', () => {
    const myBoard = Gameboard();
    const myShip = CreateShip(4, false);
    myBoard.addShip(myShip, 4, 3);
    myBoard.receiveAttack(5, 3);
    expect(myBoard.ships[0].ship[1]).toBe(true);
  });

  test('Gameboard reports when game is finished', () => {
    const myBoard = Gameboard();
    const myShip = CreateShip(3, true);
    myBoard.addShip(myShip, 5, 5);
    myBoard.receiveAttack(5, 5);
    myBoard.receiveAttack(5, 6);
    myBoard.receiveAttack(5, 7);
    expect(myBoard.checkDone()).toBe(true);
  });
});
