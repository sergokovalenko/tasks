function Sprite(url, pos, size, frames, dir, once) {
  this.pos = pos;
  this.size = size;
  this.frames = frames;
  this.index = 0;
  this.url = url;
  this.dir = dir || 'horizontal';
  this.once = once;
}

Sprite.prototype.draw = function () {
  // realization
};
