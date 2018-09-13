import {
  hasCollisionWithBorderds,
  macroCollision,
} from './../helpers/collisionHelper';

function CollisionManager() {}

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

CollisionManager.prototype.enemyCollisionWithBullet = (bullets, enemies, shootingManager) => {
  for (let i = 0; i < bullets.length; i += 1) {
    for (let j = 0; j < enemies.length; j += 1) {
      if (macroCollision(bullets[i], enemies[j])) {
        bullets.splice(i, 1);
        if (shootingManager) {
          shootingManager.clearWeapons(enemies[j]);
        }
        enemies.splice(j, 1);
        i -= 1;
        break;
      }
    }
  }
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
      return;
    }

    if (collisionResult === 'right') {
      entity.position.x -= entity.velocity;
      return;
    }

    if (collisionResult === 'bottom') {
      entity.position.y -= entity.velocity;
      return;
    }

    if (collisionResult === 'left') {
      entity.position.x += entity.velocity;
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

CollisionManager.prototype.enemyCollisionWithObjects = function col(obj1, obj2) {
  if (macroCollision(obj1, obj2)) {
    collisionAction(obj1);

    if (obj1.changeDirection) {
      obj1.changeDirection();
    }
  }
};


export default CollisionManager;
