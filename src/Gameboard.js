import { Ship } from "./Ship.js";

export class Gameboard {
	constructor() {
        // key is xy, value is index in ships array
		this.board = {};
		this.missedAttacks = {};
		this.ships = [];
	}


	placeShipAt(ship, coord, direction) {
        	// h extends right, v extends down
	// coord will be 'xy'
		let positions = [];
		let x = Number(coord.at(0));
		let y = Number(coord.at(1));
		let length = ship.length;

		for (let i = 0; i <= length; i++) {
			if (direction == "h") positions.push(`${x+i}${y}`);
			else if (direction == "v") positions.push(`${x}${y-i}`);
		}
        
        this.ships.push(ship)

        for (pos of positions){
            this.board[pos] = this.ships.indexOf(ship)
        }
	}

    shipAt(coord){
        const shipIndex = this.board[coord]
        return (coord in this.board) ? this.ships[shipIndex] : null
    }

    display(){
        console.table(this.board)
        console.table(this.ships)
    }

	receiveAttack() {}
}
