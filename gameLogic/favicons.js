const defaultEmoji = "✌️";
const winEmoji = "🎉";
const loseEmoji = "🥀";

function emojiToFavicon(emoji) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <text y="90" font-size="90">${emoji}</text></svg>`;
	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function updateFaviconForWin() {
	const favicon = document.querySelector("link[rel='icon']");
	favicon.href = emojiToFavicon(winEmoji);
	setTimeout(() => {
		favicon.href = emojiToFavicon(defaultEmoji);
	}, 1000);
}

function updateFaviconForLoss() {
	const favicon = document.querySelector("link[rel='icon']");
	favicon.href = emojiToFavicon(loseEmoji);
	setTimeout(() => {
		favicon.href = emojiToFavicon(defaultEmoji);
	}, 1000);
}

export { updateFaviconForWin, updateFaviconForLoss };
