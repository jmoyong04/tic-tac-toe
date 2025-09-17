/*
Tic Tac Toe Game:
The Gameboard will be an array within a gameboard object
Players will also be stored in objects
Game flow will also be stored in an object
*/
function GameController(){
    let game = GameBoard();
    let gameBoard = game.getBoard()
    let player1 = Player("Jal", "X");
    let player2 = Player("Rando", "O");
    const inBounds = (r,c) => r >= 0 && r <= 2 && c >= 0 &&  c <= 2;
    while(true){
        let row;
        let col;
        let isValid
        do{
            [row,col] = player1.addSelection();
            isValid = (inBounds(row, col) && checkValidSpace(gameBoard,row,col));
            if(!isValid){
                alert("Invalid Space, pick again.")
            }
        }while(!isValid)
        game.choicePicked([row,col], player1.mark)
        gameBoard = game.getBoard();
        if(checkWin(gameBoard, player1.mark, row, col)){
            console.log(`${player1.name} wins!`)
            break;
        }

        if(checkDraw(gameBoard)){
            console.log("Game over, it's a draw");
            break;
        }
        do{
            [row,col] = player2.addSelection()
            isValid = (inBounds(row, col) && checkValidSpace(gameBoard, row, col));
            if(!isValid){
                alert("Invalid Space, pick again.")
            }
        }while(!isValid)
        game.choicePicked([row,col], player2.mark)
        gameBoard = game.getBoard();
        if (checkWin(gameBoard, player2.mark, row, col)){
            console.log(`${player2.name} wins!`)
            break;
        }
        if(checkDraw(gameBoard)){
            console.log("Game over, it's a draw");
            break;
        }
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
    return {selected, choicePicked, getBoard};
}
function Player(name,mark){
    const addSelection = () => {
        let row = +prompt(`${name}: Which row would you like to pick?`) - 1;
        let column = +prompt(`${name}: Which column would you like to pick?`) - 1;
        return [row,column];
    }
    return {name, mark, addSelection};
}