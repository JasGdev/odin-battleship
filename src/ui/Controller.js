import { renderDisplay } from "./Renderer.js";

export function initControl(player, boardNum = 2) {
	for (let y = 1; y <= 10; y++) {
		for (let x = 1; x <= 10; x++) {
			const coord = `${x}${y}`;

			const cell = document.querySelector(`.gameboard${boardNum} #c${coord}`);
			cell.addEventListener("click", function () {
				player.gameBoard.receiveAttack(coord);
				cell.classList.remove("hidden");
                cell.classList.add('hit')
                renderDisplay()
			});
		}
	}
}
