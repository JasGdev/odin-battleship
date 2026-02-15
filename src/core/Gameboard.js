import { renderMessage } from "../ui/Renderer.js";
import { Ship } from "./Ship.js";

export class Gameboard {
	constructor() {
		// key is xy, value is index in ships array
		this.board = {};
		this.missedAttacks = new Set();
		this.ships = [];
		this.attacks = new Set();
	}

	placeShipAt(ship, coord, direction) {
		if (coord.length > 2) throw new Error(`enter valid xy coord`);
		// h extends right, v extends down
		// coord will be 'xy'
		let positions = [];
		let x = Number(coord.toString().at(0));
		let y = Number(coord.toString().at(1));
		let length = ship.length;

		for (let i = 0; i < length; i++) {
			let xPos;
			let yPos;
			if (direction == "h") {
				xPos = x + i;
				yPos = y;
			} else if (direction == "v") {
				xPos = x;
				yPos = y - i;
			}
			if (`${xPos}${yPos}` in this.board)
				throw new Error(
					`Your ship at ${xPos},${yPos} is taken up by another ship`,
				);
			if (xPos < 0 || xPos > 9 || yPos < 0 || yPos > 9)
				throw new Error(`Your ship at ${xPos},${yPos} is out of bounds`);
			positions.push(`${xPos}${yPos}`);
		}

		this.ships.push(ship);

		for (const pos of positions) {
			this.board[pos] = this.ships.indexOf(ship);
		}
	}

	shipAt(coord) {
		const shipIndex = this.board[coord];
		return coord in this.board ? this.ships[shipIndex] : null;
	}

	display() {
		console.log("board");
		console.table(this.board);
		console.log("ships");
		console.table(this.ships);
		console.log("misses");
		console.table(this.missedAttacks);
	}

	receiveAttack(coord) {
		console.log(coord)
		console.log(this.missedAttacks)
		if (this.attacks.has(coord)) {
			renderMessage("You already attacked this coordinate try again", 'yellow');
		} else {
			if (coord in this.board) {
				this.shipAt(coord).hit();
				renderMessage(`Hit at ${coord}`, 'red');
			} else {
				this.missedAttacks.add(coord);
				renderMessage(`Missed at ${coord}`, 'white');
			}
			this.attacks.add(coord)
		}
	}

	isAllSunk() {
		for (const ship of this.ships) {
			if (!ship.isSunk()) return false;
		}
		return true;
	}

	setupBoard() {
		const ship1 = new Ship(1);
		const ship2 = new Ship(2);
		const ship3 = new Ship(3);
		const ship4 = new Ship(4);
		const ship5 = new Ship(5);

		this.placeShipAt(ship1, 11, "h");
		this.placeShipAt(ship2, 12, "h");
		this.placeShipAt(ship3, 13, "h");
		this.placeShipAt(ship4, 14, "h");
		this.placeShipAt(ship5, 15, "h");
	}
}
