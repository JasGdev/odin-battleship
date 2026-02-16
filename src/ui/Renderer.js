const player1board = document.querySelector('.gameboard1');
const player2board = document.querySelector('.gameboard2');
const messageDisplay = document.querySelector('.message .content');

function renderDisplay(player) {
	renderShipMessage(player);
	if (player.type == 'real') {
		updateBoardForPlayer(player1board, player);
	} else {
		updateBoardForPlayer(player2board, player);
	}
}

function setupBoardDisplay(player1, player2) {
	player1board.innerHTML = '';
	player2board.innerHTML = '';
	populateBoardForPlayer(player1board, player1);
	populateBoardForPlayer(player2board, player2);
	renderShipMessage(player1);
	renderShipMessage(player2);
}

function updateBoardForPlayer(displayBoard, player) {
	let playerBoard = player.gameBoard.board;
	for (let y = 0; y <= 9; y++) {
		for (let x = 0; x <= 9; x++) {
			const coord = `${x}${y}`;
			const cell = displayBoard.querySelector(`#c${coord}`);
			if (coord in playerBoard) {
				cell.classList.add('hasShip');
			}
		}
	}
}

let previewCells = new Set();

function previewShipAt(startCoord, direction, length) {
	undoPreview();
	const Coord = startCoord;
	const xCoord = Number(Coord.at(0));
	const yCoord = Number(Coord.at(1));

	let xChange = 0;
	let yChange = 0;
	for (let i = 0; i < length; i++) {
		if (direction == 'r') xChange = 1;
		if (direction == 'l') xChange = -1;
		if (direction == 'd') yChange = 1;
		if (direction == 'u') yChange = -1;
		const newX = xCoord + xChange * i;
		const newY = yCoord + yChange * i;
		if (newX > 9 || newX < 0 || newY > 9 || newY < 0) return
		const previewCell = player1board.querySelector(`#c${xCoord + xChange * i}${yCoord + yChange * i}`);
		previewCells.add(previewCell);
	}

	console.log(direction);
	console.log(previewCells);
	previewCells.forEach((cell) => cell.classList.add('hasShip'));
}

function undoPreview() {
	previewCells.forEach((cell) => cell.classList.remove('hasShip'));
	previewCells = new Set();
}

function populateBoardForPlayer(displayBoard, player) {
	let playerBoard = player.gameBoard.board;
	for (let y = 0; y <= 9; y++) {
		for (let x = 0; x <= 9; x++) {
			const coord = `${x}${y}`;
			const cell = document.createElement('div');
			cell.classList.add('cell');
			if (coord in playerBoard) {
				cell.classList.add('hasShip');
			}
			cell.setAttribute('id', `c${coord}`);
			displayBoard.appendChild(cell);
			if (player.type == 'ai') cell.classList.add('hidden');
		}
	}
}

function renderMessage(string, color = 'black') {
	const message = document.createElement('div');
	message.style.color = color;
	message.textContent = string;
	messageDisplay.prepend(message);
}

// gets called by renderDisplay(), which is called by Controller
function renderShipMessage(player) {
	let shipType = player.type == 'real' ? 'yourShips' : 'enemyShips';
	let shipMessage = document.querySelector(`.${shipType} .content`);
	shipMessage.innerHTML = '';
	let playerShips = player.gameBoard.ships;
	for (const ship of playerShips) {
		const message = document.createElement('div');
		message.classList.add(`${player.type}-${ship.length}`);
		message.textContent = `${ship.length} length ship`;
		shipMessage.appendChild(message);
		if (ship.isSunk()) {
			message.style.textDecoration = 'line-through';
		}
	}
}

export { renderDisplay, renderMessage, setupBoardDisplay, previewShipAt, undoPreview };
