import Entity from './entity';

function Sprite(url, x, y, width, height, frameCount = 0, animationTime = 1 / 10) {
  Entity.call(this, x, y, width, height);
  this.url = url;
  this.frameCount = frameCount;
  this.animationTimer = animationTime;
  this.currentFrame = 0;
  const timeForAnimation = animationTime;
  this.getAnimationTime = () => timeForAnimation;
}

Sprite.constructor = Sprite;

export default Sprite;
