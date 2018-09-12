import WeaponFactory from './../factories/weaponFactory';
import { bulletsSettings } from './../config';

const factory = new WeaponFactory();

function ShootingManager() {
  this.objects = [];
  this.weaponArr = [];
  this.isWeaponAdded = false;
  this.types = {
    bullet(obj) {
      const tank = obj;

      if (tank.obj.bulletTimer < 0) {
        let x = 0;
        let y = 0;
        let [direction] = obj.direction;

        tank.obj.bulletTimer = tank.delay;

        switch (obj.direction) {
          case 'top':
            x = (obj.position.x + (obj.size.width / 2)) - (bulletsSettings.bulletHeight / 2);
            y = obj.position.y - 6;
            break;
          case 'left':
            x = obj.position.x - 6;
            y = (obj.position.y + (obj.size.height / 2)) - (bulletsSettings.bulletWidth / 2);
            break;
          case 'down':
            x = (obj.position.x + (obj.size.width / 2)) - (bulletsSettings.bulletHeight / 2);
            y = (obj.position.y + obj.size.height) + 2;
            break;
          case 'right':
            x = (obj.position.x + obj.size.width) + 2;
            y = (obj.position.y + (obj.size.height / 2)) - (bulletsSettings.bulletWidth / 2);
            break;
          default:
            direction = 'top';
            break;
        }

        const bullet = factory.makeBullet(x, y, direction);

        if (bullet) {
          this.weaponArr.push(bullet);
        }
      }
    },
  };
}

ShootingManager.prototype.update = function update(dt) {
  for (let i = 0; i < this.objects.length; i += 1) {
    this.objects[i].obj.bulletTimer -= dt;
  }
};

ShootingManager.prototype.shoot = function update(obj, weaponIndex) {
  switch (weaponIndex) {
    case 0:
      this.types.bullet(obj);
      break;
    default:
      this.types.bullet(obj);
      break;
  }
};

ShootingManager.prototype.addWeapon = function addWeapon(toObj, weaponType, delay = 1) {
  let movableObj = null;
  const weapon = factory[`make${weaponType}`]();
  weapon.delay = delay;
  console.log(weapon);

  const find = this.objects.find(el => el.obj === toObj);
  console.log(find);

  if (find) {
    find.weaponArr.push(weapon);
  } else {
    movableObj = {
      obj: toObj,
      weaponArr: [weapon],
      delay,
    };

    this.objects.push(movableObj);
  }
};

export default ShootingManager;
