import { all as config } from './config';
import Tank from './entities/tank';
import MovementManager from './Managers/movementManager';
import ShootingManager from './Managers/shootingManager';
import SpriteMaker from './Managers/spriteMaker';
import {
  getTanks,
  getPlayer,
} from './tankGenerator';
import levels from './levelCofig';
import getTextures from './mapGenerator';
import {
  hasCollisionWithBorderds,
  macroCollision,
} from './collisionManager';
import Enemy from './entities/enemyTank';
import Wall from './entities/wall';

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

canvas.width = config.gameWidth;
canvas.height = config.gameHeight;
document.body.appendChild(canvas);

function bulletCollisionsWithBorders(bullets) {
  for (let i = 0; i < bullets.length; i += 1) {
    if (hasCollisionWithBorderds(bullets[i])) {
      bullets.splice(i, 1);
      i -= 1;
    }
  }
}

function wallCollisionsWithBullets(walls, bullets) {
  for (let i = 0; i < walls.length; i += 1) {
    if (walls[i].hasCollWithBul) {
      for (let j = 0; j < bullets.length; j += 1) {
        if (macroCollision(walls[i], bullets[j])) {
          bullets.splice(j, 1);
          j -= 1;
          if (walls[i].isDestr) {
            walls.splice(i, 1);
            i -= 1;
            break;
          }
        }
      }
    }
  }
}

function enemyCollisionWithBullet(bullets, enemies) {
  for (let i = 0; i < bullets.length; i += 1) {
    for (let j = 0; j < enemies.length; j += 1) {
      if (macroCollision(bullets[i], enemies[j])) {
        bullets.splice(i, 1);
        shootingManager.clearWeapons(enemies[j]);
        enemies.splice(j, 1);
        i -= 1;
        break;
      }
    }
  }
}

function tankCollisionWithBullet(obj, bullets) {
  const object = obj;

  for (let i = 0; i < bullets.length; i += 1) {
    if (macroCollision(obj, bullets[i])) {
      object.live -= 1;
      bullets.splice(i, 1);
      return;
    }
  }
}

function fixCollisionsWithBorders(obj) {
  const collisionResult = hasCollisionWithBorderds(obj);
  const entity = obj;

  if (collisionResult) {
    if (collisionResult === 'top') {
      entity.position.y += entity.velocity;
      return;
    }

    if (collisionResult === 'right') {
      entity.position.x -= entity.velocity;
      return;
    }

    if (collisionResult === 'bottom') {
      entity.position.y -= entity.velocity;
      return;
    }

    if (collisionResult === 'left') {
      entity.position.x += entity.velocity;
    }
  }
}

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

  ctx.fillStyle = '#00f0f0';
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

  ctx.fillStyle = '#ff0000';
  for (let i = 0; i < textures.length; i += 1) {
    ctx.fillRect(
      textures[i].position.x,
      textures[i].position.y,
      textures[i].size.width,
      textures[i].size.height,
    );
  }
}

function collisionAction(obj) {
  const collisedObj = obj;

  switch (obj.direction) {
    case 'top':
      collisedObj.position.y += collisedObj.velocity;
      break;
    case 'right':
      collisedObj.position.x -= collisedObj.velocity;
      break;
    case 'down':
      collisedObj.position.y -= collisedObj.velocity;
      break;
    case 'left':
      collisedObj.position.x += collisedObj.velocity;
      break;
    default:
      break;
  }
}

function playerCol(obj1, obj2) {
  if (macroCollision(obj1, obj2)) {
    collisionAction(obj1);
  }
}

function enemyCol(obj1, obj2) {
  if (macroCollision(obj1, obj2)) {
    collisionAction(obj1);

    if (obj1 instanceof Enemy && (obj2 instanceof Tank || obj2 instanceof Wall)) {
      obj1.changeDirection();
    }

    if (obj1 instanceof Enemy && obj2 instanceof Enemy) {
      obj1.changeDirection();
    }
  }
}

function update() {
  movementManager.update(step);
  shootingManager.update(step);
  if (shootingManager.isWeaponAdded) {
    bulletsArr = shootingManager.getWeaponsArr();
  }

  fixCollisionsWithBorders(player);
  bulletCollisionsWithBorders(bulletsArr);
  enemyCollisionWithBullet(bulletsArr, enemiesArr);
  tankCollisionWithBullet(player, bulletsArr);
  wallCollisionsWithBullets(textures, bulletsArr);

  for (let i = 0; i < textures.length; i += 1) {
    playerCol(player, textures[i]);
  }

  for (let i = 0; i < enemiesArr.length; i += 1) {
    playerCol(player, enemiesArr[i]);
    fixCollisionsWithBorders(enemiesArr[i]);

    for (let j = 0; j < textures.length; j += 1) {
      enemyCol(enemiesArr[i], textures[j]);
    }
  }

  for (let i = 0; i < enemiesArr.length; i += 1) {
    fixCollisionsWithBorders(enemiesArr[i]);
    enemyCol(enemiesArr[i], player);
    for (let j = 0; j < enemiesArr.length; j += 1) {
      if (i !== j) {
        enemyCol(enemiesArr[i], enemiesArr[j]);
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
  console.log(enemySprite);

  player = getPlayer(playerSprite);
  enemiesArr = getTanks(3, enemySprite);
  textures = getTextures(levels.level2);
  shootingManager = new ShootingManager();
  movementManager = new MovementManager(shootingManager);
  movementManager.addMovement(player, 'keyboard');
  shootingManager.addWeapon(player, 'Bullet');

  for (let i = 0; i < enemiesArr.length; i += 1) {
    movementManager.addMovement(enemiesArr[i], 'ai');
    shootingManager.addWeapon(enemiesArr[i], 'Bullet');
  }

  requestAnimationFrame(frame);
}

export default initialize;
