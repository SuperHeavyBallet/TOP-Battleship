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
            location.reload();
        }, {once : true} );
    }
}

///////////////////// Player
class Player
{
    constructor(playerName, playerShips, sizeOfFleet, shipLengths, isPlayerTurn, shipPlacementID, shipPlacementPrevention)
    {
        this.playerName = playerName;
        this.playerShips = playerShips;
        this.fleet = this.createShipFleet(sizeOfFleet, shipLengths);
        this.hitsAvailable = this.calculateHitsAvailable();
        this.hitsRemaining = this.calculateHitsRemaining();
        this.allShipsSunk = false;
        this.isPlayerTurn = isPlayerTurn;
        this.shipPlacementID = shipPlacementID;
        this.shipPlacementPrevention = shipPlacementPrevention;
    }

    createNewShip(length, numberOfHits, isSunk, occupiedSquares, shipID)
    {
        return new Ship(length, numberOfHits, isSunk, occupiedSquares, shipID);
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
                [this.playerShips[2], [[1,7],[2,7]] ],
                [this.playerShips[3], [[7,7],[7,6],[7,5]] ],
                [this.playerShips[4], [[2,2],[3,2],[4,2],[5,2]] ],
            ],
            [
                [this.playerShips[0], [[4,7]] ],
                [this.playerShips[1], [[5,2]] ],
                [this.playerShips[2], [[2,2],[3,2]] ],
                [this.playerShips[3], [[4,5],[5,5],[6,5]] ],
                [this.playerShips[4], [[1,0],[1,1],[1,2],[1,3]] ],
            ],
            [
                [this.playerShips[0], [[5,7]] ],
                [this.playerShips[1], [[2,1]] ],
                [this.playerShips[2], [[6,3],[6,2]] ],
                [this.playerShips[3], [[1,7],[2,7],[3,7]] ],
                [this.playerShips[4], [[0,2],[0,3],[0,4],[0,5]] ],
            ],
            [
                [this.playerShips[0], [[0,7]] ],
                [this.playerShips[1], [[4,5]] ],
                [this.playerShips[2], [[3,1],[4,1]] ],
                [this.playerShips[3], [[2,3],[2,4],[2,5]] ],
                [this.playerShips[4], [[6,2],[6,3],[6,4],[6,5]] ],
            ],
            [
                [this.playerShips[0], [[6,2]] ],
                [this.playerShips[1], [[2,6]] ],
                [this.playerShips[2], [[3,3],[3,4]] ],
                [this.playerShips[3], [[5,2],[5,3],[5,4]] ],
                [this.playerShips[4], [[1,1],[1,2],[1,3],[1,4]] ],
            ]

          
            
        ];

        let chosenLayout = Math.floor(Math.random() * (placeLayouts.length - 1));

        if (chosenLayout === this.shipPlacementPrevention)
        {

            if (chosenLayout - 1 > 0)
            {
                chosenLayout = chosenLayout - 1;
            }
            else
            {
                chosenLayout = chosenLayout + 1;
            }
        }

        this.shipPlacementID = chosenLayout;

        playerBoard.placeShip(placeLayouts[chosenLayout][0][0], placeLayouts[chosenLayout][0][1]);
        playerBoard.placeShip(placeLayouts[chosenLayout][1][0], placeLayouts[chosenLayout][1][1]);
        playerBoard.placeShip(placeLayouts[chosenLayout][2][0], placeLayouts[chosenLayout][2][1]);
        playerBoard.placeShip(placeLayouts[chosenLayout][3][0], placeLayouts[chosenLayout][3][1]);
        playerBoard.placeShip(placeLayouts[chosenLayout][4][0], placeLayouts[chosenLayout][4][1]);


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
            const shipID = parseInt(i);
            const newShip = this.createNewShip(currentShipLength, 0, false, [], shipID);
            this.playerShips.push(newShip);
        }
    }
}

///////////////////// Ship
class Ship{

    constructor(length, numberOfHits, isSunk, occupiedSquares , shipID)
    {
        this.length = length;
        this.numberOfHits = numberOfHits;
        this.isSunk = isSunk;
        this.occupiedSquares = occupiedSquares;
        this.shipID = shipID;
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
        this.shipUIArray = [];
        this.displayShipsUI = this.createUIShips(this.playerName );

        
    }

    createDomElements(boardPieces)
    {
        const boardContainer = document.getElementById(`${this.playerName}-gameboard-container`);

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
        for (let i = 0; i < boardSquares.length; i++)
        {
            for (let j = 0; j < boardSquares[i].length; j++)
            {
                boardSquares[i][j].addEventListener("click", () =>
                {

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

        for (let i = 0; i < ship.length; i++)
        {
            const row = position[i][0];
            const col = position[i][1];
            const positionPiece = this.boardPieces[row][col];

            if (positionPiece.hasShip)
            {
                aSpotIsTaken = true;
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

                if (this === playerOneGameBoard)
                {

                    this.boardPieceElements[row][col].classList.add("ship-square");

                }

            }
        
        }
        
        
    }

    createUIShips(playerName)
    {

        let playerContainer;
        let playerShips;

        if (playerName === "player-one")
        {
            playerContainer = document.getElementById("player-one-container");
            playerShips = playerOne.playerShips;
        }

        else if (playerName === "player-two")
        {
            playerContainer = document.getElementById("player-two-container");
            playerShips = playerTwo.playerShips;
        }

        
        const shipUIContainer = document.createElement('div');

        shipUIContainer.classList.add("ship-ui-container");

        for (let i = 0; i < playerShips.length; i++)
        {
            const shipContainer = document.createElement('div');
            shipContainer.classList.add("ship-container");
            shipContainer.setAttribute("id", `ui-ship-${i}`);

            console.log(playerShips[i]);
            this.shipUIArray.push([playerShips[i], shipContainer]);

            for (let j = 0; j < playerShips[i].length; j++)
            {
                const shipSquare = document.createElement('div');
                shipSquare.classList.add("ui-ship-square");
                shipSquare.setAttribute("id" , `square-${j}`);

                shipContainer.appendChild(shipSquare);
            }

            shipUIContainer.appendChild(shipContainer);
            
        }

        playerContainer.appendChild(shipUIContainer);
        console.log(this.shipUIArray);


    }

    updateShipUI(ship)
    {

        console.log(this.shipUIArray[ship.shipID][1].children);

        const shipUIElements = this.shipUIArray[ship.shipID][1].children;

        for (let i = 0; i < shipUIElements.length; i++)
        {
            if (!shipUIElements[i].classList.contains("hit-ui-square"))
            {
                shipUIElements[i].classList.add("hit-ui-square");
                break;
            }
        }


    }

    recieveAttack(position, playerGameBoard)
    {
        
        const row = position.position[0];
        const col = position.position[1];

        console.log(this.boardPieces[row][col].val);
        

        if (this.boardPieces[row][col].hasShip)
        {
            gameManager.refineComputerSelection = true;

            console.log(this.boardPieces[row][col].val.shipID);

            this.updateShipUI(this.boardPieces[row][col].val);

            

            this.hitShip(this.boardPieces[row][col].val, this.boardPieces[row][col]);
            
           
                playerGameBoard.boardPieceElements[row][col].classList.remove("ship-square");
                playerGameBoard.boardPieceElements[row][col].classList.add("gameboard-square-hit");


                if (playerGameBoard === playerOneGameBoard)
                {
                    playerOne.hitsRemaining -=1;
                    const hitsRemainingPlayer = document.getElementById("hits-remaining-player");
                    hitsRemainingPlayer.textContent = (`Hits Remaining: ${playerOne.hitsRemaining}`);

                    //console.log("PLAYER 1 FLEET", playerOne.playerShips);

                    if (playerOne.hitsRemaining < 1)
                    {
                        gameManager.gameOverLockScreen("player");
                        setTimeout(function()
                        {
                            gameManager.gameOverAlert("player");
                        }, 2000 );
                        
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
                    //console.log(hitsRemainingComputer);
                    hitsRemainingComputer.textContent = (`Hits Remaining: ${playerTwo.hitsRemaining}`);

                    //console.log("PLAYER 2 FLEET", playerTwo.playerShips);

                    if (playerTwo.hitsRemaining < 1)
                    {
                        gameManager.gameOverLockScreen("computer");
                        setTimeout(function()
                        {
                            gameManager.gameOverAlert("computer");
                        }, 2000 );
                    }
                }
                
            

        }
        else
        {
            gameManager.refineComputerSelection = false;
            this.hitMiss(position.position, playerGameBoard);
        }
    }

    hitShip(ship,position)
    {
        if (!position.hit)
        {
            position.hit = true;
            ship.hit();
            ship.checkIfSunk();
        }
        
    }

    hitMiss(position, playerGameBoard)
    {
        if (!this.boardPieces[position[0]][position[1]].hit)
        {
            
            this.boardPieces[position[0]][position[1]].hit = true;
            playerGameBoard.boardPieceElements[position[0]][position[1]].classList.add("gameboard-square-miss");
            
        }

        gameManager.switchTurns();

    }


}





//////////////////////


const playerOne = new Player("Player One", [], 5, [1,1,2,3,4], true, 0, 0);
const playerTwo = new Player("Computer", [], 5, [1,1,2,3,4], false, 0, playerOne.shipPlacementID);

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