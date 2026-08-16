
class Options {
	constructor() {
		this._skip = false;
		this._show = true;
		this._autobuy = false;
	}

	skip() { return this._skip; }
	show() { return this._show; }
	autobuy() { return this._autobuy; }

	setup(container) {
		const div = Style.mkTabBody(container, 'Options');
		[
			['Skip', 'Skip all rounds, allowing the fastest possible simulation speed'],
			['Show', 'Refresh interface every frame, showing progress'],
			['Autobuy', 'Buy each upgrade as soon as affordable'],
		].map(e => {
			const name = e[0].toLowerCase();
			const varName = `_${name}`;
			const selector = `option-${name}`;
			$(`<label title="${e[1]}" for="${selector}">${e[0]}</label>`).appendTo(div);
			$(`<input title="${e[1]}" type="checkbox" id="${selector}" name="${selector}" />`) //
				.prop('checked', this[varName]) //
				.appendTo(div) //
				.on('change', () => this[varName] = $(`#${selector}`).is(':checked'));
		});
		div.controlgroup();
		return container;
	}
}

