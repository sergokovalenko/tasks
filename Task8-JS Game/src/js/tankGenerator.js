import TankFactory from './factories/tankFactory';
import { gameSettings as config } from './config';
import { macroCollision } from './helpers/collisionHelper';

const tanks = [];
const factory = new TankFactory(null, null);
let enemySprites;

function TankGenerator(enemySprite) {
  enemySprites = enemySprite;
}

function getTanks(count, enemySprite) {
  let tank;
  enemySprites = enemySprite;

  for (let i = 0; i < count; i += 1) {
    tank = factory.makeStandartEnemy(enemySprite);

    tanks.push(tank);
  }

  return tanks;
}

function getPlayer(playerSprite) {
  return factory.makePlayer(playerSprite);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function rect(tank, objArrs) {
  const copy = tank;
  copy.position.x = getRandomInt(0, config.gameWidth - 50);
  copy.position.y = getRandomInt(0, config.gameWidth - 50);

  for (let i = 0; i < objArrs.length; i += 1) {
    for (let j = 0; j < objArrs[i].length; j += 1) {
      if (macroCollision(copy, objArrs[i][j])) {
        rect(tank, objArrs);
        return;
      }
    }
  }
}

function getEnemyWithoutConflicts(...objArrs) {
  const tank = factory.makeStandartEnemy(enemySprites);
  rect(tank, objArrs);
  return tank;
}

TankGenerator.prototype.getEnemyWithoutConflicts = getEnemyWithoutConflicts;
TankGenerator.prototype.getPlayer = getPlayer;
TankGenerator.prototype.getTanks = getTanks;

export { getTanks };
export { getPlayer };
export { getEnemyWithoutConflicts };
export { TankGenerator };
