const Player = require('../factories/player');
const Gameboard = require('../factories/gameboard');

describe('Player', () => {
  test('Player places correct random coordinate', () => {
    const player1 = Player();
    const gameboard1 = Gameboard();
    player1.randomAttack(gameboard1);
    expect(gameboard1.grid.some((c) => c)).toBe(true);
  });
});
