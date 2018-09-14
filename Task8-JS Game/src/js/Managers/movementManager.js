function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function MovementManager(shootingManager) {
  this.objects = [];
  this.shootingManager = shootingManager;
  this.types = {
    keyboard(obj, dt) {
      const input = window.input || {};
      const entity = obj;

      entity.bulletTimer -= dt;

      if (input.isDown(obj.keys.up)) {
        entity.isMoving = true;
        entity.moveUp();
        return;
      }

      if (input.isDown(obj.keys.right)) {
        entity.isMoving = true;
        obj.moveRight();
        return;
      }

      if (input.isDown(obj.keys.down)) {
        entity.isMoving = true;
        entity.moveDown();
        return;
      }

      if (input.isDown(obj.keys.left)) {
        entity.isMoving = true;
        entity.moveLeft();
        return;
      }

      if (shootingManager && obj.canShoot && input.isDown(obj.keys.shoot[0])) {
        shootingManager.shoot(obj);
      }

      entity.isMoving = false;
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
      entity.shootTimer -= dt;

      if (entity.moveTimer < dt) {
        entity.changeDirection();
      }

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

MovementManager.prototype.update = function update(dt) {
  for (let i = 0; i < this.objects.length; i += 1) {
    this.types[this.objects[i].moveType](this.objects[i].obj, dt);
  }
};

export default MovementManager;
