import { getPlayerById } from 'src/services/players';

export class Player {
	constructor({
		id = 0,
		squadName = '',
		fullName = '',
		years = [],
		position = '',
		citizenship = [],
		currentClub = '',
		number = null
	} = {}) {
		this.id = id;
		this.name = squadName;
		this.fullName = fullName || squadName;
		this.years = years;
		this.position = position;
		this.citizenship = citizenship;
		this.currentClub = currentClub;
		this.number = number || 'SN';
	}

	get nationality() {
		if (this.citizenship instanceof Array) {
			return this.citizenship;
		}

		return [this.citizenship];
	}

	get seasons() {
		if (this.years.length > 1) {
			const [max, min] = [Math.max(...this.years), Math.min(...this.years)];

			return `${min}-${max}`;
		}

		return this.years[0] || '';
	}

	get club() {
		if (this.currentClub === null) {
			return 'Aposentado';
		}

		return this.currentClub;
	}

	get initials() {
		const names = this.name.split(' ');

		return names.map((name) => name[0]).join(' ');
	}

	compare(id) {
		const player = getPlayerById(id);

		return {
			seasons: player.years.some((year) => this.years.includes(year)),
			position: this.position === player.position,
			nationality: player.nationality.some((country) => this.nationality.includes(country)),
			club: this.club === player.club,
			initials: this.name[0] === player.name[0]
		};
	}
}
