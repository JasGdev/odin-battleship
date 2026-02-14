import { Ship } from "./Ship.js";
import { Gameboard } from "./Gameboard.js";




describe('Ship tests', () => {
    let ship

    beforeEach(() => {
        ship = new Ship(2) 
    })

    test('hit()', () => {
        expect(ship.numOfHits).toBe(0)
        ship.hit()
        expect(ship.numOfHits).toBe(1)
    })

    test('isSunk()', () => {
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

describe('Gameboard tests', () => {
    let gameboard

    beforeEach(() => {
        gameboard = new Gameboard()
    })

    test('placeShipAt', () => {
        let ship1 = new Ship(2)
        gameboard.placeShipAt(ship1, '00', 'h')
        expect(gameboard.shipAt('00')).toBe(ship1)
        expect(gameboard.shipAt('10')).toBe(ship1)
        expect(gameboard.shipAt('20')).toBe(ship1)
        expect(gameboard.ships[0]).toBe(ship1)
    })
})