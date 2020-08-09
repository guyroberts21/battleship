import Gameboard from './gameboard';

export const Player = (name) => {
  // main vars
  let board = Gameboard();
  let enemy;
  let attacks = [];

  const playTurn = (enemy, i, j) => {
    // stop fn running if player tries to attack same spot
    let attack = parseAttack(i, j);
    if (enemy.attacks.includes(attack)) return;

    // enemy receives attack
    enemy.attacks.push(attack);
    enemy.board.receiveAttack(i, j);

    // check if all ships have sunk
    return enemy.board.checkDone();
  };

  // convert between array and single num
  const parseAttack = (i, j) => parseInt(j.toString() + i.toString());

  const randomAttack = (enemy) => {
    // Helper fns
    const getRandomInt = (i) => {
      return Math.floor(Math.random() * i);
    };

    const getRandomCoords = () => {
      return [getRandomInt(10), getRandomInt(10)];
    };

    // Keep looking for new spot
    let i, j;
    do {
      [i, j] = getRandomCoords();
    } while (enemy.attacks.includes(parseAttack(i, j)));

    enemy.board.receiveAttack(i, j);
    enemy.attacks.push(parseAttack(i, j));

    return enemy.board.checkDone();
  };

  return { board, enemy, attacks, playTurn, randomAttack };
};
