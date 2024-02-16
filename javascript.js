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

const newShip = createNewShip(3,0,false);

hitShip(newShip);


module.exports =
{
    createNewShip,
    newShip,
    checkShipStats,
    hitShip
};