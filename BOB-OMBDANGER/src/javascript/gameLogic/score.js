const score = document.getElementById("score")


export class Score {
    constructor() {
      this.score = 0;
      this.timer = null;
      this.timeSurvived = 0;
    }
  
    startTimer() {
        if (this.score == 0){
            score.textContent = 0
        }
        const startTime = Date.now();
        this.timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        this.timeSurvived = Math.floor(elapsedTime / 1000);
        this.score = this.timeSurvived
        score.textContent = this.score
  
      }, 1000);
    }
    stopTimer() {
        clearInterval(this.timer);
        this.timer = null;
      }

  }