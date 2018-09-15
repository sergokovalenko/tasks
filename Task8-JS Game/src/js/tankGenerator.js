import TankFactory from './factories/tankFactory';
import { gameSettings as config } from './config';
import { macroCollision } from './helpers/collisionHelper';

const factory = new TankFactory();
let enemySprites;
let movementManager;
let shootingManager;
let playerSprites;

function TankGenerator(moveManager, shootManager, enemySprite, playerSprite) {
  this.gameScore = 0;
  this.maxEnemiesOnMap = 3;
  movementManager = moveManager;
  shootingManager = shootManager;
  enemySprites = enemySprite;
  playerSprites = playerSprite;
}

function getTanks() {
  const tanks = [];
  let tank;

  for (let i = 0; i < 3; i += 1) {
    let x = 0;
    tank = factory.makeStandartEnemy(enemySprites);
    if (i === 1) {
      x = tank.size.width * 8;
    }
    if (i === 2) {
      x = tank.size.width * 15;
    }

    tank.position.x = x;
    tanks.push(tank);
  }

  return tanks;
}

function getPlayer() {
  return factory.makePlayer(playerSprites);
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

function getEnemies(enemyArray, player, textures) {
  const diff = this.maxEnemiesOnMap - enemyArray.length;

  for (let i = 0; i < diff; i += 1) {
    const tank = factory.makeStandartEnemy(enemySprites);
    const fullArr = enemyArray.concat(textures);
    fullArr.push(player);
    rect(tank, [fullArr]);
    movementManager.addMovement(tank, 'ai');
    shootingManager.addWeapon(tank, 'Bullet');
    enemyArray.push(tank);
  }

  return enemyArray;
}


function update(score) {
  if (this.gameScore !== score) {
    this.gameScore = score;

    if (this.gameScore >= 300) {
      this.maxEnemiesOnMap = 4;
    }
    if (this.gameScore >= 1000) {
      this.maxEnemiesOnMap = 8;
    }
    if (this.gameScore >= 2000) {
      this.maxEnemiesOnMap = 16;
    }
    if (this.gameScore >= 3000) {
      this.maxEnemiesOnMap = 30;
    }
  }
}

function reset() {
  this.maxEnemiesOnMap = 3;
  this.gameScore = 0;
}

TankGenerator.prototype.getEnemyWithoutConflicts = getEnemyWithoutConflicts;
TankGenerator.prototype.getPlayer = getPlayer;
TankGenerator.prototype.getTanks = getTanks;
TankGenerator.prototype.update = update;
TankGenerator.prototype.getEnemies = getEnemies;
TankGenerator.prototype.reset = reset;

export default TankGenerator;
