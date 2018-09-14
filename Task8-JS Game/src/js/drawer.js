import { all as config } from './config';

function Drawer(ctx) {
  this.ctx = ctx;
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
  this.ctx.drawImage(
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
};

Drawer.prototype.drawAll = function draw(player, enemies, bullets, textures, isPaused) {
  this.ctx.fillStyle = '#000000';
  this.ctx.fillRect(0, 0, config.gameWidth, config.gameHeight);
  this.ctx.fillStyle = '#eeeeee';
  this.ctx.fillRect(
    config.gameWidth,
    0,
    config.gameWidth + 100,
    config.gameHeight,
  );

  this.drawTank(player);
  this.drawEnemies(enemies);
  this.drawBullets(bullets);
  this.drawTextures(textures);

  if (isPaused) {
    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.ctx.fillRect(0, 0, config.gameWidth, config.gameHeight);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '40px serif';
    this.ctx.fillText('Pause', (config.gameWidth / 2) - 60, (config.gameHeight / 2) - 20);
  }
};

export default Drawer;
