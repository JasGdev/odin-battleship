import { Ship } from '../core/Ship.js';
import { renderDisplay, renderMessage } from './Renderer.js';

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
		renderMessage('Click on your display to place your ships', 'white');
		renderMessage('Order: ship size 2, 3, 4, 5', 'white');
		placeShipControls(player, ships[0]);
		player.isTurn = true
	}
}

function placeShipControls(player, ship) {
	for (let y = 0; y <= 9; y++) {
		for (let x = 0; x <= 9; x++) {
			const coord = `${x}${y}`;
			const cell = document.querySelector(`.gameboard1 #c${coord}`);
			cell.addEventListener('mousedown', function () {
				console.log(coord);
				player.gameBoard.placeShipAt(ship, coord, 'h', 'real');
				console.log(1);
				// console.log(player.gameBoard)
				renderDisplay(player);
			});
		}
	}
}

function getRandomCoord() {
	let randomX = Math.floor(Math.random() * 10) + 1;
	let randomY = Math.floor(Math.random() * 10) + 1;
	return `${randomX}${randomY}`;
}

function getRandomDirection() {
	return Math.random() > 0.5 ? 'h' : 'v';
}
