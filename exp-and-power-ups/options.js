
class Options {
	constructor() {
		this._skip = false;
		this._show = true;
		this._autobuy = false;
	}

	skip() { return this._skip; }
	show() { return this._show; }
	autobuy() { return this._autobuy; }

	onChange(target, varName) {
		this[varName] = $(this).is(':checked');
		console.log(this.skip(), this.show(), this.autobuy());
	}

	graphics(container) {
		const div = $('<div>').addClass(['auto']).appendTo(container);
		const table = $('<table>').addClass('option').appendTo(div);
		[
			['Skip', 'Skip all rounds, allowing the fastest possible simulation speed'],
			['Show', 'Refresh interface every frame, showing progress'],
			['Autobuy', 'Buy each upgrade as soon as affordable'],
		].map(e => {
			const name = e[0].toLowerCase();
			const varName = `_${name}`;
			const selector = `option-${name}`;
			$(`<label for="${selector}">${e[0]}</label>`).appendTo(div);
			$(`<input type="checkbox" id="${selector}" name="${selector}" />`).prop('checked', this[varName]).appendTo(div).on('change', function() { this.onChange($(this), varName); });
/*
			$(`<input type="checkbox" id="${selector}" name="${selector}" />`).prop('checked', this[varName]).appendTo(div).on('change', function() {
				this[varName] = $(this).is(':checked');
				console.log(this.skip(), this.show(), this.autobuy());
			});
*/
		});
		div.controlgroup();
	}
}

