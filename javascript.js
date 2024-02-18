///////////////////// Player
class Player
{
    constructor(playerName, playerShips, sizeOfFleet, shipLengths, hitsRemaining)
    {
        this.playerName = playerName;
        this.playerShips = playerShips;
        this.fleet = this.createShipFleet(sizeOfFleet, shipLengths);
        this.hitsAvailable = this.calculateHitsAvailable();
        this.hitsRemaining = this.calculateHitsRemaining();
        this.allShipsSunk = false;
        this.isPlayerTurn = true;
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

    constructor(numOfRows, numOfColumns)
    {
        this.boardPieces = this.createBoardPieces(numOfRows, numOfColumns);
        this.boardMatrix = this.createBoardMatrix(numOfRows, numOfColumns);
        this.isBuilt = true;
        
    }




    createBoardPieces(rows, columns)
    {
        let boardPieces = [];
        
        
        for (let i = 0; i < rows; i++)
        {
            boardPieces.push([]);
            
            //boardPieces[i].push(`Row: ${i+1}`);

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
                console.log("Position Occupied Already!");
                return "Position Occupied Already!";

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
                return "Ship Succesfully Placed";

            }
        
        }
        
        
    }

    recieveAttack(position)
    {
        
        const row = position[0];
        const col = position[1];

        console.log(position);
        console.log(row);
        console.log(col);
        console.log(this.boardPieces[row][col]);

        if (this.boardPieces[row][col].hasShip)
        {
            console.log("Hit a ship!");
            console.log(this.boardPieces[row][col].val);

            hitShip(this.boardPieces[row][col].val, this.boardPieces[row][col]);

        }
        else
        {
            console.log("Miss!");
            this.hitMiss(position);
        }
    }

    hitMiss(position)
    {

        switchTurns();

        if (!this.boardPieces[position[0]][position[1]].hit)
        {
            this.boardPieces[position[0]][position[1]].hit = true;
        }
        else{
            console.log("Already Missed!");
        }

    }


}

function createGameBoard(rows, columns)
{
    return new GameBoard(rows, columns);
}

function switchTurns()
{
    if (playerOne.isPlayerTurn)
    {
        playerOne.isPlayerTurn = false;
    }
    else if (!playerOne.isPlayerTurn)
    {
        playerOne.isPlayerTurn = true;
    }
}

function computerWait()
{
    const waitTime = Math.floor(Math.random() * 1000);
    console.log(waitTime);
    //setTimeout(generateComputerMove, 0);
    generateComputerMove();
}

function generateComputerMove()
{
    let availableSquares = [];
    let hitSquares = [];

    for (let i = 0; i < newGameBoard.boardPieces.length; i++)
    {
        for (let j = 0; j < newGameBoard.boardPieces[i].length; j++)
        {
            if (!newGameBoard.boardPieces[i][j].hit)
            {
                availableSquares.push(newGameBoard.boardPieces[i][j]);
            }
            else if (newGameBoard.boardPieces[i][j].hit)
            {
                hitSquares.push(newGameBoard.boardPieces[i][j]);
            }
        }
    }

    console.log("Hit: ", hitSquares);
    console.log("Available: " ,availableSquares);

    const randomNumber = Math.floor(Math.random() * availableSquares.length);
    console.log(randomNumber);
    console.log("Selected Square: ", availableSquares[randomNumber]);
}


//////////////////////

const playerOne = new Player("Player One", [], 5, [1,1,2,3,4],0);



console.log(playerOne);


const newGameBoard = createGameBoard(8,8);

console.log("Player Turn" , playerOne.isPlayerTurn);
newGameBoard.recieveAttack([3,3]);
console.log("Player Turn" , playerOne.isPlayerTurn);

computerWait();

//newGameBoard.placeShip(playerOne.playerShips[1], [[3,3]]);

//newGameBoard.placeShip(newShip, [[3,3], [3,4], [3,5]]);
//newGameBoard.placeShip(newShip, [[1,3], [1,4], [1,5]]);

//newGameBoard.recieveAttack([3,3]);


module.exports =
{
    createNewShip,
    //newShip,
    checkShipStats,
    hitShip,
    GameBoard,
    createGameBoard

};