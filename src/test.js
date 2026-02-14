import { Ship } from "./Ship.js";
import { Gameboard } from "./Gameboard.js";

describe("Ship tests", () => {
	let ship;

	beforeEach(() => {
		ship = new Ship(2);
	});

	test("hit()", () => {
		expect(ship.numOfHits).toBe(0);
		ship.hit();
		expect(ship.numOfHits).toBe(1);
	});

	test("isSunk()", () => {
		expect(ship.numOfHits).toBe(0);
		expect(ship.isSunk()).toBeFalsy();
		ship.hit();
		expect(ship.isSunk()).toBeFalsy();
		ship.hit();
		expect(ship.numOfHits).toBe(2);
		expect(ship.isSunk()).toBeTruthy();
		ship.hit();
		expect(ship.numOfHits).toBe(3);
		expect(ship.isSunk()).toBeTruthy();
	});
});

describe("Gameboard tests", () => {
	let gameboard;

	beforeEach(() => {
		gameboard = new Gameboard();
	});

	test("placeShipAt() in range no collision", () => {
		let ship1 = new Ship(2);
		gameboard.placeShipAt(ship1, "11", "h");
		// gameboard.display()
		expect(gameboard.shipAt("11")).toBe(ship1);
		expect(gameboard.shipAt("21")).toBe(ship1);
		expect(gameboard.shipAt("31")).toBe(ship1);
		expect(gameboard.ships[0]).toBe(ship1);
	});

	test("placeShipAt() out of range/valid coord", () => {
		let ship1 = new Ship(2);
		// out of range bottom
		expect(() => gameboard.placeShipAt(ship1, "11", "v")).toThrow(
			"1,-1 is out of bounds",
		);
		// out of range right
		expect(() => gameboard.placeShipAt(ship1, "90", "h")).toThrow(
			"10,0 is out of bounds",
		);
		// ship out of range
		expect(() => gameboard.placeShipAt(ship1, "999", "h")).toThrow(
			"enter valid xy coord",
		);
	});

	test("placeShipAt() collision", () => {
		let ship1 = new Ship(2);
		gameboard.placeShipAt(ship1, "11", "h");
		expect(gameboard.shipAt("11")).toBe(ship1);
		expect(gameboard.shipAt("21")).toBe(ship1);
		expect(gameboard.shipAt("31")).toBe(ship1);
		expect(gameboard.ships[0]).toBe(ship1);
		expect(() => gameboard.placeShipAt(ship1, "11", "h")).toThrow(
			"Your ship at 1,1 is taken up by another ship",
		);
	});

    test("recieveAttack()", () => {
        let ship1 = new Ship(2);
        gameboard.placeShipAt(ship1, "11", "h");
		expect(gameboard.shipAt("11")).toBe(ship1);
		expect(gameboard.shipAt("21")).toBe(ship1);
		expect(gameboard.shipAt("31")).toBe(ship1);
        gameboard.receiveAttack(11)
        expect(gameboard.shipAt("11").numOfHits).toBe(1)
        gameboard.receiveAttack(22)
        expect(gameboard.missedAttacks.includes(22))
        gameboard.display()

    })
});
