
const FPS = 10;
const MULTIPLIERS = 6;

var scenario = 0;
var objective = 0;
var total = 0;
var available = 0;
var round = 0;
var increments = Array.from(Array(MULTIPLIERS)).map(e => 1);
var cost = Array.from(Array(MULTIPLIERS)).map(e => 1);

function checkVictory() { return objective >= available; }

function setup() {
	$('#victory').dialog({
		modal: true,
		width: 400,
		resizable: false,
		autoOpen: false
	});

	objective = 10 ** (scenario * 2 + 6);
	$('#objective').html(`Reach ${format(objective)} EXP to achieve victory`);

	reset();
}

function reset() {
	size = 4 + scenario * 2;

	cost = Array.from(Array(size)).map((e, i) => 10 ** (i + 1));

	const div = $('#multipliers');
	Array.from(Array(size)).map((e, i) => i) //
		.map(e => `<div id="multi-${e}" class="multiplier center">
				<div class="ui-widget ui-widget-content">
					<div class="value">Value <span class="value">${format(increments[e])}</span></div>
					<div class="cost">Cost <span class="cost">${format(cost[e])}</span></div>
					<div class="multi-${e}"><input type="button" value="More" index="${e}"/></div>
				</div>
			</div>`) //
		.map(e => $(e).appendTo(div));

	total = 0
	available = 0;
	round = 0;
	increments = Array.from(Array(size)).map(e => 1);

	$('input[type=button]').button().on('click', function() {
		const i = parseInt($(this).attr('index'));
		$(`div#multi-${i} div.value span.value`).html(format(++increments[i]));
		available -= cost[i]; $('#available span.available').html(format(available));
		cost[i] += 1.1 ** i * cost[i];
		$(`div#multi-${i} div.cost span.cost`).html(format(cost[i]));
	});
}

function nextStep() { setTimeout(step, 1000 / FPS); }

function step() {

	const increment = increments.reduce((a, e) => a * e, 1);
	$('#increment span.increment').html(increments.map(format).join(' * ') + ' = ' + format(increment));
	total += increment; $('#total span.total').html(format(total));
	available += increment; $('#available span.available').html(format(available));
	$('input[type=button]').each((j, e) => { $(e).button({ disabled: cost[parseInt($(e).attr('index'))] > available }); });

	if (checkVictory()) $('#victory').dialog('open');
	else nextStep();
}

$(setup);
$(step);

