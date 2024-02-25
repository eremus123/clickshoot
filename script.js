let score = 0;
let lives = 3;

const shotSound = document.getElementById("shotmp3");
const bgm = document.getElementById("bgm");
const hitSound = document.getElementById("hitmp3");

bgm.volume = 0.5;
bgm.play();

const ninjas = document.querySelectorAll(".ninja");
let noOfNinjas = 0
ninjas.forEach((ninja) => { //for each is slower than for loop
  noOfNinjas++
  const animationId= 'ninja' + noOfNinjas
  const keyframes = `
      0% {
        left: ${randomizeAnimation(-20, -5)}%;
        top: ${randomizeAnimation(0, 100)}%;
      }
      100% {
        left: ${randomizeAnimation(110, 150)}%;
        top: ${randomizeAnimation(0, 100)}%;
      }
    `;
  const style = document.createElement("style");
  style.innerHTML = `@keyframes ${animationId} { ${keyframes} }`;
  console.log(`@keyframes ${animationId} { ${keyframes} }`);
  document.body.appendChild(style);  

  ninja.style.animationName = animationId;
  ninja.style.animationDuration = Math.random()* 20000 + 5000 + "ms";
  ninja.style.animationIterationCount = "infinite";
  ninja.addEventListener("click", shoot);
});


document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("ninja")) {
    miss(e);
  }
});


function randomizeAnimation(min,max){
  return Math.random() * (max - min) + min;
}

function shoot(e) {
  //   shotSound.play(); 
  const clickedNinja = e.target; // Get the specific clicked ninja
  clickedNinja.style.display = "none"; // Hide the clicked ninja
  hitSound.play();
  updateScore();
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
