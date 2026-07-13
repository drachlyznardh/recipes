console.log('engine.js:start');

var load_game = (game_data, player_data) => {
	console.log('load_game.start');

	document.title = game_data?.title || 'Game Loaded';
	set_player_name(player_data?.name);
	set_player_points(player_data?.points);
	set_scenario_list(game_data?.scenarios);
	toggle_reset(true);
	toggle_pause_resume(false, false);

	console.log('load_game.stop');
}
var set_player_name = (name) => { $('#profile').html(name || '<NO INFO>'); }
var set_player_points = (points) => { $('#points').html((parseInt(points) || 0) + 'pts'); }
var set_scenario_list = (scenarios) => {
	var scenario = $('#scenario');
	scenarios //
		.map((e, i) => $('<option value="' + i + '">' + e.name + '</option>')) //
		.forEach(e => e.appendTo(scenario));
}
var toggle_reset = (v) => { $('input[name=reset]').toggle(v); }
var toggle_pause = (v) => { toggle_pause_resume(v, !v); }
var toggle_resume = (v) => { toggle_pause_resume(!v, v); }
var toggle_pause_resume = (p, r) => {
	$('input[name=pause]').toggle(p);
	$('input[name=resume]').toggle(r);
}

var reset = () => {
	console.log('reset.start');

	console.log('game_data', game_data);
	var scenario = $('select[name=scenario]').val();
	console.log('scenario=' + scenario);
	setTimeout(() => load_scenario(game_data?.scenarios[scenario], true), 100);

	console.log('reset.stop');
}
var load_scenario = (scenario, autoresume) => {

	var grid = $('#grid');
	grid.html('');
	var row = (e, i) => {
		return $('<div>' + //
			'<label for="r' + i + '">' + e.name + '</label>' + //
			' <input id="r' + i + '" name="r' + i + '" value="0" disabled />' + //
			'</div>');
	}
	scenario.resources //
		.map(row) //
		.forEach(e => e.appendTo(grid));
	resources = scenario.resources.map(e => 0);

	stepper = scenario.stepper;
	victory = scenario.victory;

	if (autoresume) resume(); else pause();
}
var pause = () => {
	toggle_resume(true);
	is_running = false;
}
var resume = () => {
	toggle_pause(true);
	is_running = true;
	setTimeout(run, 100);
}
var run = () => {
	console.log('run.start');

	var product = resources.map((e, i) => 0);
	// stepper.forEach((e, i) => product[i] += e[1]);
	stepper.forEach(e => handle_recipe(e, resources, product));
	product.forEach((e, i) => resources[i] += e);
	resources.forEach((e, i) => $('input[name=r' + i + ']').val(e));
	resources.forEach((e, i) => console.log('resource#' + i + ': ' + e));

	var is_victory = victory(resources);

	if (is_victory) setTimeout(win, 100);
	else if (is_running) setTimeout(run, 100);
	console.log('run.stop');
}
var handle_recipe = (recipe, resources, product) => {
	if (recipe?.req?.some(e => resources[e[0]] < e[1])) return;
	// if (recipe?.product.some(e =>
	recipe?.req?.forEach(e => resources[e[0]] -= e[1]);
	recipe?.product?.forEach(e => product[e[0]] += e[1]);
}
var win = () => {
	pause();
	alert('Victory!');
}

// Victory
var check_amount = (amount) => {
	return (resources) => {
		return amount.map((e, i) => resources[i] < e).filter(e => e).length == 0;
	}
}

$(() => {
	game_data = load_game_data();
	player_data = load_player_data();
	load_game(game_data, player_data);
});

console.log('engine.js:stop');

