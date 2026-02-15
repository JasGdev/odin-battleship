import { Player } from "./core/Player.js";
import { Ship } from "./core/Ship.js";
import { Gameboard } from "./core/Gameboard.js";
import { renderDisplay } from "./ui/Renderer.js";
import { initControl } from "./ui/Controller.js";

const board1 = new Gameboard()
board1.setupBoard()
const player1 = new Player('real', board1)

const board2= new Gameboard()
board2.setupBoard()
const player2 = new Player('ai', board2)

console.log(player1.gameBoard.board)

console.log(player2.gameBoard.board)



renderDisplay(player1, player2)
initControl(player2)