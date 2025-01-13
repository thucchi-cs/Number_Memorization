const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const boxSize = windowWidth * 0.05;

const startWindow = document.querySelector(".start");
const endWindow = document.querySelector(".end");
const startButton = document.querySelectorAll(".begin");
const score = document.querySelector(".score");
const newSession = document.querySelector(".new");
let boxes = [];
let clicked = [];
let tries = 0;
let success = 0;

class Num {
    constructor(n) {
        this.num = n;
        this.createElement();
        boxes.push(this);
        this.click();
    }
    
    createElement() {
        this.box = document.createElement("div");
        this.box.classList.add("box");
        this.box.style.width = boxSize + "px";
        this.box.style.height = boxSize + "px";
        this.box.innerHTML = this.num;
        this.box.style.fontSize = (boxSize * 0.8) + "px";
        document.body.appendChild(this.box)
        this.randomizePos();
    }
    
    randomizePos() {
        do {
            this.x = Math.round(Math.random() * (windowWidth - boxSize));
            this.box.style.left = this.x + "px";
            this.y = Math.round(Math.random() * (windowHeight - boxSize));
            this.box.style.top = this.y + "px";
        } while (!this.checkPosValidity());
    }

    checkPosValidity() {
        for(let i = 0; i < boxes.length; i++) {
            let dist = Math.pow(Math.pow(this.x - boxes[i].x, 2) + Math.pow(this.y - boxes[i].y, 2), 0.5);
            if (dist < boxSize * 2) {
                return false;
            }
        }
        return true;
    }

    click() {
        this.box.addEventListener("click", () => {
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].box.innerHTML = '';
                boxes[i].box.style.backgroundColor = "lightblue";
            }

            clicked.push(this);
            if (!checkOrder()) {
                for (let i = 0; i < boxes.length; i++) {
                    boxes[i].box.innerHTML = '';
                    boxes[i].box.style.backgroundColor = "red";
                }
            } else {
                this.box.style.display = "none";
            }

        })
    }
}

function checkOrder() {
    let last = clicked.length - 1;
    if (last + 1 === boxes.length) {
        startWindow.style.marginTop = "10vh";
        endWindow.style.marginTop = "10vh";
        success++;
        score.innerHTML = success + '/' + tries;
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].box.remove()
        }
        boxes = [];
        clicked = [];
        return true;
    }
    if (clicked[last].num != boxes[last].num) {
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "#000435"}, 400);

        startWindow.style.marginTop = "10vh";
        endWindow.style.marginTop = "10vh";
        score.innerHTML = success + '/' + tries
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].box.remove()
        }
        boxes = [];
        clicked = [];
        return false;
    }
    return true;
}

for (let i = 0; i < startButton.length; i++) {
    startButton[i].addEventListener("click", () => {
        startWindow.style.marginTop = "-100vh";
        endWindow.style.marginTop = "-100vh"
        console.log('hi');
        setTimeout(() => {
            for (let i = 0; i < 9; i++) {
                new Num(i + 1);
            }
        }, 500);
        console.log('hello')
        tries++;
    })
}

newSession.addEventListener("click", () => {
    tries = 0;
    success = 0;
    endWindow.style.marginTop = "-100vh";
})

document.body.style.backgroundColor = "#000435";