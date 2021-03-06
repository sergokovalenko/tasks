import { gameSettings as config } from './config';

const step = 1 / config.fps;
const mainMessagePositionX = -60;
const infoMessagePositionX = 10;
let resources;

function Drawer(res) {
  const canvas = document.createElement('canvas');
  this.ctx = canvas.getContext('2d');
  this.isPaused = false;
  resources = res;

  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;
  document.getElementById('canvas-wrapper').appendChild(canvas);
}

function pauseMessage(ctx) {
  const context = ctx;
  context.fillStyle = 'rgba(0,0,0,0.5)';
  context.fillRect(0, 0, config.gameWidth, config.gameHeight);
  context.fillStyle = '#ffffff';
  context.font = `${config.fontSizeMessage}px serif`;
  context.fillText('Pause', (config.gameWidth / 2) + mainMessagePositionX, (config.gameHeight / 2) - (config.fontSizeMessage / 2));
}

function gameOverMessage(ctx, score) {
  const context = ctx;
  context.fillStyle = 'rgba(0,0,0,0.5)';
  context.fillRect(0, 0, config.gameWidth, config.gameHeight);
  context.fillStyle = '#ffffff';
  context.font = `${config.fontSizeMessage}px serif`;
  context.fillText('Game Over', (config.gameWidth / 2) + mainMessagePositionX, (config.gameHeight / 2) - (config.fontSizeMessage / 2));
  context.fillText(`Scores: ${score}`, (config.gameWidth / 2) + mainMessagePositionX, (config.gameHeight / 2) + (config.fontSizeMessage / 2));
}

Drawer.prototype.drawBullets = function drawBullets(bullets) {
  this.ctx.fillStyle = '#f0f0f0';
  for (let i = 0; i < bullets.length; i += 1) {
    this.ctx.fillRect(
      bullets[i].position.x,
      bullets[i].position.y,
      bullets[i].size.width,
      bullets[i].size.height,
    );
  }
};

Drawer.prototype.drawEnemies = function drawEnemies(enemies) {
  for (let i = 0; i < enemies.length; i += 1) {
    this.drawTank(enemies[i]);
  }
};

Drawer.prototype.pause = function pause() {
  this.isPaused = !this.isPaused;
};

Drawer.prototype.drawTextures = function drawTextures(textures) {
  for (let i = 0; i < textures.length; i += 1) {
    this.ctx.drawImage(
      resources.getImg(textures[i].spriteInfo.url),
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
};

Drawer.prototype.drawTank = function drawTank(pl) {
  const obj = pl;
  let { x } = obj.spriteInfo.position;
  const { y } = obj.spriteInfo.position;

  switch (pl.direction) {
    case 'left':
      x = pl.spriteInfo.position.x + (pl.spriteInfo.size.width * 2);
      break;
    case 'down':
      x = pl.spriteInfo.position.x + (pl.spriteInfo.size.width * 4);
      break;
    case 'right':
      x = pl.spriteInfo.position.x + (pl.spriteInfo.size.width * 6);
      break;
    default:
      break;
  }

  if (obj.isMoving) {
    obj.spriteInfo.animationTimer -= step;
    if (obj.spriteInfo.animationTimer < step) {
      obj.spriteInfo.currentFrame = (obj.spriteInfo.currentFrame + 1) % obj.spriteInfo.frameCount;
      obj.spriteInfo.animationTimer = obj.spriteInfo.getAnimationTime();
    }
  }

  x += obj.spriteInfo.currentFrame * obj.spriteInfo.size.width;

  this.ctx.drawImage(
    resources.getImg(obj.spriteInfo.url),
    x,
    y + (obj.spriteInfo.size.height * (obj.level - 1)),
    obj.spriteInfo.size.width,
    obj.spriteInfo.size.height,
    obj.position.x,
    obj.position.y,
    obj.size.width,
    obj.size.height,
  );
};

Drawer.prototype.drawBonus = function drawBonus(bonus) {
  const obj = bonus;
  let { x } = obj.spriteInfo.position;

  obj.spriteInfo.animationTimer -= step;
  if (obj.spriteInfo.animationTimer <= step) {
    obj.spriteInfo.currentFrame = (obj.spriteInfo.currentFrame + 1) % obj.spriteInfo.frameCount;
    obj.spriteInfo.animationTimer = obj.spriteInfo.getAnimationTime();
  }

  x += obj.spriteInfo.currentFrame * obj.spriteInfo.size.width;

  this.ctx.drawImage(
    resources.getImg(obj.spriteInfo.url),
    x,
    obj.spriteInfo.position.y,
    obj.spriteInfo.size.width,
    obj.spriteInfo.size.height,
    obj.position.x,
    obj.position.y,
    obj.size.width,
    obj.size.height,
  );
};

Drawer.prototype.drawAll = function draw(
  player,
  enemies,
  bullets,
  textures,
  bonusArr,
  score = 0,
  gameState,
) {
  this.ctx.fillStyle = '#000000';
  this.ctx.fillRect(0, 0, config.gameWidth, config.gameHeight);
  this.ctx.fillStyle = '#efefef';
  this.ctx.fillRect(
    config.gameWidth,
    0,
    config.canvasWidth,
    config.gameHeight,
  );

  this.drawTank(player);
  this.drawEnemies(enemies);
  this.drawBullets(bullets);
  this.drawTextures(textures);

  for (let i = 0; i < bonusArr.length; i += 1) {
    this.drawBonus(bonusArr[i]);
  }

  this.ctx.fillStyle = '#000000';
  this.ctx.font = `${config.fontSizeInfo}px serif`;
  this.ctx.fillText(`Lives: ${player.live}`, config.gameWidth + infoMessagePositionX, (config.gameHeight / 2) - (config.fontSizeInfo / 2));
  this.ctx.fillText(`Scores: ${score}`, config.gameWidth + infoMessagePositionX, (config.gameHeight / 2) + (config.fontSizeInfo / 2));

  switch (gameState) {
    case 'pause':
      pauseMessage(this.ctx);
      break;
    case 'lose':
      gameOverMessage(this.ctx, score);
      break;
    default:
      break;
  }
};

export default Drawer;
