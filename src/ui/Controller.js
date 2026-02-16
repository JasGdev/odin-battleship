import { renderDisplay } from "./Renderer.js";
import { Player } from "../core/Player.js";

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
	let randomX = Math.floor(Math.random() * 10) + 1;
	let randomY = Math.floor(Math.random() * 10) + 1;
	while (aiPlayedMoves.has(`${randomX}${randomY}`)){
		randomX = Math.floor(Math.random() * 10) + 1;
		randomY = Math.floor(Math.random() * 10) + 1;
	}
	let coord = `${randomX}${randomY}`
	const cell = document.querySelector(`.gameboard1 #c${coord}`);
	player.gameBoard.receiveAttack(coord, ai, player, cell)
}