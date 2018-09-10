function MovementManager() {
  this.objects = [];
  this.types = {
    keyboard: function keyboard(obj) {
      const input = window.input || {};

      if (input.isDown(obj.keys.up) || input.isDown('w')) {
        obj.moveUp();
        return;
      }

      if (input.isDown(obj.keys.right) || input.isDown('d')) {
        obj.moveRight();
        return;
      }

      if (input.isDown(obj.keys.down) || input.isDown('s')) {
        obj.moveDown();
        return;
      }

      if (input.isDown(obj.keys.left) || input.isDown('a')) {
        obj.moveLeft();
      }
    },
    ai: function ai(obj, dt) {
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
  const movableObj = { obj: toObj, moveType: type };

  this.objects.push(movableObj);
};

MovementManager.prototype.update = function update(dt) {
  for (let i = 0; i < this.objects.length; i += 1) {
    this.types[this.objects[i].moveType](this.objects[i].obj, dt);
  }
};

export default MovementManager;
