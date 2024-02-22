let score = 0;
let lives = 3;

// let ninjas = document.querySelectorAll(".ninja");
let ninjas = document.getElementById("n1");

ninjas.addEventListener("click", shoot);

function shoot() {
  ninjas.style.display = "none";
  updateScore();
}

function updateScore() {
  score++;
  Document.getElementById("score").innerHTML = `Current Score: ${score}`;
}
