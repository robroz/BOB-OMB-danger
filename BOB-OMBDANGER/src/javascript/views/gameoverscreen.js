import { startGameLoop } from "../../game.js";
import {animationId}from "../../game.js";
import { resetGameState }from "../../game.js";


const gameOverScreen = document.getElementById("game-over-screen");
const retryButton = document.getElementById("retry-button");
const scoreDisplay = document.getElementById("final-score")

function showGameOverScreen(score) {
  // Stop the game loop
  cancelAnimationFrame(animationId);
if(score == "success"){
  //show victory screen
  gameOverScreen.style.display = "flex";
  scoreDisplay.textContent = "!!!!cccrrraaaazzzzyyyyy!!!!!!"
}
else{ 
   // Show the game over screen
  gameOverScreen.style.display = "flex";
  score == 1 ? scoreDisplay.textContent = "you survived: "+score+" second cringe?" : scoreDisplay.textContent = "you survived: "+score+" seconds"
  }


}

retryButton.addEventListener("click", () => {
  // Hide the game over screen
  gameOverScreen.style.display = "none";

  // Reset the game state and start the game loop again
  resetGameState();
  startGameLoop();
});

export { showGameOverScreen };