const state= {
    view: {
        square:document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        timerId : null,
        conutDownTimerId: setInterval(countDown, 1000),
        gameVelocity : 1000,
        hitPosition : 0,
        result : 0,
        currentTime : 60,
    }
};

function playSound(){
    let audio = new Audio("./src/sounds/point.mp3");
    audio.volume = 0.5;
    audio.play();
};

function countDown(){
    state.values.currentTime --;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.values.conutDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over!! O seu resultado foi: " +state.values.result);
    };
};

function randomSquare(){
    state.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, 1000)
};

function addListenerHitBox(){
    state.view.square.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result ++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    });
};



function initialize() {
    moveEnemy();
    addListenerHitBox();
};

initialize();
