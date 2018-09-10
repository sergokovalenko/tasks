import { all as config } from './config';
import Tank from './entities/tank';
import MovementManager from './Managers/movementManager';
import getTanks from './tankGenerator';
import levels from './levelCofig';
import getTextures from './mapGenerator';
import {
  hasCollisionWithBorderds,
  macroCollision,
} from './collisionManager';
import Enemy from './entities/enemyTank';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let dt = 0;
const step = 1 / config.fps;
const input = window.input || {};
const bulletsArr = [];
let last = performance.now();
const player = new Tank(
  400,
  750,
  config.blockWidth,
  config.blockWidth,
  null,
  config.playerSpeed,
  config.playerKeys,
);
const enemiesArr = getTanks(3);
const textures = getTextures(levels.level1);

const movementManager = new MovementManager();

(function init() {
  movementManager.addMovement(player, 'keyboard');
  movementManager.addWeapon(player, 'Bullet');

  for (let i = 0; i < enemiesArr.length; i += 1) {
    movementManager.addMovement(enemiesArr[i], 'ai');
  }
}());

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

function enemyCollisionWithBullet(bullets, enemies) {
  for (let i = 0; i < bullets.length; i += 1) {
    for (let j = 0; j < enemies.length; j += 1) {
      if (macroCollision(bullets[i], enemies[j])) {
        bullets.splice(i, 1);
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

function draw() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, config.gameWidth, config.gameHeight);

  ctx.fillStyle = '#00ff00';
  ctx.fillRect(player.position.x, player.position.y, player.size.width, player.size.height);

  ctx.fillStyle = '#00f0f0';
  for (let i = 0; i < enemiesArr.length; i += 1) {
    ctx.fillRect(
      enemiesArr[i].position.x,
      enemiesArr[i].position.y,
      enemiesArr[i].size.width,
      enemiesArr[i].size.height,
    );
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

    if (obj1 instanceof (Enemy) && obj2 instanceof (Tank)) {
      obj1.changeDirection();
    }

    if (obj1 instanceof (Enemy) && obj2 instanceof (Enemy)) {
      obj1.changeDirection();
    }
  }
}

function update() {
  if (input.isDown('SPACE')) {
    const bul = player.shoot(step);

    if (bul) {
      bulletsArr.push(bul);
    }
  }
  movementManager.update(step);
  // player.update(step);

  fixCollisionsWithBorders(player);
  bulletCollisionsWithBorders(bulletsArr);
  enemyCollisionWithBullet(bulletsArr, enemiesArr);
  tankCollisionWithBullet(player, bulletsArr);

  for (let i = 0; i < enemiesArr.length; i += 1) {
    playerCol(player, enemiesArr[i]);
    // enemiesArr[i].update(step);ц
    fixCollisionsWithBorders(enemiesArr[i]);
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
  // dt += Math.min(1, (now - last) / 1000);

  while (dt > step) {
    dt -= step;
  }
  last = now;
  update();

  draw();
  requestAnimationFrame(frame);
};

requestAnimationFrame(frame);
