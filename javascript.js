class GameManager
{
    constructor(playerOne)
    {
        this.playerOne = playerOne;

    }

    createGameBoard(name, rows, columns)
    {
        return new GameBoard(name, rows, columns);
    }


    switchTurns()
    {

        const playerTurnIndicator = document.getElementById("player-turn-indicator");
        const computerTurnIndicator = document.getElementById("computer-turn-indicator");
        const gameBoardLockPlayer = document.getElementById("gameboard-lock");


        if (playerOne.isPlayerTurn)
        {

            gameBoardLockPlayer.classList.remove("hidden");

            playerTurnIndicator.textContent = ("GO");
            computerTurnIndicator.textContent = ("WAIT");

            playerOne.isPlayerTurn = false;
            
            this.computerWait();
        }
        else if (!playerOne.isPlayerTurn)
        {
            
            gameBoardLockPlayer.classList.add("hidden");

            

            playerTurnIndicator.textContent = ("WAIT");
            computerTurnIndicator.textContent = ("GO");

            playerOne.isPlayerTurn = true;
        }

        console.log("Player TUrn?" , playerOne.isPlayerTurn);
    }

    computerWait()
    {
        const waitTime = Math.floor(Math.random() * 3000);
        console.log(waitTime);
        setTimeout(this.generateComputerMove, waitTime);
        //generateComputerMove();
    }

    generateComputerMove()
    {
        let availableSquares = [];
        let hitSquares = [];

        for (let i = 0; i < playerOneGameBoard.boardPieces.length; i++)
        {
            for (let j = 0; j < playerOneGameBoard.boardPieces[i].length; j++)
            {
                if (!playerOneGameBoard.boardPieces[i][j].hit)
                {
                    availableSquares.push(playerOneGameBoard.boardPieces[i][j]);
                }
                else if (playerOneGameBoard.boardPieces[i][j].hit)
                {
                    hitSquares.push(playerOneGameBoard.boardPieces[i][j]);
                }
            }
        }

        console.log("Hit: ", hitSquares);
        console.log("Available: " ,availableSquares);

        const randomNumber = Math.floor(Math.random() * availableSquares.length);
        console.log(randomNumber);
        console.log("Selected Square: ", availableSquares[randomNumber]);

        playerOneGameBoard.recieveAttack(availableSquares[randomNumber], playerOneGameBoard);
    }

    gameOverLockScreen(loser)
    {
        const gameBoardLockPlayer = document.getElementById("gameboard-lock-player");
        const gameBoardLockComputer = document.getElementById("gameboard-lock");

        gameBoardLockPlayer.classList.remove("hidden");
        gameBoardLockComputer.classList.remove("hidden");

        gameBoardLockPlayer.classList.add("gameboard-gameover-lock");
        gameBoardLockComputer.classList.add("gameboard-gameover-lock");

        this.replayButton();

        
    }

    gameOverAlert(loser)
    {

        
            if (loser === "player")
            {
                    alert("You Lost!");   
            }
            else if (loser === "computer")
            {
                    alert("You Won!");
            }
    
    }

    replayButton()
    {
        const replayButton = document.getElementById("play-again-button");
        replayButton.classList.remove("hidden");

        replayButton.addEventListener('click', () =>
        {
            console.log("Clicked Replay");
            //createGame();
        });
    }



}

///////////////////// Player
class Player
{
    constructor(playerName, playerShips, sizeOfFleet, shipLengths, isPlayerTurn)
    {
        this.playerName = playerName;
        this.playerShips = playerShips;
        this.fleet = this.createShipFleet(sizeOfFleet, shipLengths);
        this.hitsAvailable = this.calculateHitsAvailable();
        this.hitsRemaining = this.calculateHitsRemaining();
        this.allShipsSunk = false;
        this.isPlayerTurn = isPlayerTurn;
    }

    placeShips(playerBoard)
    {
        console.log(this.playerShips);

        playerBoard.placeShip(this.playerShips[0], [[3,3]]);
        playerBoard.placeShip(this.playerShips[1], [[7,6]]);
        playerBoard.placeShip(this.playerShips[2], [[1,1],[1,2]]);
        playerBoard.placeShip(this.playerShips[3], [[1,4],[1,5],[1,6]]);
        playerBoard.placeShip(this.playerShips[4], [[6,4],[6,5],[6,6],[6,7]]);
     


    }

    calculateHitsAvailable()
    {
        let totalHitsAvailable = 0;

        for (let i = 0; i < this.playerShips.length; i++)
        {
            const thisShipHealth = this.playerShips[i].length;
            totalHitsAvailable = totalHitsAvailable + thisShipHealth;
        }

        return totalHitsAvailable;
    }

    calculateHitsRemaining()
    {
        let totalHitsTaken = 0;

        for (let i = 0; i < this.playerShips.length; i++)
        {
            const thisShipHits = this.playerShips[i].numberOfHits;
            totalHitsTaken = totalHitsTaken + thisShipHits;

            
        }

        const hitsRemaining = this.hitsAvailable - totalHitsTaken;

        if (hitsRemaining <= 0)
        {
            this.allShipsSunk = true;
        }

        return hitsRemaining;
    }

    // Create the entire fleet for a player, args are total number and an array of the ship lengths
    createShipFleet(numberOfShips, shipLengths)
    {

        for (let i = 0; i < numberOfShips; i++)
        {
            const currentShipLength = shipLengths[i];
            const newShip = createNewShip(currentShipLength, 0, false);
            this.playerShips.push(newShip);
        }

    }
}

///////////////////// Ship
class Ship{

    constructor(length, numberOfHits, isSunk)
    {
        this.length = length;
        this.numberOfHits = numberOfHits;
        this.isSunk = isSunk;
        this.occupiedSquares = [];
    }

    hit()
    {
        console.log("Hit Function");
        this.numberOfHits += 1;
        console.log("Num of Hits: " , this.numberOfHits);
        console.log(`Ship ${this}, took a hit!`);
    }

    checkIfSunk()
    {
        console.log("Check If Function");
        if (this.numberOfHits === this.length)
        {

            this.isSunk = true;
            console.log(`This ship is sunk!`);
            console.log(`___________________`);
    
        }
        else
        {
            console.log(`She's still afloat!`);
            console.log(`___________________`);
        }
    }
}

function createNewShip(length, numberOfHits, isSunk)
{
    return new Ship(length, numberOfHits, isSunk);
}

function checkShipStats(ship)
{
    return [ship.length, ship.numberOfHits, ship.isSunk];
}

function hitShip(ship,position)
{
    if (!position.hit)
    {
        position.hit = true;
        console.log("Hit Ship Function");
        ship.hit();
        ship.checkIfSunk();
    }
    else{
        console.log("Already Hit!");
    }
    
}

//////////////////////

////////////////////// Gameboard

class GameBoard{

    constructor(playerName, numOfRows, numOfColumns)
    {
        this.playerName = playerName;
        this.boardPieces = this.createBoardPieces(numOfRows, numOfColumns);
        this.boardMatrix = this.createBoardMatrix(numOfRows, numOfColumns);
        this.boardPieceElements = this.createDomElements(this.boardPieces);
        this.isBuilt = true;

        
    }

    createDomElements(boardPieces)
    {
        const boardContainer = document.getElementById(`${this.playerName}-gameboard-container`);
        console.log(boardContainer);

        let boardPieceElements = [];

        for (let i = 0; i < boardPieces.length; i++)
        {
            const boardRow = document.createElement('div');
            boardPieceElements.push([]);
            boardRow.setAttribute("id", "gameboard-row");

            for (let j = 0; j < boardPieces[i].length; j++)
            {
                const boardSquare = document.createElement('div');

                boardSquare.classList.add("gameboard-square");
                boardRow.appendChild(boardSquare);
                boardPieceElements[i].push(boardSquare);

                

            }

            boardContainer.appendChild(boardRow);
        }

        this.assignClickOnSquares(boardPieceElements);
        return boardPieceElements;
    }

    assignClickOnSquares(boardSquares)
    {
        console.log(boardSquares);
        for (let i = 0; i < boardSquares.length; i++)
        {
            for (let j = 0; j < boardSquares[i].length; j++)
            {
                boardSquares[i][j].addEventListener("click", () =>
                {
                    console.log(this.boardPieces[i][j]);

                        if (this.boardPieces[i][j].hasShip)
                        {
                            boardSquares[i][j].classList.remove("ship-square");
                            boardSquares[i][j].classList.remove("gameboard-square");
                            boardSquares[i][j].classList.add("gameboard-square-hit");
                            playerTwoGameBoard.recieveAttack(this.boardPieces[i][j], playerTwoGameBoard);
                            
                        }
                        else
                        {
                            boardSquares[i][j].classList.remove("gameboard-square");
                            boardSquares[i][j].classList.add("gameboard-square-miss");
                            playerTwoGameBoard.recieveAttack(this.boardPieces[i][j], playerTwoGameBoard);
                            
                            
                        }
                    
                    
                }, {once: true});
            }
        }
    }




    createBoardPieces(rows, columns)
    {
        let boardPieces = [];
        
        
        for (let i = 0; i < rows; i++)
        {
            boardPieces.push([]);
            
            for (let j = 0; j < columns; j++)
            {
                const boardPiece = {
                    val: null,
                    position: [i, j],
                    hasShip: false,
                    hit: false,
                }
                boardPieces[i].push(boardPiece);
                
            }
        }

        
        return boardPieces;
    }

    createBoardMatrix(rows, columns)
    {
        let boardMatrix = [];

        for (let i = 0; i < rows; i++)
        {
            boardMatrix.push([]);

            for (let j = 0; j < columns; j++)
            {
                boardMatrix[i].push(0);
            }

        }
        return boardMatrix;
    }

    placeShip(ship, position)
    {

        let aSpotIsTaken = false;

        console.log(ship);
        console.log(position);

        for (let i = 0; i < ship.length; i++)
        {
            const row = position[i][0];
            const col = position[i][1];
            const positionPiece = this.boardPieces[row][col];

            if (positionPiece.hasShip)
            {
                aSpotIsTaken = true;
                console.log("Position Occupied Already!");


            }
        }

        if (!aSpotIsTaken)
        {
            for (let i = 0; i < ship.length; i++)
            {
                const row = position[i][0];
                const col = position[i][1];
                const positionPiece = this.boardPieces[row][col];

                positionPiece.val = ship;
                positionPiece.hasShip = true;
                this.boardMatrix[row][col] =  'X';
                ship.occupiedSquares.push([row,col]);
                //this.boardPieceElements[row][col].textContent = "x";
                this.boardPieceElements[row][col].classList.add("ship-square");


            }
        
        }
        
        
    }

    recieveAttack(position, playerGameBoard)
    {
        
        const row = position.position[0];
        const col = position.position[1];

        console.log(position);
        console.log(row);
        console.log(col);


        if (this.boardPieces[row][col].hasShip)
        {
            console.log("Hit a ship!");
            console.log(this.boardPieces[row][col].val);

            hitShip(this.boardPieces[row][col].val, this.boardPieces[row][col]);
            
           
                playerGameBoard.boardPieceElements[row][col].classList.remove("ship-square");
                playerGameBoard.boardPieceElements[row][col].classList.add("gameboard-square-hit");

                if (playerGameBoard === playerOneGameBoard)
                {
                    playerOne.hitsRemaining -=1;
                    const hitsRemainingPlayer = document.getElementById("hits-remaining-player");
                    hitsRemainingPlayer.textContent = (`Hits Remaining: ${playerOne.hitsRemaining}`);
                    if (playerOne.hitsRemaining < 1)
                    {
                        gameManager.gameOverLockScreen("player");
                        setTimeout(function()
                        {
                            gameManager.gameOverAlert("player");
                        }, 10);
                        
                    }
                    else
                    {
                        gameManager.computerWait();
                    }
                    
                }

                else if (playerGameBoard === playerTwoGameBoard)
                {
                    playerTwo.hitsRemaining -=1;
                    const hitsRemainingComputer = document.getElementById("hits-remaining-computer");
                    console.log(hitsRemainingComputer);
                    hitsRemainingComputer.textContent = (`Hits Remaining: ${playerTwo.hitsRemaining}`);
                    if (playerTwo.hitsRemaining < 1)
                    {
                        gameManager.gameOverLockScreen("computer");
                        setTimeout(function()
                        {
                            gameManager.gameOverAlert("computer");
                        }, 10
                        );
                    }
                }
                
            

        }
        else
        {
            console.log("Miss!");
            this.hitMiss(position.position, playerGameBoard);
        }
    }

    hitMiss(position, playerGameBoard)
    {
        console.log(position);
        if (!this.boardPieces[position[0]][position[1]].hit)
        {
            
            this.boardPieces[position[0]][position[1]].hit = true;
            console.log(this.boardPieces[position[0]][position[1]]);
            playerGameBoard.boardPieceElements[position[0]][position[1]].classList.add("gameboard-square-miss");
            
        }
        else{
            
            console.log("Already Missed!");
        }

        gameManager.switchTurns();

    }


}














//////////////////////


    const playerOne = new Player("Player One", [], 5, [1,1,2,3,4], true);
    const playerTwo = new Player("Computer", [], 5, [1,1,2,3,4], false);


    const gameManager = new GameManager(playerOne);





    const playerOneGameBoard = gameManager.createGameBoard("player-one", 8,8);
    const playerTwoGameBoard = gameManager.createGameBoard("player-two", 8,8);

    playerOne.placeShips(playerOneGameBoard);
    playerTwo.placeShips(playerTwoGameBoard);




/*
module.exports =
{
    createNewShip,
    //newShip,
    checkShipStats,
    hitShip,
    GameBoard,
    createGameBoard

};*/