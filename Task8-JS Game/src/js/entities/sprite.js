import Entity from './entity';

function Sprite(url, x, y, width, height, frames) {
  Entity.call(this, x, y, width, height);
  this.url = url;
  this.frames = frames;
  this.index = 0;
}

Sprite.prototype.draw = function draw(ctx) {
  ctx.drawImage(
    window.resources.getImg(this.spriteInfo.url),
    this.spriteInfo.position.x,
    this.spriteInfo.position.y,
    this.spriteInfo.size.width,
    this.spriteInfo.size.height,
    this.position.x,
    this.position.y,
    this.size.width,
    this.size.height,
  );
};

export default Sprite;
