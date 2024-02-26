let score = 0;
let lives = 4;

const shotSound = document.getElementById("shotmp3");
const bgm = document.getElementById("bgm");
const hitSound = document.getElementById("hitmp3");
const startSound = document.getElementById("startmp3");

bgm.volume = 0.3;
bgm.play();

const ninjas = document.querySelectorAll(".ninja");
let noOfNinjas = 0;
ninjas.forEach((ninja) => {
  //for each is slower than for loop
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
  const clickedNinja = e.target; // Get the specific clicked ninja
  clickedNinja.style.display = "none"; // Hide the clicked ninja
  hitSound.play();
  updateScore();
  newNinja();
}

function miss(e) {
  shotSound.volume = 0.1;
  shotSound.play();
  loseLives();
  if (lives === 0) {
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
  ninja.src = `/assets/ninja${Math.ceil(Math.random() * 4)}.gif`;
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
  document.getElementById("menu").style.display = "none"; // hide menu
  bgm.pause();
  //rdy screen
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
        timer.innerHTML = `00:${seconds}`
        console.log(seconds)
        setTimeout(updateTimer, 1000); // Call itself after 1 second
    } else {
      alert(`Game Over! Your score is ${score}. Refresh to try again!`)
    }
  }
  updateTimer();


}