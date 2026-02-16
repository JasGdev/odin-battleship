import { Ship } from "../core/Ship.js";
import { renderDisplay } from "./Renderer.js";

export function initBoardControl(attacker, boardOwner, boardNum = 2) {
	for (let y = 1; y <= 10; y++) {
		for (let x = 1; x <= 10; x++) {
			const coord = `${x}${y}`;
			const cell = document.querySelector(`.gameboard${boardNum} #c${coord}`);
			cell.addEventListener("click", function () {
				boardOwner.gameBoard.receiveAttack(coord, attacker, boardOwner, cell);
                renderDisplay(boardOwner)
				aiPlayTurn(attacker, boardOwner)
				renderDisplay(attacker)
			});
		}
	}
}

export function startGame(player1, player2){
	player1.isTurn = true
}

export function aiPlayTurn(player, ai){
	const aiPlayedMoves = player.gameBoard.attacks;
	let coord = getRandomCoord();
	
	while (aiPlayedMoves.has(coord)){
		coord = getRandomCoord()
	}
	const cell = document.querySelector(`.gameboard1 #c${coord}`);
	player.gameBoard.receiveAttack(coord, ai, player, cell)
}

export function setupBoard(player){
	let shipSize2 = new Ship(2);
	let shipSize3 = new Ship(3);
	let shipSize4 = new Ship(4);
	let shipSize5 = new Ship(5);
	const ships = [shipSize2, shipSize3, shipSize4, shipSize5]

	if (player.type == 'ai'){
		ships.forEach((ship) => {
			let coord = getRandomCoord()
			let direction = getRandomDirection()
			while (player.gameBoard.placeShipAt(ship, coord, direction) == false){
				coord = getRandomCoord()
				direction = getRandomDirection()
			}
		})


	} else {

	}

}

function getRandomCoord(){
	let randomX = Math.floor(Math.random() * 10) + 1;
	let randomY = Math.floor(Math.random() * 10) + 1;
	return `${randomX}${randomY}`
}

function getRandomDirection(){
	return Math.random() > 0.5? 'h':'v'
}