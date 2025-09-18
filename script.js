/*
Tic Tac Toe Game:
The Gameboard will be an array within a gameboard object
Players will also be stored in objects
Game flow will also be stored in an object
*/
function GameController(){
    const game = GameBoard();
    let gameBoard = game.getBoard();
    let initialize = document.querySelector(".initialize");
    let infoDisplay = document.querySelector(".info-display");
    let resetBtn = document.querySelector(".reset");
    let player1;
    let player2;
    let currentPlayer;
    let displayText = document.querySelector(".game-info");
    initialize.addEventListener('click', setNames);
    resetBtn.addEventListener('click', playAgain);
    const allDivs = document.querySelectorAll('.cell');
    allDivs.forEach(cell => {
        cell.addEventListener('click', displayDOM)
    })
    function playAgain(){
        game.reset();
        resetBtn.style.display = 'none'
        infoDisplay.style.display = 'flex';
        displayText.textContent = ""
        allDivs.forEach(cell => {
            cell.textContent = ""
        })
        allDivs.forEach(cell => {
            cell.addEventListener('click', displayDOM)
        })
    }
    function setNames(){
        infoDisplay.style.display = 'none';
        let player1Info = document.getElementById("player1");
        let player2Info = document.getElementById("player2");
        player1 = Player(player1Info.value, "X")
        player2 = Player(player2Info.value, "O")
        currentPlayer = player1
        player1Info.value = " "
        player2Info.value = " "
    }
    function displayDOM(e){
        const cell = e.currentTarget;
        const [row, col] = cell.id.split('-').map(Number);
        if(!checkValidSpace(gameBoard, row, col)) {
            return;
        }
        game.choicePicked([row,col], currentPlayer.mark);
        gameBoard = game.getBoard();
        cell.textContent = currentPlayer.mark;
        if(checkWin(gameBoard, currentPlayer.mark, row, col)){
            displayText.textContent = `${currentPlayer.name} wins!`;
            allDivs.forEach(cell => {
                cell.removeEventListener('click', displayDOM)
            })
            resetBtn.style.display = 'block'
            return;
        }
        if(checkDraw(gameBoard)){
            displayText.textContent = "It was a draw! no winners.";
            return;
        }
        if (currentPlayer === player1){
            currentPlayer = player2;
        }
        else{
            currentPlayer = player1;
        }
        displayText.textContent = `${currentPlayer.name} is up!`;
    }
    
    function checkWin(gameBoard, choice, row, col){
        let rowSum = 0;
        let colSum = 0;
        let diagSum = 0;
        let antiDiagSum = 0;
        for (let i = 0; i < 3; i++){
            if(gameBoard[row][i] === choice){
                rowSum++;
            }
        }
        if(rowSum === 3){
            return true;
        }
        for (let i = 0; i < 3; i++){
            if(gameBoard[i][col] === choice){
                colSum++;
            }
        }
        if(colSum === 3){
            return true;
        }
        for(let i = 0; i < 3; i++){
            if(gameBoard[i][i] === choice){
                diagSum++;
            }
        }
        if(diagSum === 3){
            return true;
        }
        for(let i = 0, j = 2; i < 3; i++, j--){
            if (gameBoard[i][j] === choice){
                antiDiagSum++
            }
        }
        if(antiDiagSum === 3){
            return true
        }
        return false;
    }
    function checkValidSpace(gameBoard, row, col){
        return gameBoard[row][col] === null;
    }
    function checkDraw(gameBoard){
        for(let i = 0; i < 3; i++){
            for (let j = 0 ; j < 3; j++){
                if(gameBoard[i][j] === null){
                    return false;
                }
            }
        }
        return true;
    }
    /*I need to add logic that checks if the game is over
     * if gameBoard[0][0], gameBoard[1][1] and gameBoard[2][2] all equal X or O game Over\
     * If for each row and column, all cells are the same, then game over
     * if None of the cells equal 0 then game over
     */
}
function GameBoard(){
    let selected = [[null,null,null],[null,null,null],[null,null,null]]
    const choicePicked = ([row,column], mark) => {
        selected[row][column] = mark;
        console.log(selected);
    }
    const getBoard = () => selected;
    const reset = () => {
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            selected[r][c] = null;
          }
        }
    }
    return {selected, choicePicked, getBoard, reset};
}
function Player(name,mark){
    const addSelection = () => {
        let row = +prompt(`${name}: Which row would you like to pick?`) - 1;
        let column = +prompt(`${name}: Which column would you like to pick?`) - 1;
        return [row,column];
    }
    return {name, mark, addSelection};
}
GameController();