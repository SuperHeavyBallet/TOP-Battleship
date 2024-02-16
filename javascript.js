///////////////////// Ship
class Ship{

    constructor(length, numberOfHits, isSunk)
    {
        this.length = length;
        this.numberOfHits = numberOfHits;
        this.isSunk = isSunk;
    }

    hit()
    {
        this.numberOfHits ++;
    }

    checkIfSunk()
    {
        if (this.numberOfHits === this.length)
        {

        this.isSunk = true;
    
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

function hitShip(ship)
{
    ship.hit();
    ship.checkIfSunk();
}

//////////////////////

////////////////////// Gameboard

class GameBoard{

    constructor(numOfRows, numOfColumns)
    {
        this.boardPieces = this.createBoardPieces(numOfRows, numOfColumns);
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
                    val: 0,
                    position: [i, j],
                    hasShip: false,
                    hit: false,
                }
                boardPieces[i].push(boardPiece);
            }
        }

        return boardPieces;
    }

    placeShip(ship, position)
    {
        for (let i = 0; i < ship.length; i++)
        {
            const row = position[i][0];
            const col = position[i][1];
            this.boardPieces[row][col].val = 1;
            this.boardPieces[row][col].hasShip = true;

        }
        
    }


}

function createGameBoard(rows, columns)
{
    return new GameBoard(rows, columns);
}


//////////////////////
const newShip = createNewShip(3,0,false);
const newGameBoard = createGameBoard(8,8);

newGameBoard.placeShip(newShip, [[3,3], [3,4], [3,5]]);



module.exports =
{
    createNewShip,
    newShip,
    checkShipStats,
    hitShip,
    GameBoard,
    createGameBoard

};