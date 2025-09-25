const startButton = document.getElementById("startButton");
const moveButtonsContainer = document.getElementById("moveButtons");
const moveButtons = document.querySelectorAll(".moveButton");

startButton.addEventListener("click", () => {
	startButton.style.display = "none";
	moveButtonsContainer.style.display = "block";
	moveButtonsContainer.classList.add("show");

	const rockButton = document.getElementById("rock");

	rockButton.addEventListener("click", async () => {
		const move = "rock";
	
		const response = await fetch("http://localhost:5258/move", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ player1: move }),
		});
	
		const result = await response.json();
		console.log("Server response:", result);
	});
});

moveButtons.forEach((button) => {
	button.addEventListener("click", async () => {
		const move = button.dataset.move;

		const response = await fetch("http://localhost:5258/move", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ player1: move }),
		});

		const result = await response.json();
		console.log("Server response:", result);
	});
});
