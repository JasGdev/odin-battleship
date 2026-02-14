export class Ship {
	constructor(length, numOfHits = 0, sunkStatus = false) {
		this.length = length;
		this.numOfHits = numOfHits;
		this.sunkStatus = sunkStatus;
	}

	hit() {
		this.numOfHits++;
	}

	isSunk() {
		return (this.sunkStatus = this.length > this.numOfHits ? false : true);
	}
}
