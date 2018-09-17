import Entity from './entity';
import inherit from './../helpers/inheritance';

function Bonus(x, y, width, height, sprite) {
  Entity.call(this, x, y, width, height);
  this.spriteInfo = sprite;
}
(inherit(Bonus, Entity));

Bonus.constructor = Bonus;

export default Bonus;
