import { createFireBall } from "./javascript/components/fireball.js";
import { Bobomb } from "./javascript/components/bobomb.js";
import { checkCollision } from "./javascript/gameLogic/collision.js";
import { showStartScreen } from "./javascript/views/startscreen.js";
import { showGameOverScreen } from "./javascript/views/gameoverscreen.js";
import { Score } from "./javascript/gameLogic/score.js";
import { fireballControll } from "./javascript/gameLogic/Controllers/controllFireballs.js";

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
  // Calculate the time since the last fireball was spawned
  const currentTime = Date.now() / 1000;
  const deltaTime = currentTime - lastFireballSpawnTime;

  // Spawn a new fireball if enough time has passed
  if (deltaTime >= (1 / fireballControll(score.score).spawnRate)) {
    FireBallList.push(createFireBall(fireballControll(score.score).fireballRadius, fireballControll(score.score).fireballSpeed, fireballControll(score.score).fireballColor ))
    lastFireballSpawnTime = currentTime;
  }

  // Update the bobomb and fireball objects
  bobomb.update();
  FireBallList.forEach((fireBall, index) => {
    fireBall.update();

    // Check for collisions with the bobomb
    if (checkCollision(fireBall, bobomb)) {
      score.stopTimer();
      showGameOverScreen(score.score);
    }

    // Remove fireballs that are no longer visible on the screen
    if (!fireBall.isVisible()) {
      FireBallList.splice(index, 1);
    }
  });

  // Check if the score is high enough to win the game
  // if (score.score == 30) {
  //   score.stopTimer();
  //   showGameOverScreen("success");
  // }
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