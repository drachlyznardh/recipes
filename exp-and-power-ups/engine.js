
const FPS = 10;
const AUTOBUY = true;
const rowSize = 4;

var scenario = 0;
var objective = 0;
var total = 0;
var available = 0;
var round = 0;
var factors = [];
var deltas = [];
var deltaAccel = 0;
var cost = [];

function checkVictory() { return objective <= available; }

function setup() {
	$('#victory').dialog({
		modal: true,
		width: 400,
		resizable: false,
		autoOpen: false
	});

	reset();
}

function nextScenario() {
	scenario++;
	reset();
	$('#victory').dialog('close');
}

function mkDelta(i) { return Math.max(1, Math.floor(deltaAccel * Math.log(factors[i]))); }

function mkMulti(e) {
	const m = $('<div>').addClass(['multiplier', 'center']);
	const w = $('<div>').addClass(['ui-widget', 'ui-widget-content', 'ui-corner-all']).appendTo(m);
	[
		`<div class="value ui-widget-header ui-corner-top">Multiplier #${e + 1}: <span class="value">${format(factors[e])}</span></div>`,
		`<div class="delta">Next: +<span class="delta">${format(deltas[e])}</span></div>`,
		`<div class="cost">Upgrade cost: <span class="cost">${format(cost[e])}</span> EXP</div>`,
		`<div class="multi-${e}"><input type="button" class="buyable" value="More" index="${e}"/></div>`
	].forEach(t => $(t).appendTo(w));
	return m;
}

function reset() {
	objective = 10 ** (scenario * 4 + 6);
	desc = `Reach ${format(objective)} EXP to achieve victory`;
	$('#objective').html(desc);
	$('#victory').html(desc).dialog({ title: 'Objective' });
	$('.objective').on('click', () => $('#victory').dialog('open'));

	size = 5 + scenario;
	cost = Array.from(Array(size)).map((e, i) => 10 ** (i + 1));
	total = 0
	available = 0;
	round = 0;
	factors = Array.from(Array(size)).map(e => 1);
	deltas = Array.from(Array(size)).map(e => 1);
	deltaAccel = 1 + scenario / 10;

	const div = $('#multipliers');
	div.html('');
	// Array.from(Array(size)).map((e, i) => i).map(e => mkMulti(e).appendTo(div));
	layout(size, $('.multis'));
	// layout(size, div);
	// layout(size, $('.main'));

	$('input[type=button]').button().on('click', function() {
		const i = parseInt($(this).attr('index'));
		factors[i] += mkDelta(i); $(`div#multi-${i} div.value span.value`).html(format(factors[i]));
		const nextDelta = mkDelta(i);
		deltas[i] = nextDelta; $(`div#multi-${i} div.delta span.delta`).html(format(nextDelta));
		available -= cost[i]; $('#available span.available').html(format(available));
		cost[i] += 1.1 ** i * cost[i];
		$(`div#multi-${i} div.cost span.cost`).html(format(cost[i]));
	});

	nextStep();
}

function nextStep() { setTimeout(step, 1000 / FPS); }

function win() {
	$('#victory').html(`<div class="center">
			<div>You won!</div>
			<div>It took you ${round} rounds to win, or ${round/FPS}s.</div>
			<input type="button" value="Play next scenario" onclick="nextScenario()" />
		</div>`).dialog({ title: 'Victory!' }).dialog('open');
}

function step() {
	round++;

	const increment = factors.reduce((a, e) => a * e, 1);
	$('#increment span.increment').html(factors.map(format).join(' * ') + ' = ' + format(increment));
	total += increment; $('#total span.total').html(format(total));
	available += increment; $('#available span.available').html(format(available));
	$('input.buyable').each((j, e) => { $(e).button({ disabled: cost[parseInt($(e).attr('index'))] > available }); });

	if (AUTOBUY) $('input.buyable:enabled:first').click();

	if (checkVictory()) win();
	else nextStep();
}

function layout(i, container) {
	// $(`<div class="center ui-widget ui-widget-header ui-corner-all">Group #${i}</div>`).appendTo(container);
	function mkRow(r, c) { return Array.from(Array(c)).map((e, i) => i + r); }
	Array.from(Array(Math.floor(i / rowSize))).map((e, r) => mkRow(r * rowSize, rowSize))
		.concat([mkRow(Math.floor(i / rowSize) * rowSize, Math.floor(i % rowSize))]) //
		.filter(e => e.length) //
		.forEach(row => {
			const flex = $('<div>').addClass(['flex', 'flex4']).appendTo($('<div>').addClass('auto').appendTo(container));
			row.forEach(e => mkMulti(e).addClass(['fixed', 'center']).appendTo(flex));
		});
}

function test() {
	Array.from(Array(9)).map((e, i) => i + 1).map(e => layout(e, $('.main')));
}

$(setup);
// $(test);

