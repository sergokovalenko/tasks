import { all as config } from './config';
import MovementManager from './Managers/movementManager';
import ShootingManager from './Managers/shootingManager';
import SpriteMaker from './Managers/spriteMaker';
import TankGenerator from './tankGenerator';
import BonusGenerator from './bonusGenerator';
import levels from './levelCofig';
import getTextures from './mapGenerator';
import CollisionManager from './Managers/collisionManager';
import Drawer from './drawer';

const step = 1 / config.fps;
let dt = 0;
let bulletsArr = [];
let bonusArr = [];
let last = performance.now();
let player;
let enemiesArr;
let textures;
let shootingManager;
let movementManager;
let spriteMaker;
let collisionManager;
let isPaused = false;
let drawer;
let score = 0;
let gameState;
let gameOverTimer;
let tankGenerator;
let bonusGenerator;
let playerSprite;
let enemySprite;
let wallSprite;
let stillSprite;
let starSprite;
let lifeSprite;

function restart() {
  enemiesArr = [];
  bonusArr = [];
  movementManager.reset();
  shootingManager.reset();
  tankGenerator.reset();
  player = tankGenerator.getPlayer(playerSprite);
  enemiesArr = tankGenerator.getTanks(enemySprite);
  textures = getTextures(levels.level2, wallSprite, stillSprite);
  movementManager.addMovement(player, 'keyboard');
  shootingManager.addWeapon(player, 'Bullet');

  for (let i = 0; i < enemiesArr.length; i += 1) {
    movementManager.addMovement(enemiesArr[i], 'ai');
    shootingManager.addWeapon(enemiesArr[i], 'Bullet');
  }

  isPaused = false;
  gameState = 'play';
  gameOverTimer = 3;
  score = 0;
}

function checkOnLose() {
  if (player.live <= 0) {
    gameState = 'lose';

    return true;
  }

  return false;
}

function update() {
  if (checkOnLose()) {
    isPaused = true;
    gameOverTimer -= step;
    if (gameOverTimer <= 0) {
      restart();
    }
    return;
  }

  if (isPaused) {
    return;
  }

  const bonus = bonusGenerator.generateBonus(step);
  if (bonus) {
    bonusArr.push(bonus);
  }
  tankGenerator.update(score);
  movementManager.update(step);
  shootingManager.update(step);
  if (shootingManager.isWeaponAdded) {
    bulletsArr = shootingManager.getWeaponsArr();
  }

  enemiesArr = tankGenerator.getEnemies(enemiesArr, player, textures);

  collisionManager.fixCollisionsWithBorders(player);
  collisionManager.bulletCollisionsWithBorders(bulletsArr);
  score += collisionManager.enemyCollisionWithBullet(bulletsArr, enemiesArr, shootingManager);
  collisionManager.tankCollisionWithBullet(player, bulletsArr);
  collisionManager.wallCollisionsWithBullets(textures, bulletsArr);

  for (let i = 0; i < textures.length; i += 1) {
    collisionManager.playerCollisinWithObjects(player, textures[i]);
  }

  for (let i = 0; i < enemiesArr.length; i += 1) {
    collisionManager.playerCollisinWithObjects(player, enemiesArr[i]);
    collisionManager.fixCollisionsWithBorders(enemiesArr[i]);

    for (let j = 0; j < textures.length; j += 1) {
      collisionManager.enemyCollisionWithObjects(enemiesArr[i], textures[j]);
    }
  }

  for (let i = 0; i < enemiesArr.length; i += 1) {
    collisionManager.fixCollisionsWithBorders(enemiesArr[i]);
    collisionManager.enemyCollisionWithObjects(enemiesArr[i], player);
    for (let j = 0; j < enemiesArr.length; j += 1) {
      if (i !== j) {
        collisionManager.enemyCollisionWithObjects(enemiesArr[i], enemiesArr[j]);
      }
    }
  }

  for (let i = 0; i < bulletsArr.length; i += 1) {
    bulletsArr[i].update();
  }
}

const frame = () => {
  const now = performance.now();
  dt += now - last;

  while (dt > step) {
    dt -= step;
  }
  last = now;
  update();
  drawer.drawAll(player, enemiesArr, bulletsArr, textures, bonusArr, score, gameState);

  requestAnimationFrame(frame);
};

function initialize(all) {
  drawer = new Drawer();
  spriteMaker = new SpriteMaker(all);
  shootingManager = new ShootingManager();
  movementManager = new MovementManager(shootingManager);
  collisionManager = new CollisionManager();

  playerSprite = spriteMaker.getSpriteFor('player');
  enemySprite = spriteMaker.getSpriteFor('enemy');
  wallSprite = spriteMaker.getSpriteFor('wall');
  stillSprite = spriteMaker.getSpriteFor('stillWall');
  starSprite = spriteMaker.getSpriteFor('starBonus');
  lifeSprite = spriteMaker.getSpriteFor('lifeBonus');

  bonusGenerator = new BonusGenerator(60, lifeSprite, starSprite);
  tankGenerator = new TankGenerator(movementManager, shootingManager, enemySprite, playerSprite);
  player = tankGenerator.getPlayer();
  enemiesArr = tankGenerator.getTanks();
  textures = getTextures(levels.level2, wallSprite, stillSprite);

  movementManager.addMovement(player, 'keyboard');
  shootingManager.addWeapon(player, 'Bullet');

  for (let i = 0; i < enemiesArr.length; i += 1) {
    movementManager.addMovement(enemiesArr[i], 'ai');
    shootingManager.addWeapon(enemiesArr[i], 'Bullet');
  }

  gameOverTimer = 3;
  gameState = 'play';

  requestAnimationFrame(frame);
}

function pauseGame() {
  isPaused = !isPaused;
  if (gameState === 'pause') {
    gameState = 'play';
  } else {
    gameState = 'pause';
  }
}

export { initialize };
export { pauseGame };
export { restart };
