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

const buttons = [
	{ button: rockButton, choice: "rock" },
	{ button: paperButton, choice: "paper" },
	{ button: scissorsButton, choice: "scissors" },
];

buttons.forEach(({button, choice }) => {
	button.addEventListener("click", () => {
		handlePlayerChoice(choice);
	});
});

function chooseForComputer() {
	const choices = ["rock", "paper", "scissors",];
	const randomIndex = Math.floor(Math.random() * choices.length);
	computerChoice = choices[randomIndex];
	console.log("Computer chose: " + computerChoice);
}

function handlePlayerChoice(playerChoice) {
	chooseForComputer();
	console.log("Player chose: " + playerChoice);
	result = determineResult(playerChoice, computerChoice);
	playBattleAnimation(playerChoice, computerChoice, () => {
		congratulateWinner(result, playerChoice, computerChoice, gameElements);
	});
}

function determineResult(playerChoice, computerChoice) {
	if (playerChoice === computerChoice) return "tie";
	if (
		(playerChoice === "rock" && computerChoice === "scissors") ||
		(playerChoice === "paper" && computerChoice === "rock") ||
		(playerChoice === "scissors" && computerChoice === "paper")
	) {
		return "player";
	}
	return "computer";
}