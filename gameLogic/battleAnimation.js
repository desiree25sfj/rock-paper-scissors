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

export { playBattleAnimation };
