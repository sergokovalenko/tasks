import Entity from './entity';

function Sprite(url, x, y, width, height, frameCount = 0, animationTime = 1 / 24) {
  Entity.call(this, x, y, width, height);
  this.url = url;
  this.frameCount = frameCount;
  this.index = 0;
  this.animationTimer = 1 / 24;
  this.currentFrame = 0;
  const timeForAnimation = animationTime;
  this.getAnimationTime = function anim() { return timeForAnimation; };
}

export default Sprite;
