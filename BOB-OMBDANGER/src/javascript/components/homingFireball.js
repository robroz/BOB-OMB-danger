import { Fireball } from "./fireball.js";
import { mouseX, mouseY } from './bobomb.js';
import { setMousePosition } from './bobomb.js';
import {c} from "../../game.js"

window.addEventListener("mousemove", setMousePosition);
 

export function createHomingFireball(size, fireBallSpeed, fireBallColor, homingTime, homingSpeed, blastradius, explosionDuration) {
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
  
    return new HomingFireball(x, y, dx, dy, speed, radius, fireBallColor, homingTime, homingSpeed, blastradius, explosionDuration);
  }


  export class HomingFireball extends Fireball {
    constructor(x, y, dx, dy, speed, radius, color, homingTime, homingSpeed,blastradius, explosionDuration) {
      super(x, y, dx, dy, speed, radius, color);
      this.homingTime = homingTime;
      this.homingSpeed = homingSpeed;
      this.blastradius = blastradius
      this.explosionDuration = explosionDuration
      this.isExploding = false; // add new property for explosion animation
      this.explosionStartTime = null; // add new property to track explosion start time
      this.startTime = Date.now();
    }
  
    update() {
      if (!this.isExploding) {
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
      
      const currentTime = Date.now();
      const elapsedTime = (currentTime - this.startTime) / 1000; // convert to seconds
      
      if (elapsedTime > this.homingTime) {
        if (!this.isExploding) {
          this.isExploding = true;
          this.explosionStartTime = currentTime;
          // Stop updating position during explosion
          this.dx = 0;
          this.dy = 0;
        }
        if (this.isExploding) {
          const explosionDuration = this.explosionDuration; // adjust duration of explosion as needed
          const timeSinceExplosionStart = (currentTime - this.explosionStartTime) / 1000; // convert to seconds
          if (timeSinceExplosionStart > explosionDuration) {
            this.isExploding = false;
            this.lifeTime = false;
          } else {
            this.drawExplosion();
          }
        }
      }
    }
  
    drawExplosion() {
      const currentTime = Date.now();
      const timeSinceExplosionStart = (currentTime - this.explosionStartTime) / 1000; // convert to seconds
      const explosionDuration = this.explosionDuration; // adjust duration of explosion as needed
      const progress = Math.min(timeSinceExplosionStart / explosionDuration, 1); // ensure progress is between 0 and 1
      
      // Define the size and color of the explosion
      const maxRadius = this.blastradius;
      const minRadius = 20;
      this.radius = minRadius + (maxRadius - minRadius) * progress;
      const red = Math.floor(255 * (1 - progress));
      const green = Math.floor(0 * progress);
      const blue = Math.floor(0 * progress);
      this.color = `rgba(${red}, ${green}, ${blue})`;
    
      // Draw the explosion using the canvas API
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      c.fillStyle = this.color;
      c.fill();
    }
  }


    
  

