
const FPS = 10;

var total = 0;
var available = 0;
var round = 0;
var increments = Array.from(Array(4)).map(e => 1);
var cost = Array.from(Array(4)).map(e => 1);

function setup() {
	cost = Array.from(Array(4)).map((e, i) => 10 ** (i + 1));

	const div = $('#multipliers');
	Array.from(Array(4)).map((e, i) => i) //
		.map(e => `<div id="multi-${e}" class="multiplier center">
				<div class="ui-widget ui-widget-content">
					<div class="value">Value <span class="value">${increments[e]}</span></div>
					<div class="cost">Cost <span class="cost">${cost[e]}</span></div>
					<div class="multi-${e}"><input type="button" value="More" index="${e}"/></div>
				</div>
			</div>`) //
		.map(e => $(e).appendTo(div));

	total = 0
	available = 0;
	round = 0;
	increments = Array.from(Array(4)).map(e => 1);

	$('input[type=button]').button().on('click', function() {
		const i = parseInt($(this).attr('index'));
		$(`div#multi-${i} div.value span.value`).html(format(++increments[i]));
		available -= cost[i]; $('#available span.available').html(format(available));
		const delta = 1.1 ** i * cost[i];
		console.log(cost[i], delta, cost[i] + delta);
		cost[i] += delta;
		$(`div#multi-${i} div.cost span.cost`).html(format(cost[i]));
	});
}

function nextStep() { setTimeout(step, 1000 / FPS); }

function step() {

	const increment = increments.reduce((a, e) => a * e, 1);
	$('#increment span.increment').html(increments.map(format).join(' * ') + ' = ' + format(increment));
	total += increment; $('#total span.total').html(format(total));
	available += increment; $('#available span.available').html(format(available));
/*
	$('input[type=button]').each((j, e) => {
		const i = parseInt($(e).attr('index'));
		$(e).button({ disabled: cost[i] > available });
	});
*/
	$('input[type=button]').each((j, e) => { $(e).button({ disabled: cost[parseInt($(e).attr('index'))] > available }); });
	// $('input[type=button]').button({ disabled: cost[parseInt($(this).attr('index'))] > available });

	nextStep();
}

$(setup);
$(step);

