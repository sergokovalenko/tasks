import config from './config';
import Tank from './entities/tank';
import getTanks from './tankFactory';
import hasCollisionWithBorderds from './collisionManager';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let dt = 0;
const step = 1 / config.fps;
let last = performance.now();
const player = new Tank(
  100,
  100,
  config.blockWidth,
  config.blockWidth,
  null,
  config.playerSpeed,
  config.playerKeys,
);
const enemies = getTanks(3);

canvas.width = config.gameWidth;
canvas.height = config.gameHeight;
document.body.appendChild(canvas);

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
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0, 0, 800, 800);

  ctx.fillStyle = '#00ff00';
  ctx.fillRect(player.position.x, player.position.y, player.size.width, player.size.height);

  ctx.fillStyle = '#0000ff';
  for (let i = 0; i < enemies.length; i += 1) {
    ctx.fillRect(
      enemies[i].position.x,
      enemies[i].position.y,
      enemies[i].size.width,
      enemies[i].size.height,
    );
  }
}

function update() {
  player.update(step);
  fixCollisionsWithBorders(player);

  for (let i = 0; i < enemies.length; i += 1) {
    enemies[i].update(step);
    fixCollisionsWithBorders(enemies[i]);
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
