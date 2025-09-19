function congratulateWinner(result, playerChoice, computerChoice, elements) {
  const {
    resultCircle,
    resultText,
    playerScoreE1,
    computerScoreE1,
    updateFaviconForWin,
    updateFaviconForLoss,
    confetti,
    scores,
  } = elements;

  resultCircle.classList.remove("win", "lose", "tie");
  resultCircle.style.animation = "none";
  resultCircle.offsetHeight;
  resultCircle.style.animation = null;

  if (result === "player") {
    resultText.textContent = `You chose ${playerChoice}, and the computer chose ${computerChoice}. 
      🎉 Congratulations, you won! 🥳`;
    resultCircle.classList.add("win");
    scores.playerScore++;
    updateFaviconForWin();

    confetti({
      particleCount: 200,
      spread: 80,
      angle: 60,
      origin: { x: 0, y: 0.8 },
    });

    confetti({
      particleCount: 200,
      spread: 80,
      angle: 120,
      origin: { x: 1, y: 0.8 },
    });

    if (scores.playerScore % 10 === 0 && scores.playerScore > 0) {
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

      resultText.textContent = `🔥 ${scores.playerScore} WINS! You're unstoppable! 🔥`;
    }
  } else if (result === "computer") {
    resultText.textContent = `You chose ${playerChoice}, and the computer chose ${computerChoice}. 
      Better luck next time! 🥀 You lost.`;
    resultCircle.classList.add("lose");
    scores.computerScore++;
    updateFaviconForLoss();
  } else {
    resultText.textContent = `You chose ${playerChoice}, and the computer chose ${computerChoice}. 
      It's a tie! 🤝 Care for another round?`;
    resultCircle.classList.add("tie");
  }

  playerScoreE1.textContent = scores.playerScore;
  computerScoreE1.textContent = scores.computerScore;
}

export { congratulateWinner };
