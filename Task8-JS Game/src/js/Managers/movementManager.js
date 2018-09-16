import input from './../helpers/keyHandler';
import getRandomInt from './../helpers/randomizer';

function MovementManager(shootingManager, collisionManager) {
  this.collisionManager = collisionManager;
  this.objects = [];
  this.shootingManager = shootingManager;
  this.types = {
    keyboard: (obj, dt) => {
      const entity = obj;
      let isKeyDown = false;

      entity.isMoving = false;
      entity.bulletTimer -= dt;

      if (entity.isUpgraded) {
        let delay = 1;
        switch (entity.level) {
          case 2:
            delay -= 0.1;
            break;
          case 3:
            delay -= 0.2;
            break;
          case 4:
            delay -= 0.3;
            break;
          default:
            break;
        }
        entity.isUpgraded = false;
        shootingManager.clearWeapons(entity);
        shootingManager.addWeapon(entity, 'Bullet', delay);
      }

      if (input.isDown(obj.keys.up) && !isKeyDown) {
        isKeyDown = true;
        entity.isMoving = true;
        entity.moveUp();
      }

      if (input.isDown(obj.keys.right) && !isKeyDown) {
        isKeyDown = true;
        entity.isMoving = true;
        obj.moveRight();
      }

      if (input.isDown(obj.keys.down) && !isKeyDown) {
        isKeyDown = true;
        entity.isMoving = true;
        entity.moveDown();
      }

      if (input.isDown(obj.keys.left) && !isKeyDown) {
        isKeyDown = true;
        entity.isMoving = true;
        entity.moveLeft();
      }

      this.collisionManager.playerCollisinWithEnimies(entity, this.objects);
      this.collisionManager.fixCollisionsWithBorders(entity);

      if (shootingManager && obj.canShoot && input.isDown(obj.keys.shoot[0])) {
        shootingManager.shoot(obj);
      }
    },
    ai: (obj, dt) => {
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
      entity.shootTimer -= dt;

      if (entity.moveTimer < dt) {
        entity.changeDirection();
      }

      this.collisionManager.enemyCollisinWithTanks(entity, this.objects);
      this.collisionManager.fixCollisionsWithBorders(entity);

      if (shootingManager && entity.canShoot && entity.shootTimer < dt) {
        entity.shootTimer = getRandomInt(2, 5);
        shootingManager.shoot(entity);
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

MovementManager.prototype.reset = function reset() {
  this.objects = [];
};

MovementManager.prototype.removeMovement = function removeMovement(obj) {
  const find = this.objects.findIndex(el => el.obj === obj);

  if (find !== -1) {
    this.objects.splice(find, 1);
  }
};

MovementManager.prototype.update = function update(dt) {
  for (let i = 0; i < this.objects.length; i += 1) {
    this.types[this.objects[i].moveType](this.objects[i].obj, dt);
  }
};

export default MovementManager;
