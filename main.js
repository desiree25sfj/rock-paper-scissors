let playerChoice;
let computerChoice;
let result;

// 1. When player chooses rock, paper or scissors
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");

function congratulateWinner() {
  if (result === "player") {
    console.log("Congratulations! You won.");
    document.body.style = "background: green";
  } else if (result === "computer") {
    console.log("Better luck next time! You lost.");
    document.body.style = "background: red";
  } else {
    console.log("It's a tie!");
    document.body.style = "background: yellow";
  }
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
