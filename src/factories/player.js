import Gameboard from './gameboard';
import { CreateShip } from './ship';

export const Player = (name) => {
  // main vars
  let board = Gameboard();
  let enemy;
  let attacks = [];

  const playTurn = (enemy, i, j) => {
    // stop fn running if player tries to attack same spot
    console.log('I and J:', i, j);

    let attack = parseAttack(i, j);
    console.log('Attack:', attack);
    if (enemy.attacks.includes(attack)) return;

    // enemy receives attack
    enemy.attacks.push(attack);
    enemy.board.receiveAttack(i, j);

    // check if all ships have sunk
    return enemy.board.checkDone();
  };

  // random place ships (for cpu)
  const autoPlace = (size) => {
    let [i, j] = getRandomCoords();
    let isHorizontal = Math.random() < 0.5 ? true : false;

    let res = board.addShip(CreateShip(size, isHorizontal), i, j);

    if (!res) {
      return autoPlace(size);
    }
  };

  const autoAddShips = () => {
    let ships = [2, 3, 3, 4, 5];

    for (let ship of ships) {
      autoPlace(ship);
    }

    return true;
  };

  // Helper fns
  const getRandomInt = (i) => {
    return Math.floor(Math.random() * i);
  };

  const getRandomCoords = () => {
    return [getRandomInt(10), getRandomInt(10)];
  };

  // convert between array and single num
  const parseAttack = (i, j) => parseInt(j.toString() + i.toString());

  const randomAttack = (enemy) => {
    // Keep looking for new spot
    let i, j;
    do {
      [i, j] = getRandomCoords();
    } while (enemy.attacks.includes(parseAttack(i, j)));
    console.log(i, j);

    enemy.board.receiveAttack(i, j);
    enemy.attacks.push(parseAttack(i, j));

    return enemy.board.checkDone();
  };

  return { board, enemy, attacks, playTurn, autoAddShips, randomAttack };
};
