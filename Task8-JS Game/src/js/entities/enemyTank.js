import Tank from './tank';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Enemy(x, y, width, height, sprite, speed = 1, keys, dir = 'down') {
  Tank.call(this, x, y, width, height, sprite, speed, keys, dir);
  this.moveTimer = 1;
  this.shootTimer = getRandomInt(2, 5);
}

(function inherit(C, Parent) {
  const F = function () {};
  const Child = C;
  F.prototype = Parent.prototype;
  Child.prototype = new F();
}(Enemy, Tank));

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

Enemy.prototype.update = function update() {

};

Enemy.prototype.changeDirection = function changeDirection() {
  this.moveTimer = getRandomInt(1, 5);
  this.direction = getRandomDirection();
};

export default Enemy;
