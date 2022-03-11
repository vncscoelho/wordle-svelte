import playersDb from 'src/data/players';
import { Player } from 'src/models/Player';

export const getPlayerOfTheDay = () => {
	const rng = new RNG();
	const number = rng.nextRange(0, 468);
	const randomPlayer = Object.keys(playersDb)[number];
	return getPlayerById(52402);
};

export const getPlayerById = (id) => {
	return new Player(playersDb[id]);
};

/* Temporary code */
function RNG() {
	this.m = 0x80000000; // 2**31;
	this.a = 1103515245;
	this.c = 12345;

	this.state = new Date().setHours(0, 0, 0, 0);
}

RNG.prototype.nextInt = function () {
	this.state = (this.a * this.state + this.c) % this.m;
	return this.state;
};

RNG.prototype.nextRange = function (start, end) {
	const rangeSize = end - start;
	const randomUnder1 = this.nextInt() / this.m;
	return start + Math.floor(randomUnder1 * rangeSize);
};
