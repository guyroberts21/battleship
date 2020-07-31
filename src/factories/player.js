const Player = () => {
  // Cannot hold the board on the player class :(
  // const enemyBoard = Gameboard();

  const getRandomInt = (i) => {
    return Math.floor(Math.random() * i);
  };

  const getRandomCoords = () => {
    return [getRandomInt(10), getRandomInt(10)];
  };

  const randomAttack = (board) => {
    // Keep looking for new spot
    let i, j;
    do {
      [i, j] = getRandomCoords();
    } while (board.grid[i][j] !== null);

    board.receiveAttack(i, j);

    return [i, j];
  };

  return { randomAttack };
};

module.exports = Player;
