import Enemy from './entities/enemyTank';
import config from './config';

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

  tanks.push(new Enemy(
    200,
    200,
    config.blockWidth,
    config.blockWidth,
    null,
    config.playerSpeed,
    null,
    'down',
  ));

  tanks.push(new Enemy(
    200,
    300,
    config.blockWidth,
    config.blockWidth,
    null,
    config.playerSpeed,
    null,
    'down',
  ));

  return tanks;
}

export default getTanks;
