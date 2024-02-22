class GameManager
{
    constructor(playerOne, refineComputerSelection, lastComputerSelectedSquare)
    {
        this.playerOne = playerOne;
        this.refineComputerSelection = refineComputerSelection;
        this.lastComputerSelectedSquare = lastComputerSelectedSquare;
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
    }

    computerWait()
    {
        const waitTime = Math.floor(Math.random() * 3000);
        console.log(waitTime);
        setTimeout(this.generateComputerMove.bind(this), waitTime);
    }

    generateComputerMove()
    {
        let availableSquares = [];
        let refinedAvailableSquares = [];
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

        if (this.refineComputerSelection)
        {
            for (let i = 0; i < availableSquares.length; i++)
            {
                if (Math.abs(availableSquares[i].position[0] - this.lastComputerSelectedSquare.position[0] === 1 &&
                    availableSquares[i].position[1] - this.lastComputerSelectedSquare.position[1] === 1)
                    ||
                    Math.abs(availableSquares[i].position[1] - this.lastComputerSelectedSquare.position[1]) === 1 &&
                    availableSquares[i].position[0] === this.lastComputerSelectedSquare.position[0])
                    {
                        refinedAvailableSquares.push(availableSquares[i]);
                    } 
            }

            if (refinedAvailableSquares.length > 0)
            {
                const randomNumber = Math.floor(Math.random() * refinedAvailableSquares.length);
                const selectedSquare = refinedAvailableSquares[randomNumber];
                this.lastComputerSelectedSquare = selectedSquare;
                playerOneGameBoard.recieveAttack(selectedSquare, playerOneGameBoard);
            }
            else
            {
                const randomNumber = Math.floor(Math.random() * availableSquares.length);
                const selectedSquare = availableSquares[randomNumber];
                this.lastComputerSelectedSquare = selectedSquare;
                playerOneGameBoard.recieveAttack(selectedSquare, playerOneGameBoard);
            }
        }
        else if (!this.refineComputerSelection)
        {
            const randomNumber = Math.floor(Math.random() * availableSquares.length);
            const selectedSquare = availableSquares[randomNumber];
            this.lastComputerSelectedSquare = selectedSquare;
            playerOneGameBoard.recieveAttack(selectedSquare, playerOneGameBoard);
        }
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
            location.reload();
        }, {once : true} );
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

    createNewShip(length, numberOfHits, isSunk)
    {
        return new Ship(length, numberOfHits, isSunk);
    }

    checkShipStats(ship)
    {
        return [ship.length, ship.numberOfHits, ship.isSunk];
    }

    placeShips(playerBoard)
    {

        

        const placeLayouts = [
            [
                [this.playerShips[0], [[3,3]] ],
                [this.playerShips[1], [[7,6]] ],
                [this.playerShips[2], [[1,1],[1,2]] ],
                [this.playerShips[3], [[1,4],[1,5],[1,6]] ],
                [this.playerShips[4], [[6,4],[6,5],[6,6],[6,7]] ],
            ],
            [
                [this.playerShips[0], [[1,1]] ],
                [this.playerShips[1], [[3,4]] ],
                [this.playerShips[2], [[5,5],[6,5]] ],
                [this.playerShips[3], [[7,7],[7,6],[7,5]] ],
                [this.playerShips[4], [[2,2],[3,2],[4,2],[5,2]] ],
            ],
            [
                [this.playerShips[0], [[5,7]] ],
                [this.playerShips[1], [[2,1]] ],
                [this.playerShips[2], [[6,3],[6,2]] ],
                [this.playerShips[3], [[1,7],[2,7],[3,7]] ],
                [this.playerShips[4], [[0,2],[0,3],[0,4],[0,5]] ],
            ],
            [],
            [],
            []

          
            
        ];

        const chosenLayout = Math.floor(Math.random() * (3));
        console.log("HMMMMMMMMMM",chosenLayout);
        playerBoard.placeShip(placeLayouts[chosenLayout][0][0], placeLayouts[chosenLayout][0][1]);
        playerBoard.placeShip(placeLayouts[chosenLayout][1][0], placeLayouts[chosenLayout][1][1]);
        playerBoard.placeShip(placeLayouts[chosenLayout][2][0], placeLayouts[chosenLayout][2][1]);
        playerBoard.placeShip(placeLayouts[chosenLayout][3][0], placeLayouts[chosenLayout][3][1]);
        playerBoard.placeShip(placeLayouts[chosenLayout][4][0], placeLayouts[chosenLayout][4][1]);

        

        
           //playerBoard.placeShip(this.playerShips[0], [[3,3]]);
           // playerBoard.placeShip(this.playerShips[1], [[7,6]]);
           // playerBoard.placeShip(this.playerShips[2], [[1,1],[1,2]]);
            //playerBoard.placeShip(this.playerShips[3], [[1,4],[1,5],[1,6]]);
            //playerBoard.placeShip(this.playerShips[4], [[6,4],[6,5],[6,6],[6,7]]);
            

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

    createShipFleet(numberOfShips, shipLengths)
    {
        for (let i = 0; i < numberOfShips; i++)
        {
            const currentShipLength = shipLengths[i];
            const newShip = this.createNewShip(currentShipLength, 0, false);
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
        this.numberOfHits += 1;
    }

    checkIfSunk()
    {
        if (this.numberOfHits === this.length)
        {
            this.isSunk = true;
        }
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

                document.get
                const row = position[i][0];
                const col = position[i][1];
                const positionPiece = this.boardPieces[row][col];

                positionPiece.val = ship;
                positionPiece.hasShip = true;
                this.boardMatrix[row][col] =  'X';
                ship.occupiedSquares.push([row,col]);

                if (this === playerOneGameBoard)
                {

                this.boardPieceElements[row][col].classList.add("ship-square");

                }

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
            gameManager.refineComputerSelection = true;
            console.log(this.boardPieces[row][col].val);

            this.hitShip(this.boardPieces[row][col].val, this.boardPieces[row][col]);
            
           
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
            gameManager.refineComputerSelection = false;
            this.hitMiss(position.position, playerGameBoard);
        }
    }

    hitShip(ship,position)
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

const gameManager = new GameManager(playerOne, false, {});

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