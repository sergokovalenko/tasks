import {
  hasCollisionWithBorderds,
  macroCollision,
} from './../helpers/collisionHelper';

function CollisionManager() { }

CollisionManager.prototype.bulletCollisionsWithBorders = function col(bullets) {
  for (let i = 0; i < bullets.length; i += 1) {
    if (hasCollisionWithBorderds(bullets[i])) {
      bullets.splice(i, 1);
      i -= 1;
    }
  }
};

CollisionManager.prototype.wallCollisionsWithBullets = function col(walls, bullets) {
  for (let i = 0; i < walls.length; i += 1) {
    if (walls[i].hasCollWithBul) {
      for (let j = 0; j < bullets.length; j += 1) {
        if (macroCollision(walls[i], bullets[j])) {
          bullets.splice(j, 1);
          j -= 1;
          if (walls[i].isDestr) {
            walls.splice(i, 1);
            i -= 1;
            break;
          }
        }
      }
    }
  }
};

CollisionManager.prototype.enemyCollisionWithBullet = (bullets, enemies, shootingManager, move) => {
  let score = 0;

  for (let i = 0; i < bullets.length; i += 1) {
    for (let j = 0; j < enemies.length; j += 1) {
      if (macroCollision(bullets[i], enemies[j])) {
        bullets.splice(i, 1);
        if (shootingManager) {
          shootingManager.clearWeapons(enemies[j]);
        }
        if (move) {
          move.removeMovement(enemies[j]);
        }
        enemies.splice(j, 1);
        i -= 1;
        score = 100;
        break;
      }
    }
  }

  return score;
};

CollisionManager.prototype.tankCollisionWithBullet = function col(obj, bullets) {
  const object = obj;

  for (let i = 0; i < bullets.length; i += 1) {
    if (macroCollision(obj, bullets[i])) {
      object.live -= 1;
      bullets.splice(i, 1);
      return;
    }
  }
};

CollisionManager.prototype.fixCollisionsWithBorders = function col(obj) {
  const collisionResult = hasCollisionWithBorderds(obj);
  const entity = obj;

  if (collisionResult) {
    if (collisionResult === 'top') {
      entity.position.y += entity.velocity;
    }

    if (collisionResult === 'right') {
      entity.position.x -= entity.velocity;
    }

    if (collisionResult === 'bottom') {
      entity.position.y -= entity.velocity;
    }

    if (collisionResult === 'left') {
      entity.position.x += entity.velocity;
    }

    if (entity.changeDirection) {
      entity.changeDirection();
    }
  }
};

function collisionAction(obj) {
  const collisedObj = obj;

  switch (obj.direction) {
    case 'top':
      collisedObj.position.y += collisedObj.velocity;
      break;
    case 'right':
      collisedObj.position.x -= collisedObj.velocity;
      break;
    case 'down':
      collisedObj.position.y -= collisedObj.velocity;
      break;
    case 'left':
      collisedObj.position.x += collisedObj.velocity;
      break;
    default:
      break;
  }
}

CollisionManager.prototype.playerCollisinWithObjects = function col(obj1, obj2) {
  if (macroCollision(obj1, obj2)) {
    collisionAction(obj1);
  }
};

CollisionManager.prototype.playerCollisinWithEnimies = function col(obj1, objArr) {
  objArr.forEach((obj) => {
    if (obj1 !== obj.obj) {
      this.playerCollisinWithObjects(obj1, obj.obj);
    }
  });
};

CollisionManager.prototype.playerCollisinWithBonus = function col(player, bonusArr) {
  bonusArr.forEach((bonus, i) => {
    if (macroCollision(player, bonus)) {
      bonus.affect(player);
      bonusArr.splice(i, 1);
    }
  });
};

CollisionManager.prototype.enemyCollisinWithBonus = function col(enemyArr, bonusArr) {
  enemyArr.forEach((enemy) => {
    bonusArr.forEach((bonus, i) => {
      if (macroCollision(enemy, bonus)) {
        bonus.affect(enemy);
        bonusArr.splice(i, 1);
      }
    });
  });
};

CollisionManager.prototype.enemyCollisionWithObjects = function col(obj1, obj2) {
  if (macroCollision(obj1, obj2)) {
    collisionAction(obj1);

    if (obj1.changeDirection) {
      obj1.changeDirection();
    }
  }
};

CollisionManager.prototype.enemyCollisinWithTanks = function col(obj1, objArr) {
  objArr.forEach((obj) => {
    if (obj1 !== obj.obj) {
      this.enemyCollisionWithObjects(obj1, obj.obj);
    }
  });
};

export default CollisionManager;
