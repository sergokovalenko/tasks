import TankFactory from './factories/tankFactory';
import { gameSettings as config } from './config';

const tanks = [];
const factory = new TankFactory(null, null);

function getTanks(count) {
  let x = 0;
  let tank;

  for (let i = 0; i < count; i += 1) {
    tank = factory.makeStandartEnemy();

    if (i % 3 === 0) {
      x = 0;
    }

    if (i % 3 === 1) {
      x = 350;
    }

    if (i % 3 === 2) {
      x = 750;
    }

    console.log(tank);

    tank.position.x = x;
    tank.position.y = 0;

    tanks.push(tank);
  }

  for (let i = 100; i < config.gameHeight; i += 100) {
    tank = factory.makeStandartEnemy();
    tank.position.x = i;
    tank.position.y = i;
    tanks.push(tank);
  }

  return tanks;
}

export default getTanks;
