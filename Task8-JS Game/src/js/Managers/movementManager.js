import WeaponFactory from './../factories/weaponFactory';

const factory = new WeaponFactory();

function MovementManager(shootingManager) {
  this.objects = [];
  this.shootingManager = shootingManager;
  this.types = {
    keyboard(obj, dt) {
      const input = window.input || {};
      const entity = obj;

      entity.bulletTimer -= dt;

      if (input.isDown(obj.keys.up)) {
        obj.moveUp();
        return;
      }

      if (input.isDown(obj.keys.right)) {
        obj.moveRight();
        return;
      }

      if (input.isDown(obj.keys.down)) {
        obj.moveDown();
        return;
      }

      if (input.isDown(obj.keys.left)) {
        obj.moveLeft();
        return;
      }

      if (shootingManager && obj.canShoot && input.isDown(obj.keys.shoot[0])) {
        shootingManager.shoot(obj);
      }
    },
    ai(obj, dt) {
      const entity = obj;

      switch (entity.direction) {
        case 'top':
          entity.moveUp();
          break;
        case 'right':
          entity.moveRight();
          break;
        case 'down':
          entity.moveDown();
          break;
        case 'left':
          entity.moveLeft();
          break;
        default:
          break;
      }

      entity.moveTimer -= dt;

      if (entity.moveTimer < dt) {
        entity.changeDirection();
      }
    },
  };
}

MovementManager.prototype.addMovement = function addMovement(toObj, type) {
  const movableObj = {
    obj: toObj,
    moveType: type,
    weaponArr: [],
  };

  this.objects.push(movableObj);
};

MovementManager.prototype.update = function update(dt) {
  for (let i = 0; i < this.objects.length; i += 1) {
    this.types[this.objects[i].moveType](this.objects[i].obj, dt);
  }
};

MovementManager.prototype.addWeapon = function addWeapon(toObj, weaponType, delay = 1) {
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
    };

    this.objects.push(movableObj);
  }
};

export default MovementManager;
