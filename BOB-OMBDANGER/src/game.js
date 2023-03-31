import { createFireBall } from "./javascript/components/fireball.js";
import { Bobomb } from "./javascript/components/bobomb.js";
import { checkCollision } from "./javascript/gameLogic/collision.js";
import { showStartScreen } from "./javascript/views/startscreen.js";
import { showGameOverScreen } from "./javascript/views/gameoverscreen.js";
import { Score } from "./javascript/gameLogic/score.js";
import { fireballControll } from "./javascript/gameLogic/Controllers/controllFireballs.js";
import { createHomingFireball } from "./javascript/components/homingFireball.js";
import { HomingFireball } from "./javascript/components/homingFireball.js";
import { homingFireballControll } from "./javascript/gameLogic/Controllers/controllHomingFireballs.js";

export let animationId;

// Get the canvas element and its 2D context
const canvas = document.querySelector("#canvas");
export const c = canvas.getContext("2d");

// Set the canvas size to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the ground position (the area where the bobomb can move)
export const groundPos = {
  minX: canvas.width / 2 - 900 / 2,
  minY: canvas.height / 2 - 700 / 2,
  maxX: canvas.width - (canvas.width / 2 - 900 / 2),
  maxY: canvas.height - (canvas.height / 2 - 700 / 2),
};

// Create the bobomb, fireball list, and score objects
const bobomb = new Bobomb();
const FireBallList = [];
let lastFireballSpawnTime = 0;
let lastHomingFireballSpawnTime = 0;
let score = new Score();

// Reset the game state (used when starting a new game)
export function resetGameState() {
  bobomb.x = canvas.width / 2;
  bobomb.y = canvas.height / 2;
  FireBallList.length = 0;
  score = new Score();
  score.stopTimer
}

// Start the game loop
export function startGameLoop() {
  // Start the score timer
  score.startTimer();

  // Define the game loop function
  function animate() { 
    animationId = window.requestAnimationFrame(animate);
    update();
    draw();
  }

  // Start the game loop
  animate();
}


// Update the game state
function update() {
  const currentTime = Date.now() / 1000;
  const deltaTime = currentTime - lastFireballSpawnTime;
  const fireball = fireballControll(score.score);
  const homingFireball = homingFireballControll(score.score);

  // Spawn a new fireball if enough time has passed
  if (deltaTime >= 1 / fireball.spawnRate) {
    if (fireball.customEffects == "randomColor") {
      let randomColor =
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
      FireBallList.push(
        createFireBall(fireball.Radius, fireball.Speed, randomColor)
      );
    } else {
      FireBallList.push(
        createFireBall(fireball.Radius, fireball.Speed, fireball.Color)
      );
    }
    lastFireballSpawnTime = currentTime;
  }

  // Spawn a new homing fireball if enough time has passed
  const homingDeltaTime = currentTime - lastHomingFireballSpawnTime;
  if (homingDeltaTime >= 1 / homingFireball.spawnRate) {
    FireBallList.push(
      createHomingFireball(
        homingFireball.Radius,
        homingFireball.Speed,
        homingFireball.Color,
        homingFireball.homingTime,
        homingFireball.homingSpeed,
        homingFireball.blastradius,
        homingFireball.explosionDuration
      )
    );
    lastHomingFireballSpawnTime = currentTime;
  }

  bobomb.update();

  for (let i = 0; i < FireBallList.length; i++) {
    const currentFireball = FireBallList[i];
    currentFireball.update();
    if (currentFireball instanceof HomingFireball) {
      currentFireball.update();
    }
    if (!currentFireball.isVisible() || currentFireball.lifeTime == false) {
      FireBallList.splice(i, 1);
    }
    if (checkCollision(currentFireball, bobomb)) {
      score.stopTimer();
      showGameOverScreen(score.score);
    }
  } 
  // Check if the score is high enough to win the game
 if (score.score == 30) {
    score.stopTimer();
    showGameOverScreen("success");
  }
}


// Draw the game objects
function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "#ff5145";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "#303030";
  c.fillRect(groundPos.minX, groundPos.minY, 900, 700);
  bobomb.draw();
  FireBallList.forEach((fireBall) => {
    fireBall.draw();
  });
}