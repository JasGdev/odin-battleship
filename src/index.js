import { Player } from "./core/Player.js";
import { Ship } from "./core/Ship.js";
import { Gameboard } from "./core/Gameboard.js";
import { renderDisplay, setupBoard } from "./ui/Renderer.js";
import { initBoardControl } from "./ui/Controller.js";

const board1 = new Gameboard()
board1.setupBoard()
const player1 = new Player('real', board1)

const board2= new Gameboard()
board2.setupBoard()
const player2 = new Player('ai', board2)

console.table(player1.gameBoard.ships)

console.table(player2.gameBoard.ships)



// renderDisplay(player1, player2)
setupBoard(player1, player2)
initBoardControl(player2)