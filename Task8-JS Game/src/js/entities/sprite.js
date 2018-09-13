import Entity from './entity';

function Sprite(url, x, y, width, height, frameCount) {
  Entity.call(this, x, y, width, height);
  this.url = url;
  this.frameCount = frameCount;
  this.index = 0;
  this.animationTimer = 1;
}

export default Sprite;
