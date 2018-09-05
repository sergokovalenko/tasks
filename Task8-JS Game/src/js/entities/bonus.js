let position;
let size;
let spriteInfo;
let type;

function Bullet(x, y, width, height, sprite, bonusType = 'live') {
  position.x = x;
  position.y = y;
  size.width = width;
  size.height = height;
  spriteInfo = sprite;
  type = bonusType;
}

Bullet.prototype.affect = function (tank) {
  switch (type) {
    case 'live':
      tank.live += 1;
      break;
    default:
      break;
  }
};
