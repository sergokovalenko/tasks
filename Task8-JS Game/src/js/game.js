import { all as config } from './config';
import MovementManager from './Managers/movementManager';
import ShootingManager from './Managers/shootingManager';
import SpriteMaker from './Managers/spriteMaker';
import {
  getTanks,
  getPlayer,
} from './tankGenerator';
import levels from './levelCofig';
import getTextures from './mapGenerator';
import CollisionManager from './Managers/collisionManager';
import Drawer from './drawer';

let canvas;
let ctx;
let dt = 0;
const step = 1 / config.fps;
let bulletsArr = [];
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

function update() {
  if (isPaused) {
    return;
  }

  movementManager.update(step);
  shootingManager.update(step);
  if (shootingManager.isWeaponAdded) {
    bulletsArr = shootingManager.getWeaponsArr();
  }

  collisionManager.fixCollisionsWithBorders(player);
  collisionManager.bulletCollisionsWithBorders(bulletsArr);
  collisionManager.enemyCollisionWithBullet(bulletsArr, enemiesArr, shootingManager);
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
  drawer.drawAll(player, enemiesArr, bulletsArr, textures, isPaused);

  requestAnimationFrame(frame);
};

function initialize(all) {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  drawer = new Drawer(ctx);
  spriteMaker = new SpriteMaker(all);
  shootingManager = new ShootingManager();
  movementManager = new MovementManager(shootingManager);
  collisionManager = new CollisionManager();

  const playerSprite = spriteMaker.getSpriteFor('player');
  const enemySprite = spriteMaker.getSpriteFor('enemy');
  const wallSprite = spriteMaker.getSpriteFor('wall');
  const stillSprite = spriteMaker.getSpriteFor('stillWall');

  player = getPlayer(playerSprite);
  enemiesArr = getTanks(3, enemySprite);
  textures = getTextures(levels.level2, wallSprite, stillSprite);

  movementManager.addMovement(player, 'keyboard');
  shootingManager.addWeapon(player, 'Bullet');

  for (let i = 0; i < enemiesArr.length; i += 1) {
    movementManager.addMovement(enemiesArr[i], 'ai');
    shootingManager.addWeapon(enemiesArr[i], 'Bullet');
  }

  canvas.width = config.gameWidth + 100;
  canvas.height = config.gameHeight;
  document.getElementById('canvas-wrapper').appendChild(canvas);

  requestAnimationFrame(frame);
}

function pauseGame() {
  isPaused = !isPaused;
}

export { initialize };
export { pauseGame };
