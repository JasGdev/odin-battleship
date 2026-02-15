const player1board = document.querySelector(".gameboard1");
const player2board = document.querySelector(".gameboard2");
const messageDisplay = document.querySelector(".message .content");

function renderDisplay(player) {
	let playerShips = player.gameBoard.ships;
    renderShipMessage(player)
	
}

function setupBoard(player1, player2) {
	populateBoardForPlayer(player1board, player1);
	populateBoardForPlayer(player2board, player2);
	renderMessage("White = miss", "white");
	renderMessage("Red = hit", "red");
	renderShipMessage(player1);
	renderShipMessage(player2);
}

function populateBoardForPlayer(displayBoard, player) {
	let playerBoard = player.gameBoard.board;
	for (let y = 1; y <= 10; y++) {
		for (let x = 1; x <= 10; x++) {
			const coord = `${x}${y}`;
			const cell = document.createElement("div");
			cell.classList.add("cell");
			if (coord in playerBoard) {
				cell.classList.add("hasShip");
			}
			cell.setAttribute("id", `c${coord}`);
			displayBoard.appendChild(cell);
			if (player.type == "ai") cell.classList.add("hidden");
		}
	}
}

function renderMessage(string, color = "black") {
	const message = document.createElement("div");
	message.style.color = color;
	message.textContent = string;
	messageDisplay.prepend(message);
}

// gets called by renderDisplay(), which is called by Controller
function renderShipMessage(player) {
	let shipType = player.type == "real" ? "yourShips" : "enemyShips";
	let shipMessage = document.querySelector(`.${shipType} .content`);
	shipMessage.innerHTML = "";
	let playerShips = player.gameBoard.ships;
	for (const ship of playerShips) {
		const message = document.createElement("div");
		message.classList.add(`${player.type}-${ship.length}`);
		message.textContent = `${ship.length} length ship`;
		shipMessage.appendChild(message);
		if (ship.isSunk()) {
			message.style.textDecoration = "line-through";
		}
	}
}

export { renderDisplay, renderMessage, setupBoard };
