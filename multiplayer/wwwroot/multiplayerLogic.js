const startButton = document.getElementById("startButton");
const moveButtonsContainer = document.getElementById("moveButtons");
const moveButtons = document.querySelectorAll(".moveButton");

// Determine player
let player = localStorage.getItem("player") || prompt("Are you Player 1 or 2? Type 1 or 2:");
if (player !=="1" && player !== "2") player = "1";
localStorage.setItem("player", player);

// Start button logic
startButton.addEventListener("click", () => {
	startButton.style.display = "none";
	moveButtonsContainer.style.display = "block";
	moveButtonsContainer.classList.add("show");
});

// Add click listener to all move buttons
moveButtons.forEach((button) => {
	button.addEventListener("click", async (event) => {
		event.preventDefault();
		button.disabled = true;

		const move = button.dataset.move;

		try {
			const response = await fetch("/move", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ["player" + player]: move }),
			});

			if (!response.ok) {
				console.error("Server returned an error:", response.status);
				return;
			}

			const result = await response.json();
			console.log("Server response:", result);
		} catch (err) {
			console.error("Fetch error:", err);
		} finally {
			button.disabled = false;
		}
	});
});

// Catch unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
	console.log("Promise rejected:", event.reason);
	event.preventDefault();
});
