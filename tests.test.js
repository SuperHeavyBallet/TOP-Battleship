const {
    createNewShip, checkShipStats, newShip, hitShip

} = require('./javascript');

test('Create New Ship' , () =>
{
    expect(createNewShip(3, 0, false)).toEqual(
        { length: 3, numberOfHits: 0, isSunk: false}
    );
});

test("Check ship stats", () =>
{
    expect(checkShipStats(newShip)).toStrictEqual(
        [3, 1, false]
    );
});

test("Hit ship and test its stats change", () =>
{
    const ship = createNewShip(3,0,false);
    hitShip(ship); // Call hitShip once
    expect(checkShipStats(ship)).toEqual([3,1,false]);
})

test("Hit ship 3x and test if sunk is true", () =>
{   
    const ship = createNewShip(3,0,false);
    hitShip(ship); // Call hitShip once
    hitShip(ship); // Call hitShip twice
    hitShip(ship); // Call hitShip thrice > Should sink now
    expect(checkShipStats(ship)).toEqual([3,3,true]);
    
});

test("Hit larger ship NOT enough times and test if sunk is false" , () =>
{
    const ship = createNewShip(5,0,false);
    hitShip(ship); // Call hitShip once
    hitShip(ship); // Call hitShip twice
    hitShip(ship); // Call hitShip thrice
    hitShip(ship); // Call hitShip fource

    expect(checkShipStats(ship)).toEqual([5,4,false]);
});

test("Hit larger ship enough times and test if sunk is true" , () =>
{
    const ship = createNewShip(5,0,false);
    hitShip(ship); // Call hitShip once
    hitShip(ship); // Call hitShip twice
    hitShip(ship); // Call hitShip thrice
    hitShip(ship); // Call hitShip fource
    hitShip(ship); // Call hitShip fifce > Should sink now
    expect(checkShipStats(ship)).toEqual([5,5,true]);
});

