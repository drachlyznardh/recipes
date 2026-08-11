
const FPS = 10;
const AUTOBUY = true;

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
		autoOpen: false,
		title: 'Victory!'
	});

	reset();
}

function nextScenario() {
	scenario++;
	reset();
	$('#victory').dialog('close');
}

function mkDelta(i) { return Math.max(1, Math.floor(deltaAccel * Math.log(factors[i]))); }

function reset() {
	objective = 10 ** (scenario * 4 + 6);
	$('#objective').html(`Reach ${format(objective)} EXP to achieve victory`);

	size = 4 + scenario * 2;
	cost = Array.from(Array(size)).map((e, i) => 10 ** (i + 1));
	total = 0
	available = 0;
	round = 0;
	factors = Array.from(Array(size)).map(e => 1);
	deltas = Array.from(Array(size)).map(e => 1);
	deltaAccel = 1 + scenario / 10;

	const div = $('#multipliers');
	div.html('');
	Array.from(Array(size)).map((e, i) => i) //
		.map(e => `<div id="multi-${e}" class="multiplier center">
				<div class="ui-widget ui-widget-content">
					<div class="value">Multiplier #${e + 1}: <span class="value">${format(factors[e])}</span></div>
					<div class="delta">Next: +<span class="delta">${format(deltas[e])}</span></div>
					<div class="cost">Upgrade cost: <span class="cost">${format(cost[e])}</span> EXP</div>
					<div class="multi-${e}"><input type="button" class="buyable" value="More" index="${e}"/></div>
				</div>
			</div>`) //
		.map(e => $(e).appendTo(div));

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
		</div>`).dialog('open');
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

$(setup);

