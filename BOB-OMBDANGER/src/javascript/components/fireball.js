import {c} from "../../game.js"
import { mouseX, mouseY } from './bobomb.js';
import { setMousePosition } from './bobomb.js';



window.addEventListener("mousemove", setMousePosition);


export function createFireBall(size, fireBallSpeed, fireBallColor) {
  let radius = size
  let range = 100
  let speed = fireBallSpeed
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
  let marginX = Math.floor(Math.random() * 101) - range;
  let marginY = Math.floor(Math.random() * 101) - range;
  let dx = mouseX + marginX - x;
  let dy = mouseY + marginY - y;
  let length = Math.sqrt(dx * dx + dy * dy);
  dx = dx / length * speed;
  dy = dy / length * speed;
  return new Fireball(x, y, dx, dy,speed, radius, fireBallColor);
}

class Fireball {C
  constructor(x, y, dx, dy, speed, radius, Color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
    this.radius = radius
    this.color = Color
  }
  
  update() {
    this.x += this.dx;
    this.y += this.dy;
  } 

  draw() {
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fill();
  }

  isVisible() {
    return (
      this.x > -this.radius &&
      this.x < canvas.width + this.radius &&
      this.y > -this.radius &&
      this.y < canvas.height + this.radius
    )}
}

