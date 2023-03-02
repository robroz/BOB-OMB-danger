import {c} from "../../game.js"
import {groundPos} from "../../game.js"
export { mouseX, mouseY };
export { setMousePosition };

let mouseX = 0;
let mouseY = 0;

function setMousePosition(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
}
window.addEventListener("mousemove", setMousePosition);



 class Bobomb {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 20;
    }

    update = () => {
        if (isInPlayingField(mouseX, mouseY)) {
            this.x = mouseX;
            this.y = mouseY;
            
        }
    }

    draw = () => {
        if (isInPlayingField(this.x, this.y)) {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
            c.fillStyle = "#FFF";
            c.fill();
        }
    }
    
}

function isInPlayingField(x, y) {
    return x > groundPos.minX && x < groundPos.maxX && y > groundPos.minY && y < groundPos.maxY
}

export {Bobomb}
