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

            hitShip(this.boardPieces[row][col].val, this.boardPieces[row][col])

        }
        else
        {
            console.log("Miss!");
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
newGameBoard.placeShip(newShip, [[1,3], [1,4], [1,5]]);

//newGameBoard.recieveAttack([3,3]);


module.exports =
{
    createNewShip,
    newShip,
    checkShipStats,
    hitShip,
    GameBoard,
    createGameBoard

};