import { updateFaviconForWin, updateFaviconForLoss } from "./favicons.js";
import { playBattleAnimation } from "./battleAnimation.js";
import { congratulateWinner } from "./gameLogic.js";

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

// CONGRATULATE WINNER STUFF
const gameElements = {
	resultCircle,
	resultText,
	playerScoreE1,
	computerScoreE1,
	updateFaviconForWin,
	updateFaviconForLoss,
	confetti,
	scores: { playerScore: 0, computerScore: 0 },
};
// END OF CONGRATULATE WINNER STUFF

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
		congratulateWinner(result, playerChoice, computerChoice, gameElements);
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
		congratulateWinner(result, playerChoice, computerChoice, gameElements);
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
		congratulateWinner(result, playerChoice, computerChoice, gameElements);
	});
});
