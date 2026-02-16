import { renderMessage } from '../ui/Renderer.js';
import { Ship } from './Ship.js';

export class Gameboard {
	constructor() {
		// key is xy, value is index in ships array
		this.board = {};
		this.missedAttacks = new Set();
		this.ships = [];
		this.attacks = new Set();
	}

	placeShipAt(ship, coord, direction, type) {
		// h extends right, v extends down
		// coord will be 'xy'
		let positions = [];
		let x;
		let y;

		x = Number(coord.toString().at(0));
		y = Number(coord.toString().at(1));

		let length = ship.length;

		for (let i = 0; i < length; i++) {
			let xPos;
			let yPos;
			if (direction == 'r') {
				xPos = x + i;
				yPos = y;
			} else if (direction == 'd') {
				xPos = x;
				yPos = y + i;
			}
			if (direction == 'l') {
				xPos = x - i;
				yPos = y;
			} else if (direction == 'u') {
				xPos = x;
				yPos = y - i;
			}
			if (`${xPos}${yPos}` in this.board) {
				if (type == 'real') renderMessage(`Your ship at ${xPos + 1},${yPos + 1} is taken up by another ship`, 'white');

				return false;
			}
			if (xPos < 0 || xPos > 9 || yPos < 0 || yPos > 9) {
				if (type == 'real') renderMessage(`Your ship at ${xPos + 1},${yPos + 1} is out of bounds`, 'white');
				return false;
			}

			positions.push(`${xPos}${yPos}`);
		}

		this.ships.push(ship);

		for (const pos of positions) {
			this.board[pos] = this.ships.indexOf(ship);
		}
		return true;
	}

	shipAt(coord) {
		const shipIndex = this.board[coord];
		return coord in this.board ? this.ships[shipIndex] : null;
	}

	display() {
		console.log('board');
		console.table(this.board);
		console.log('ships');
		console.table(this.ships);
		console.log('misses');
		console.table(this.missedAttacks);
	}

	receiveAttack(coord, attacker, boardOwner, cell) {
		const boardOwnerType = boardOwner.type;
		const self = boardOwnerType == 'ai' ? 'You' : 'AI';
		const other = boardOwnerType == 'ai' ? "AI's" : 'your';
		if (attacker.isTurn == false) return;
		if (this.attacks.has(coord)) {
			if (attacker.type == 'real') renderMessage(`${self} already attacked this coordinate try again`, 'yellow');
			return false;
		} else {
			attacker.isTurn = false;
			boardOwner.isTurn = true;
			if (boardOwner.type == 'ai') cell.classList.remove('hidden');
			const xCoord = Number(coord.at(0)) + 1;
			const yCoord = Number(coord.at(1)) + 1;
			// if a ship is hit
			if (coord in this.board) {
				this.shipAt(coord).hit();
				cell.classList.add('hit');

				renderMessage(`${self} hit at ${xCoord},${yCoord}`, 'red');
				const hitShip = this.shipAt(coord);
				if (hitShip.isSunk()) {
					renderMessage(`${self} sunk ${other} ${hitShip.length} length ship`, 'red');
				}
				if (this.isAllSunk()) {
					renderMessage(`${self} sunk all ${other} ships! Game Over`, 'red');
					attacker.isTurn = false;
					boardOwner.isTurn = false;
					return;
				}
			}
			// if a miss
			else {
				cell.classList.add('missed');
				this.missedAttacks.add(coord);
				renderMessage(`${self} missed at ${xCoord},${yCoord}`, 'white');
			}
			this.attacks.add(coord);
			return true;
		}
	}

	isAllSunk() {
		for (const ship of this.ships) {
			if (!ship.isSunk()) return false;
		}
		return true;
	}

	getHits() {
		return [...this.attacks].filter((item) => !this.missedAttacks.has(item));
	}
}
