const player1board = document.querySelector('.gameboard1')
const player2board = document.querySelector('.gameboard2')


function renderDisplay(player1, player2){
    setupBoard(player1, player2)
}

function setupBoard(player1, player2){
    let p1board = player1.gameBoard.board
    let p2board = player2.gameBoard.board
    populateBoardForPlayer(player1board, p1board)
    populateBoardForPlayer(player2board, p2board)
    

}

function populateBoardForPlayer(displayBoard, playerBoard){
    for (let y = 1; y <= 10; y++){
        for (let x = 1; x <= 10; x++){
            const coord = `${x}${y}`
            const cell = document.createElement('div')
            cell.classList.add('cell')
            if (coord in playerBoard) {
                cell.setAttribute('id', 'hasShip')
            }
            displayBoard.appendChild(cell)
        }
    }

}


export {renderDisplay}