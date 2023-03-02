 export { checkCollision };
 export { checkWallCollision };
 import {groundPos} from "../../game.js"

 function checkCollision(obj1, obj2) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radiusSum = obj1.radius + obj2.radius;
  
    if (distance < radiusSum) {
      return true;
    } else {
      return false;
    }
}

function checkWallCollision(bobomb) {
    if (bobomb.x - 5 < groundPos.minX) {
      alert('You hit the left wall!');
      return true;
    }
    if (bobomb.x + 5 > groundPos.maxX) {
      alert('You hit the right wall!');
      return true;
    }
    if (bobomb.y - 5 <groundPos.minY) {
      alert('You hit the top wall!');
      return true;
    }
    if (bobomb.y + 5 > groundPos.maxY) {
      alert('You hit the bottom wall!');
      return true;
    }
    return false;
  }
  
 