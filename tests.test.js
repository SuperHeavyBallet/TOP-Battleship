const {
    createNewShip, checkShipStats, newShip, hitShip, GameBoard, createGameBoard

} = require('./javascript');

test('Create New Ship' , () =>
{
    expect(createNewShip(3, 0, false)).toEqual(
        { length: 3, numberOfHits: 0, isSunk: false, occupiedSquares: []}
    );
});

test("Check ship stats", () =>
{
    const newShip = createNewShip(3,0,false);
    expect(checkShipStats(newShip)).toStrictEqual(
        [3, 0, false]
    );
});



test("Create New Gameboard and check properties", () =>
{
    const newGameBoard = createGameBoard(8,8);

    expect(newGameBoard.isBuilt).toEqual(true);
});

test("Create New Gameboard and Place Three Ships, One of which overlap positions", () =>
{
    const newGameBoard = createGameBoard(8,8);
    const newShip1 = createNewShip(3,0,false);
    const newShip2 = createNewShip(5,0,false);
    const newShip3 = createNewShip(2,0, false);

    expect(newGameBoard.placeShip(newShip1, [[3,3], [3,4], [3,5]])).toEqual("Ship Succesfully Placed");
    expect(newGameBoard.placeShip(newShip2, [[3,3], [3,4], [3,5], , [3,6], [3,7]])).toEqual("Position Occupied Already!");
    expect(newGameBoard.placeShip(newShip3, [[4,3], [4,4], [4,5]])).toEqual("Ship Succesfully Placed");
});





