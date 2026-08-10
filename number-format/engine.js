
const FPS = 10;

var value = 0;
var increment = 1; // 000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
var round = 0;

function nextStep() {
	setTimeout(step, 1000 / FPS);
}

function setup() {
	function mp12(v) { return [v - 2, v - 1, v, v + 1, v + 2]; }
	function dm12(v) { return [v * .99, v * .999, v, v * 1.01, v * 1.1]; }
	var values = [-2, -1, 0, .01, .1] //
		.concat(Array.from(Array(22)).map((e, i) => i + 1)) //
		.concat(Array.from(Array(4)).map((e, i) => 10 ** (i + 2)).map(mp12).flat()) //
		.concat(Array.from(Array(9)).map((e, i) => 10 ** (i + 6)).map(dm12).flat()) //
		.concat(Array.from(Array(8)).map((e, i) => 10 ** (3 * (i + 5)))) //
		.concat([342.345354 * 10 ** 33]) //
		.concat([342.345354 * 10 ** 34]) //
		.concat(Array.from(Array(11)).map((e, i) => 10 ** 33 * (9990 + i)));
	$('#value3').html(values.map(format).map(v => `<li>${v}</li>`));
}

function step() {
	round++;
	increment *= 1.1;
	value += increment;

	$('#value').html(`Value: ${format(value)} (${value})`);
	$('#value2').html(`Increment: ${format(increment)} (${increment})`);
	// $('#value3').html(value.toPrecision(3));
	//  $('#value4').html(value.toPrecision(4));

	nextStep();
}

$(setup);
$(nextStep);

