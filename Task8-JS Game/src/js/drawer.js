import { gameSettings as config } from './config';

const step = 1 / config.fps;

function Drawer() {
  const canvas = document.createElement('canvas');
  this.ctx = canvas.getContext('2d');
  this.isPaused = false;

  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;
  document.getElementById('canvas-wrapper').appendChild(canvas);
}

function pauseMessage(ctx) {
  const context = ctx;
  context.fillStyle = 'rgba(0,0,0,0.5)';
  context.fillRect(0, 0, config.gameWidth, config.gameHeight);
  context.fillStyle = '#ffffff';
  context.font = '40px serif';
  context.fillText('Pause', (config.gameWidth / 2) - 60, (config.gameHeight / 2) - 20);
}

function gameOverMessage(ctx, score) {
  const context = ctx;
  context.fillStyle = 'rgba(0,0,0,0.5)';
  context.fillRect(0, 0, config.gameWidth, config.gameHeight);
  context.fillStyle = '#ffffff';
  context.font = '40px serif';
  context.fillText('Game Over', (config.gameWidth / 2) - 60, (config.gameHeight / 2) - 20);
  context.fillText(`Scores: ${score}`, (config.gameWidth / 2) - 60, (config.gameHeight / 2) + 20);
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
};

Drawer.prototype.drawTank = function drowTank(pl) {
  const obj = pl;
  let { x } = obj.spriteInfo.position;
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

  if (obj.isMoving) {
    obj.spriteInfo.animationTimer -= step;
    if (obj.spriteInfo.animationTimer < step) {
      obj.spriteInfo.currentFrame = (obj.spriteInfo.currentFrame + 1) % obj.spriteInfo.frameCount;
      obj.spriteInfo.animationTimer = obj.spriteInfo.getAnimationTime();
    }
  }

  x += obj.spriteInfo.currentFrame * obj.spriteInfo.size.width;

  this.ctx.drawImage(
    window.resources.getImg(obj.spriteInfo.url),
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

Drawer.prototype.drawAll = function draw(player, enemies, bullets, textures, score = 0, gameState) {
  this.ctx.fillStyle = '#000000';
  this.ctx.fillRect(0, 0, config.gameWidth, config.gameHeight);
  this.ctx.fillStyle = '#efefef';
  this.ctx.fillRect(
    config.gameWidth,
    0,
    config.gameWidth + 200,
    config.gameHeight,
  );

  this.drawTank(player);
  this.drawEnemies(enemies);
  this.drawBullets(bullets);
  this.drawTextures(textures);

  this.ctx.fillStyle = '#000000';
  this.ctx.font = '22px serif';
  this.ctx.fillText(`Lives: ${player.live}`, config.gameWidth + 10, (config.gameHeight / 2) - 11);
  this.ctx.fillText(`Scores: ${score}`, config.gameWidth + 10, (config.gameHeight / 2) + 11);

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

  if (this.isPaused) {
    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.ctx.fillRect(0, 0, config.gameWidth, config.gameHeight);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '40px serif';
    this.ctx.fillText('Pause', (config.gameWidth / 2) - 60, (config.gameHeight / 2) - 20);
  }
};

export default Drawer;
