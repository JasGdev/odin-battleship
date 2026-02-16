import { Ship } from '../core/Ship.js';
import { previewShipAt, renderDisplay, renderMessage, undoPreview } from './Renderer.js';

export function initBoardControl(attacker, boardOwner, boardNum = 2) {
	for (let y = 0; y <= 9; y++) {
		for (let x = 0; x <= 9; x++) {
			const coord = `${x}${y}`;
			const cell = document.querySelector(`.gameboard${boardNum} #c${coord}`);
			cell.addEventListener('click', function () {
				// for attacking
				if (boardOwner.gameBoard.receiveAttack(coord, attacker, boardOwner, cell) == true) {
					aiPlayTurn(attacker, boardOwner);
					renderDisplay(boardOwner);
					renderDisplay(attacker);
				}
			});
		}
	}
}

export function aiPlayTurn(player, ai) {
	const aiPlayedMoves = player.gameBoard.attacks;
	let coord = getRandomCoord();

	while (aiPlayedMoves.has(coord)) {
		coord = getRandomCoord();
	}
	const cell = document.querySelector(`.gameboard1 #c${coord}`);
	player.gameBoard.receiveAttack(coord, ai, player, cell);
}

export function setupBoard(player) {
	let shipSize2 = new Ship(2);
	let shipSize3 = new Ship(3);
	let shipSize4 = new Ship(4);
	let shipSize5 = new Ship(5);
	const ships = [shipSize2, shipSize3, shipSize4, shipSize5];

	if (player.type == 'ai') {
		ships.forEach((ship) => {
			let coord = getRandomCoord();
			let direction = getRandomDirection();
			while (player.gameBoard.placeShipAt(ship, coord, direction, player.type) == false) {
				coord = getRandomCoord();
				direction = getRandomDirection();
			}
		});
	} else {
		renderMessage('Click/drag on a grid to place your ship', 'white');
		renderMessage('ship size 2, 3, 4, 5', 'white');
		renderMessage('Your ships are placed in the following order:', 'white');
		placeShipControls(player, ships);
	}
}

function placeShipControls(player, ship) {
	let shipIndex = 0;
	let isDragging = false;
	let startCoord = null;

	for (let y = 0; y <= 9; y++) {
		for (let x = 0; x <= 9; x++) {
			const coord = `${x}${y}`;
			const cell = document.querySelector(`.gameboard1 #c${coord}`);
			cell.addEventListener('mousedown', (e) => {
				isDragging = true;
				startCoord = coord;
				renderDisplay(player);
			});

			cell.addEventListener('mousemove', (e) => {
				if (!isDragging) return;
				
				const endCoord = coord; // current hovered cell
				const direction = getDirection(startCoord, endCoord);
				previewShipAt(startCoord, direction, ship[shipIndex].length)
				renderDisplay(player);
			});

			cell.addEventListener('mouseup', (e) => {
				undoPreview()
				if (!isDragging) return;
				0;
				isDragging = false;
				const endCoord = coord;
				const direction = getDirection(startCoord, endCoord);

				if (shipIndex > ship.length) {
					return;
				}
				if (player.gameBoard.placeShipAt(ship[shipIndex], startCoord, direction, 'real') == true) {
					shipIndex += 1;
				}
				if (shipIndex == ship.length) {
					renderMessage("Ok, game start! Try and sink the AI's ships", 'white');
					shipIndex += 1;
					player.isTurn = true;
				}
				renderDisplay(player);
			});
		}
	}
}

function getRandomCoord() {
	let randomX = Math.floor(Math.random() * 10);
	let randomY = Math.floor(Math.random() * 10);
	return `${randomX}${randomY}`;
}

function getRandomDirection() {
	return Math.random() > 0.5 ? 'r' : 'd';
}

function getDirection(start, end) {
	const startX = Number(start[0]);
	const startY = Number(start[1]);

	const endX = Number(end[0]);
	const endY = Number(end[1]);

	const dx = endX - startX;
	const dy = endY - startY;

	if (Math.abs(dx) >= Math.abs(dy)) {
		return dx >= 0 ? 'r' : 'l';
	} else {
		return dy >= 0 ? 'd' : 'u';
	}
}
