import { startGameLoop } from "../../game.js";


const startGameScreen = document.getElementById("start-screen");
const startGameButton = document.getElementById("start-button");

export function showStartScreen() {
    // Show the start game screen
    startGameScreen.style.display = "flex";
}

startGameButton.addEventListener("click", () => {
    // Hide the start game screen
    startGameScreen.style.display = "none";

    // Start the game loop
    startGameLoop();
});