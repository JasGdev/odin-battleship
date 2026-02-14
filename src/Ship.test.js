import { Ship } from "./Ship.js";




describe('Ship tests', () => {
    let ship

    beforeEach(() => {
        ship = new Ship(2) 
    })

    test('hit', () => {
        expect(ship.numOfHits).toBe(0)
        ship.hit()
        expect(ship.numOfHits).toBe(1)
    })

    test('isSunk', () => {
        expect(ship.numOfHits).toBe(0)
        expect(ship.isSunk()).toBeFalsy()
        ship.hit()
        expect(ship.isSunk()).toBeFalsy()
        ship.hit()
        expect(ship.numOfHits).toBe(2)
        expect(ship.isSunk()).toBeTruthy()
        ship.hit()
        expect(ship.numOfHits).toBe(3)
        expect(ship.isSunk()).toBeTruthy()
    })

})