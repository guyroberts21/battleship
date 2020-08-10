import { Player } from '../factories/player';
import { CreateShip } from '../factories/ship';

describe('Player', () => {
  const player = Player('Player');
  const enemy = Player('Enemy');
  player.enemy = enemy;
  enemy.enemy = player;
  enemy.board.addShip(CreateShip(5, false), 2, 3);

  test('Player can auto add their ships', () => {
    expect(player.autoAddShips()).toBe(true);
  });

  test('Player turn attacks enemy correctly', () => {
    player.playTurn(enemy, 1, 5);
    expect(enemy.board.grid[1][5]).toBe('missed');
  });

  test('Player attacks random coordinate', () => {
    expect(player.randomAttack(enemy)).toBe(false);
  });
});
