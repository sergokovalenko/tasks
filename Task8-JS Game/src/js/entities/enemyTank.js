import Tank from './tank';

function Enemy(x, y, width, height, sprite, speed = 1, keys, dir = 'down') {
  Tank.apply(this, [x, y, width, height, sprite, speed, keys, dir]);
  this.moveTimer = 1;
}

(function inherit(C, Parent) {
  const F = function () {};
  const Child = C;
  F.prototype = Parent.prototype;
  Child.prototype = new F();
}(Enemy, Tank));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomDirection() {
  let direction;
  const number = getRandomInt(0, 4);

  switch (number) {
    case 0:
      direction = 'top';
      break;
    case 1:
      direction = 'right';
      break;
    case 2:
      direction = 'down';
      break;
    case 3:
      direction = 'left';
      break;
    default:
      direction = 'top';
      break;
  }

  return direction;
}

Enemy.prototype.update = function update(dt) {
  switch (this.direction) {
    case 'top':
      this.position.y -= this.velocity;
      break;
    case 'right':
      this.position.x += this.velocity;
      break;
    case 'down':
      this.position.y += this.velocity;
      break;
    case 'left':
      this.position.x -= this.velocity;
      break;
    default:
      break;
  }

  this.moveTimer -= dt;

  if (this.moveTimer < dt) {
    this.moveTimer = 2;
    this.direction = getRandomDirection();
  }
};

Enemy.prototype.changeDirection = function changeDirection() {
  this.moveTimer = 2;
  this.direction = getRandomDirection();
};

export default Enemy;
