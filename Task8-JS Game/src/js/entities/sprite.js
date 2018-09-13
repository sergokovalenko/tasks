import Entity from './entity';

function Sprite(url, x, y, width, height, frames) {
  Entity.call(this, x, y, width, height);
  this.url = url;
  this.frames = frames;
  this.index = 0;
}

Sprite.prototype.draw = function () {
  // realization
};

export default Sprite;
