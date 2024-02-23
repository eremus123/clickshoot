let score = 0;
let lives = 3;

const shotSound = document.getElementById("shotmp3");
const bgm = document.getElementById("bgm");
const hitSound = document.getElementById("hitmp3");

bgm.volume = 0.2;
bgm.play();

const ninjas = document.querySelectorAll(".ninja");

ninjas.forEach((ninja) => {
  ninja.addEventListener("click", shoot);
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("ninja")) {
    miss(e);
  }
});

function shoot(e) {
  //   shotSound.play(); // Play the sound effect
  const clickedNinja = e.target; // Get the specific clicked ninja
  clickedNinja.style.display = "none"; // Hide the clicked ninja
  hitSound.play(); // Play the sound effect
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
