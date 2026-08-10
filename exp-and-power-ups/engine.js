
function setup() {
	const body = $('body');
	Array.from(Array(4)).map((e, i) => i) //
		.map(e => `<div id="multi-${e}">${e}</div>`) //
		.map($) //
		.appendTo(body);
}

$(setup);

