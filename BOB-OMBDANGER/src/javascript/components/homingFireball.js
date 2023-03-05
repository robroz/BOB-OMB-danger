import { Fireball } from "./fireball.js";
import { mouseX, mouseY } from './bobomb.js';
import { setMousePosition } from './bobomb.js';

window.addEventListener("mousemove", setMousePosition);
 

export function createHomingFireball(size, fireBallSpeed, fireBallColor, homingTime, homingSpeed) {
    let radius = size;
    let speed = fireBallSpeed;
    let side = Math.floor(Math.random() * 4);
    let x, y;
    switch (side) {
      case 0:
        x = 0;
        y = Math.floor(Math.random() * canvas.height);
        break;
      case 1:
        x = canvas.width;
        y = Math.floor(Math.random() * canvas.height);
        break;
      case 2:
        x = Math.floor(Math.random() * canvas.width);
        y = 0;
        break;
      case 3:
        x = Math.floor(Math.random() * canvas.width);
        y = canvas.height;
        break;
    }
  
    let dx = mouseX - x;
    let dy = mouseY - y;
    let length = Math.sqrt(dx * dx + dy * dy);
    dx = dx / length * speed;
    dy = dy / length * speed;
  
    return new HomingFireball(x, y, dx, dy, speed, radius, fireBallColor, homingTime, homingSpeed);
  }


export class HomingFireball extends Fireball {
    constructor(x, y, dx, dy, speed, radius, color, homingTime, homingSpeed) {
        super(x, y, dx, dy, speed, radius, color);
        this.homingTime = homingTime; // add new property for homing time
        this.homingSpeed = homingSpeed; // set new property for homing speed
      }
    
      
    update() {
      let homingSpeed = this.homingSpeed;
      let dx = mouseX - this.x;
      let dy = mouseY - this.y;
      let length = Math.sqrt(dx * dx + dy * dy);
      this.dx += (dx / length) * homingSpeed;
      this.dy += (dy / length) * homingSpeed;
      let speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
      this.dx = (this.dx / speed) * this.speed;
      this.dy = (this.dy / speed) * this.speed;
      this.x += this.dx;
      this.y += this.dy;
    }
  }

