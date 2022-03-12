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
		if (this.years?.length) {
			return this.years.map((year) => String(year).substr(2)).join(', ');
		}

		return String(this.years).substr(2);
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

	compare(player) {
		console.log(this.nationality, player.nationality);

		return {
			seasons: player.years.some((year) => this.years.includes(year)),
			position: this.position === player.position,
			nationality: player.nationality.some((country) => this.nationality.includes(country)),
			club: this.club === player.club,
			initials: this.name[0] === player.name[0]
		};
	}
}
