import Enemy from './entities/enemyTank';
import { all as config } from './config';

const tanks = [];

function getTanks(count) {
  let x = 0;

  for (let i = 0; i < count; i += 1) {
    if (i % 3 === 0) {
      x = 0;
    }

    if (i % 3 === 1) {
      x = 350;
    }

    if (i % 3 === 2) {
      x = 750;
    }

    tanks.push(new Enemy(
      x,
      0,
      config.blockWidth,
      config.blockWidth,
      null,
      config.playerSpeed,
      null,
      'down',
    ));
  }

  for (let i = 100; i < config.gameWidth; i += 100) {
    tanks.push(new Enemy(
      i,
      i,
      config.blockWidth,
      config.blockWidth,
      null,
      config.playerSpeed,
      null,
      'down',
    ));
  }

  return tanks;
}

export default getTanks;
