import { Player } from "./core/Player.js";
import { Ship } from "./core/Ship.js";
import { Gameboard } from "./core/Gameboard.js";
import { renderDisplay, setupBoardDisplay } from "./ui/Renderer.js";
import {  initBoardControl, setupBoard, startGame } from "./ui/Controller.js";

const board1 = new Gameboard()
const player1 = new Player('real', board1)

const board2= new Gameboard()
const player2 = new Player('ai', board2)

console.table(player1.gameBoard.ships)

console.table(player2.gameBoard.ships)



// renderDisplay(player1, player2)
// setupBoard(player1)
setupBoard(player2)
setupBoardDisplay(player1, player2)


console.table(player2.gameBoard.board)

initBoardControl(player1, player2)
startGame(player1, player2)