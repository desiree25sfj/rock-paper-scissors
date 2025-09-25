const startButton = document.getElementById("startButton");
const moveButtons = document.getElementById("moveButtons");

startButton.addEventListener("click", () => {
	startButton.style.display = "none";
	moveButtons.style.display = "block";
	moveButtons.classList.add("show");
});