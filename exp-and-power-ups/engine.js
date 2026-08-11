
const FPS = 10;

var total = 0;
var available = 0;
var round = 0;
var increments = Array.from(Array(4)).map(e => 1);

function setup() {
	const div = $('#multipliers');
	Array.from(Array(4)).map((e, i) => i) //
		// .map(e => `<div id="multi-${e}" class="multiplier ui-widget ui-widget-content">${e}</div>`) //
		.map(e => `<div id="multi-${e}" class="multiplier">
				<div class="ui-widget ui-widget-content">
					<div>Multiplier #${e}</div>
					<div class="value">${increments[e]}</div>
					<div class="multi-${e}"><input type="button" value="More" index="${e}"/></div>
				</div>
			</div>`) //
		.map(e => $(e).appendTo(div));

	total = 0
	available = 0;
	round = 0;
	increments = Array.from(Array(4)).map(e => 1);

	// $('input[type=button]').button().on('click', () => onMore($(this)));
	$('input[type=button]').button().on('click', function() {
		// increments[parseInt($(this).attr('index'))]++;
		const i = parseInt($(this).attr('index'));
		console.log(`Index #${i}`);
		// $(`div.multi-${i} div.value`).html(increments[i]++);
		increments[i]++;
		console.log(`Increment ${increments[i]}`);
		$(`div#multi-${i} div.value`).html(increments[i]);
	});
}

function nextStep() { setTimeout(step, 1000 / FPS); }

function step() {

	const increment = increments.reduce((a, e) => a * e, 1);
	total += increment; $('#total span.total').html(format(total));
	available += increment; $('#available span.available').html(format(available));

	nextStep();
}

function onMore(e) {
	console.log(e);
	console.log($(e));
}

$(setup);
$(step);

