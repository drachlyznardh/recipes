
class Options {
	constructor() {
		this.skip = false;
		this.show = true;
		this.autobuy = false;
	}

	graphics(container) {
		const div = $('<div>').addClass(['auto']).appendTo(container);
		const table = $('<table>').addClass('option').appendTo(div);
		[
			['Skip', 'Skip all rounds, allowing the fastest possible simulation speed'],
			['Show', 'Refresh interface every frame, showing progress'],
			['Autobuy', 'Buy each upgrade as soon as affordable'],
		].map(e => $(`<tr title="${e[1]}"><td>${e[0]}</td><td><input type="checkbox" name="${e[0].toLowerCase()}"/></td></tr>`).appendTo(table));
	}
}

