import Entity from './entity';

function Bonus(x, y, width, height, sprite) {
  Entity.call(this, x, y, width, height);
  this.spriteInfo = sprite;
}

export default Bonus;
