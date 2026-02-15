const player1board = document.querySelector(".gameboard1");
const player2board = document.querySelector(".gameboard2");

function renderDisplay(player1, player2) {
	setupBoard(player1, player2);
}

function setupBoard(player1, player2) {
	populateBoardForPlayer(player1board, player1);
	populateBoardForPlayer(player2board, player2);
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
            if (player.type == 'ai') cell.classList.add('hidden')
		}
	}
}

export { renderDisplay };
