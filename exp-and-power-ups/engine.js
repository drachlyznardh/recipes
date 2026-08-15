
const FPS = 10;
const OPTIONS = {
	SKIP: false,
	SHOW: true,
	AUTOBUY: true,
}
const rowSize = 4;
const formatter = new Formatter();

var scenario = 0;
var objective = 0;
var total = 0;
var available = 0;
var round = 0;
var factors = [];
var increment = 0;
var deltaAccel = 0;

class Multiplier {
	constructor(index) {
		this.index = index;
		this.level = 1;
		this.factor = 1;
		this.cost = 10 ** (index + 1);
		this.delta = 1;
	}

	nextDelta() { return Math.max(1, Math.floor(deltaAccel * Math.log(this.factor))); }
	nextCost() { return 1.1 ** this.index * this.cost; }

	upgrade() {
		if (this.cost <= available) {
			this.factor += this.delta;
			this.deltas = this.nextDelta();
			available -= this.cost;
			this.cost += this.nextCost();
		}
		if (OPTIONS.SHOW) this.show();
	}

	show() {
		$(`div#multi-${this.index} div.value span.value`).html(Formatter.number(this.factor));
		$(`div#multi-${this.index} div.delta span.delta`).html(Formatter.number(this.delta));
		$('#available span.available').html(Formatter.number(available));
		$(`div#multi-${this.index} div.cost span.cost`).html(Formatter.number(this.cost));
	}
}

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

function mkMulti(e) {
	const f = factors[e];
	const m = $(`<div id="multi-${e}">`).addClass(['multiplier', 'center']);
	const w = $('<div>').addClass(['ui-widget', 'ui-widget-content', 'ui-corner-all']).appendTo(m);
	[
		`<div class="value ui-widget-header ui-corner-top">Multiplier #${f.index + 1}: <span class="value">${Formatter.number(f.factor)}</span></div>`,
		`<div class="delta">Next: +<span class="delta">${Formatter.number(f.delta)}</span></div>`,
		`<div class="cost">Upgrade cost: <span class="cost">${Formatter.number(f.cost)}</span> EXP</div>`,
		`<div class="multi-${e}"><input type="button" class="buyable" value="More" index="${e}"/></div>`
	].forEach(t => $(t).appendTo(w));
	return m;
}

function reset() {
	objective = 10 ** (scenario * 4 + 6);
	desc = `Reach ${Formatter.number(objective)} EXP to achieve victory`;
	$('#objective').html(desc);
	$('#victory').html(desc).dialog({ title: 'Objective' });
	$('.objective').on('click', () => $('#victory').dialog('open'));

	size = 4 + scenario;
	total = 0
	available = 0;
	round = 0;
	factors = Array.from(Array(size)).map((e, i) => new Multiplier(i));
	layout(size, $('.multis').html(''));

	$('input[type=button]').button().on('click', function() { factors[parseInt($(this).attr('index'))].upgrade(); });

	nextStep();
}

function nextStep() { OPTIONS.SKIP ? round % 10000 ? step() : setTimeout(step, 0) : setTimeout(step, 1000 / FPS); }

function win() {
	const timems = round / FPS;
	refresh();
	$('#victory').html(`<div class="center">
			<div>You won!</div>
			<div>It took you <span title="${round} rounds or ${timems}ms">${Formatter.secs(timems)}</span>.</div>
			<input type="button" value="Play next scenario" onclick="nextScenario()" />
		</div>`).dialog({ title: 'Victory!' }).dialog('open');
}

function refresh() {
	$('#increment span.increment').html(factors.map(f => f.factor).map(Formatter.number).join(' * ') + ' = ' + Formatter.number(increment));
	$('#total span.total').html(Formatter.number(total));
	$('#available span.available').html(Formatter.number(available));
	factors.map(f => f.show());
}

function step() {
	round++;
	console.log(`Round #${round}`);

	increment = factors.reduce((a, e) => a * e.factor, 1);
	total += increment;
	available += increment;
	if (OPTIONS.SHOW) $('input.buyable').each((j, e) => { $(e).button({ disabled: factors[parseInt($(e).attr('index'))].cost >= available }); });
	if (OPTIONS.AUTOBUY) factors.map(f => f.upgrade());
	if (OPTIONS.SHOW) refresh();
	if (checkVictory()) win(); else nextStep();
}

function layout(i, container) {
	function mkRow(r, c) { return Array.from(Array(c)).map((e, i) => i + r); }
	Array.from(Array(Math.floor(i / rowSize))).map((e, r) => mkRow(r * rowSize, rowSize)) //
		.concat([mkRow(Math.floor(i / rowSize) * rowSize, Math.floor(i % rowSize))]) //
		.filter(e => e.length) //
		.forEach(row => {
			const flex = $('<div>').addClass('auto').appendTo(container);
			row.forEach(e => mkMulti(e).addClass(['fixed', 'center']).appendTo(flex));
		});
}

function test() {
	Array.from(Array(9)).map((e, i) => i + 1).map(e => layout(e, $('.main')));
}

$(setup);
// $(test);

