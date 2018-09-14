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

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
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

canvas.width = config.gameWidth;
canvas.height = config.gameHeight;
document.getElementById('canvas-wrapper').appendChild(canvas);

function drawTank(pl) {
  let { x } = pl.spriteInfo.position;
  switch (pl.direction) {
    case 'right':
      x = pl.spriteInfo.position.x + (pl.spriteInfo.size.width * 6);
      break;
    case 'down':
      x = pl.spriteInfo.position.x + (pl.spriteInfo.size.width * 4);
      break;
    case 'left':
      x = pl.spriteInfo.position.x + (pl.spriteInfo.size.width * 2);
      break;
    default:
      break;
  }
  ctx.drawImage(
    window.resources.getImg(pl.spriteInfo.url),
    x,
    pl.spriteInfo.position.y,
    pl.spriteInfo.size.width,
    pl.spriteInfo.size.height,
    pl.position.x,
    pl.position.y,
    pl.size.width,
    pl.size.height,
  );
}

function draw() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, config.gameWidth, config.gameHeight);

  drawTank(player);

  for (let i = 0; i < enemiesArr.length; i += 1) {
    drawTank(enemiesArr[i]);
  }

  ctx.fillStyle = '#f0f0f0';
  for (let i = 0; i < bulletsArr.length; i += 1) {
    ctx.fillRect(
      bulletsArr[i].position.x,
      bulletsArr[i].position.y,
      bulletsArr[i].size.width,
      bulletsArr[i].size.height,
    );
  }

  for (let i = 0; i < textures.length; i += 1) {
    ctx.drawImage(
      window.resources.getImg(textures[i].spriteInfo.url),
      textures[i].spriteInfo.position.x,
      textures[i].spriteInfo.position.y,
      textures[i].spriteInfo.size.width,
      textures[i].spriteInfo.size.height,
      textures[i].position.x,
      textures[i].position.y,
      textures[i].size.width,
      textures[i].size.height,
    );
  }

  if (isPaused) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, config.gameWidth, config.gameHeight);
    ctx.fillStyle = '#ffffff';
    ctx.font = '32px serif';
    ctx.fillText('Pause', (config.gameWidth / 2) - 50, (config.gameHeight / 2) - 16);
  }
}

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

  draw();
  requestAnimationFrame(frame);
};


function initialize(all) {
  spriteMaker = new SpriteMaker(all);
  const playerSprite = spriteMaker.getSpriteFor('player');
  const enemySprite = spriteMaker.getSpriteFor('enemy');
  const wallSprite = spriteMaker.getSpriteFor('wall');
  const stillSprite = spriteMaker.getSpriteFor('stillWall');

  player = getPlayer(playerSprite);
  enemiesArr = getTanks(3, enemySprite);
  textures = getTextures(levels.level2, wallSprite, stillSprite);
  shootingManager = new ShootingManager();
  movementManager = new MovementManager(shootingManager);
  collisionManager = new CollisionManager();
  movementManager.addMovement(player, 'keyboard');
  shootingManager.addWeapon(player, 'Bullet');

  for (let i = 0; i < enemiesArr.length; i += 1) {
    movementManager.addMovement(enemiesArr[i], 'ai');
    shootingManager.addWeapon(enemiesArr[i], 'Bullet');
  }

  requestAnimationFrame(frame);
}

function pauseGame() {
  isPaused = !isPaused;
}

export { initialize };
export { pauseGame };
