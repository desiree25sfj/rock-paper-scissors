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

const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");

function playBattleAnimation(playerChoice, computerChoice, callback) {
  const battle = document.querySelector(".battle");
  const playerHand = document.querySelector(".playerHand");
  const computerHand = document.querySelector(".computerHand");
  const choices = document.querySelector(".gameButtons");

  choices.style.display = "none";

  battle.classList.add("show");

  playerHand.textContent = "✊";
  computerHand.textContent = "✊";

  let count = 0;
  const interval = setInterval(() => {
    count++;
    playerHand.style.transform = "scale(1.2)";
    computerHand.style.transform = "scale(1.2)";

    setTimeout(() => {
      playerHand.style.transform = "scale(1)";
      computerHand.style.transform = "scale(1)";
    }, 100);

    if (count === 3) {
      clearInterval(interval);

      const emojis = { rock: "✊", paper: "✋", scissors: "✌️" };
      playerHand.textContent = emojis[playerChoice];
      computerHand.textContent = emojis[computerChoice];

      setTimeout(() => {
        battle.classList.remove("show");

        choices.style.display = "flex";

        callback();
      }, 650);
    }
  }, 400);
}

function congratulateWinner() {
  resultCircle.classList.remove("win", "lose", "tie");
  resultCircle.style.animation = "none";
  resultCircle.offsetHeight;
  resultCircle.style.animation = null;

  if (result === "player") {
    resultText.textContent = `You chose ${playerChoice}, and the computer chose ${computerChoice}. 🎉 Congratulations, you won! 🥳`;
    resultCircle.classList.add("win");
    playerScore++;

    confetti({
      particleCount: 80,
      spread: 60,
      angle: 60,
      origin: { x: 0, y: 0.8 },
    });

    confetti({
      particleCount: 80,
      spread: 60,
      angle: 120,
      origin: { x: 1, y: 0.8 },
    });

    if (playerScore % 10 === 0 && playerScore > 0) {
      const duration = 1.2 * 1000;
      const end = Date.now() + duration;
      document.querySelector(".crown").style.display = "block";

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#FFD700", "#FFEC8B", "#FFC700"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#FFD700", "#FFEC8B", "#FFC700"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      resultText.textContent = `🔥 ${playerScore} WINS! You're unstoppable! 🔥`;
    }
  } else if (result === "computer") {
    resultText.textContent = `You chose ${playerChoice}, and the computer chose ${computerChoice}. Better luck next time! 🥀 You lost.`;
    resultCircle.classList.add("lose");
    computerScore++;
  } else {
    resultText.textContent = `You chose ${playerChoice}, and the computer chose ${computerChoice}. It's a tie! 🤝 Care for another round?`;
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

  chooseForComputer();

  if (playerChoice === computerChoice) {
    result = "tie";
  } else if (computerChoice === "paper") {
    result = "computer";
  } else {
    result = "player";
  }

  playBattleAnimation(playerChoice, computerChoice, () => {
    congratulateWinner();
  });
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

  playBattleAnimation(playerChoice, computerChoice, () => {
    congratulateWinner();
  });
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

  playBattleAnimation(playerChoice, computerChoice, () => {
    congratulateWinner();
  });
});
