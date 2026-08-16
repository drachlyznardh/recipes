
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
		].map(e => {
			const name = e[0].toLowerCase();
			const selector = `option-${name}`;
			$(`<label for="${selector}">${e[0]}</label>`).appendTo(div);
			// $(`<input type="checkbox" id="${selector}" name="${selector}" />`).appendTo(div).on('change', function() { console.log($(this), 'changed', e, $(this).is(':checked')); });
			$(`<input type="checkbox" id="${selector}" name="${selector}" />`).appendTo(div).on('change', function() {
				this[name] = $(this).is(':checked');
				console.log(name, this[name]);
			});
		});
		div.controlgroup();
	}
}

