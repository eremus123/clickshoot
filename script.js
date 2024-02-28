let score = 0;
let lives = 3;
let highScore = localStorage.getItem('highScore') || 0; 
let gameIsOver = false;


const shotSound = document.getElementById("shotmp3");
const bgm = document.getElementById("bgm");
const hitSound = document.getElementById("hitmp3");
const startSound = document.getElementById("startmp3");
const thankSound = document.getElementById("thanksmp3");
const gameoverSound = document.getElementById("gameovermp3");

bgm.volume = 0.3;
bgm.play();

const ninjas = document.querySelectorAll(".ninja");
let noOfNinjas = 0;
ninjas.forEach((ninja) => {
  noOfNinjas++;
  const animationId = "ninja" + noOfNinjas;
  const keyframes = `
      0% {
        left: ${randomizeAnimation(-20, -5)}%;
        bottom: ${randomizeAnimation(19, 100)}%;
      }
      100% {
        left: ${randomizeAnimation(110, 150)}%;
        bottom: ${randomizeAnimation(19, 100)}%;
      }
    `;
  const style = document.createElement("style");
  style.innerHTML = `@keyframes ${animationId} { ${keyframes} }`;
  document.body.appendChild(style);

  ninja.style.animationName = animationId;
  ninja.style.animationDuration = randomizeAnimation(7000, 14000) + "ms";
  ninja.style.animationIterationCount = "infinite";
  ninja.addEventListener("click", shoot);
});

function randomizeAnimation(min, max) {
  return Math.random() * (max - min) + min;
}

function shoot(e) {
  const clickedNinja = e.target;
  clickedNinja.style.display = "none"
  hitSound.play();
  updateScore();
  newNinja();
}

function miss(e) {
  if (gameIsOver) return; // Don't proceed if the game is already over
  shotSound.volume = 0.1;
  shotSound.play();
  loseLives();

  if (lives === 0) {
    gameIsOver = true; // Set the game over flag
    alert(`Game Over! Your score is ${score}. Refresh to try again!`);
  }
}

function updateScore() {
  score++;
  document.getElementById("score").innerHTML = `Current Score: ${score}`;
}

function loseLives() {
  lives--;
  document.getElementById("lives").innerHTML = `Current Lives: ${lives}`;
}

function newNinja() {
  const ninja = document.createElement("img");
  ninja.classList.add("ninja");
  ninja.src = `./assets/ninja${Math.ceil(Math.random() * 4)}.gif`;
  noOfNinjas++;
  const animationId = "ninja" + noOfNinjas;
  const keyframes = `
    0% {
      left: ${randomizeAnimation(-20, -5)}%;
      bottom: ${randomizeAnimation(19, 100)}%;
    }
    100% {
      left: ${randomizeAnimation(105, 130)}%;
      bottom: ${randomizeAnimation(19, 100)}%;
    }
  `;

  const style = document.createElement("style");
  style.innerHTML = `@keyframes ${animationId} { ${keyframes} }`;
  document.body.appendChild(style);

  ninja.style.animationName = animationId;
  ninja.style.animationDuration = randomizeAnimation(7000, 16000) + "ms";
  ninja.style.animationIterationCount = "infinite";
  document.body.appendChild(ninja);
  ninja.addEventListener("click", shoot);
}

function start() {
  document.getElementById("menu").style.display = "none";
  bgm.pause();

  ninjas.forEach((ninja) => {
    ninja.style.display = "none";
  });

  document.getElementById("ready").style.display = "block";
  startSound.play();

  setTimeout(() => {
    bgm.play();
    document.getElementById("ready").style.display = "none";
    ninjas.forEach((ninja) => {
      ninja.style.display = "block";
    });
    startTimer(30);
  }, 2500);

  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("ninja")) {
      miss(e);
    }
  });
}


function startTimer(seconds){
  const timer = document.getElementById('timer');
  timer.style.display='block';
  function updateTimer() {
    if (seconds > 0) {
        seconds--;
        if (seconds>9){
          timer.innerHTML = `00:${seconds}`;
        } else timer.innerHTML = `00:0${seconds}`
        setTimeout(updateTimer, 1000);
    } else {
      gameOver();
    }
  }
  updateTimer();
}

function gameOver(){
  bgm.pause();
  gameoverSound.play();
  thankSound.volume=0.3;
  thankSound.play();
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    alert(`Thank you Brave Samurai! You defeated ${score} ninjas and saved the village! \nYou are our strongest Samurai ever! Help us save another village?`);
    location.reload();
  };
  alert(`Thank you Brave Samurai! You defeated ${score} ninjas and saved the village! \nOur strongest Samurai defeated ${highScore}. Try beating him?`);
  location.reload();
}