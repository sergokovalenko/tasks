function Wall(pos, size, sprite, isDestr = true, hasColl = true, hasCollWithBul = true) {
  this.pos = pos;
  this.size = size;
  this.sprite = sprite;
  this.isDestr = isDestr;
  this.hasColl = hasColl;
  this.hasCollWithBul = hasCollWithBul;
}
