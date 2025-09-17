let playerChoice;
let computerChoice;
let result;
let playerScore = 0;
let computerScore = 0;

const headerText = document.querySelector("header h1");
const resultText = document.querySelector(".resultText");
const resultCircle = document.querySelector(".resultCircle");
const playerScoreE1 = document.querySelector("#playerScore");
const computerScoreE1 = document.querySelector("#computerScore");
resultText.textContent = "";

// 1. When player chooses rock, paper or scissors
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");

function congratulateWinner() {
  resultCircle.classList.remove("win", "lose", "tie");
  resultCircle.style.animation = "none";
  resultCircle.offsetHeight;
  resultCircle.style.animation = null;

  if (result === "player") {
    resultText.textContent = `You chose ${playerChoice}, and the computer chose ${computerChoice}. Congratulations! You won.`;
    resultCircle.classList.add("win");
    playerScore++;
  } else if (result === "computer") {
    resultText.textContent = `You chose ${playerChoice}, and the computer chose ${computerChoice}. Better luck next time! You lost.`;
    resultCircle.classList.add("lose");
    computerScore++;
  } else {
    resultText.textContent = `You chose ${playerChoice}, and the computer chose ${computerChoice}. It's a tie! Care for another round?`;
    resultCircle.classList.add("tie");
  }

  playerScoreE1.textContent = playerScore;
  computerScoreE1.textContent = computerScore;
}

function chooseForComputer() {
  const randomNumber = Math.random() * 3;
  if (randomNumber < 1) {
    computerChoice = "rock";
  } else if (randomNumber < 2) {
    computerChoice = "paper";
  } else {
    computerChoice = "scissors";
  }
  console.log("Computer chose: " + computerChoice);
}

rockButton.addEventListener("click", () => {
  console.log("Player chose: rock");
  playerChoice = "rock";

  // 2. Choose for computer
  chooseForComputer();

  // 3. Find out who won
  if (playerChoice === computerChoice) {
    result = "tie";
  } else if (computerChoice === "paper") {
    result = "computer";
  } else {
    result = "player";
  }

  // 4. Congratulate, give condolences, or ask for a rematch
  congratulateWinner();
});

paperButton.addEventListener("click", () => {
  console.log("Player chose: paper");
  playerChoice = "paper";

  chooseForComputer();

  if (playerChoice === computerChoice) {
    result = "tie";
  } else if (computerChoice === "scissors") {
    result = "computer";
  } else {
    result = "player";
  }

  congratulateWinner();
});

scissorsButton.addEventListener("click", () => {
  console.log("Player chose: scissors");
  playerChoice = "scissors";

  chooseForComputer();

  if (playerChoice === computerChoice) {
    result = "tie";
  } else if (computerChoice === "rock") {
    result = "computer";
  } else {
    result = "player";
  }

  congratulateWinner();
});