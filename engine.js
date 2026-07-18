console.log('engine.js:start');

var load_game = (game_data, player_data) => {
	console.log('load_game.start');

	document.title = game_data?.title || 'Game Loaded';
	set_player_name(player_data?.name);
	set_player_points(player_data?.points);
	set_scenario_list(game_data?.scenarios);
	set_version(game_data?.version);
	toggle_reset(true);
	toggle_pause_resume(false, false);

	console.log('load_game.stop');
}
var set_player_name = (name) => { $('#profile').html(name || '<NO INFO>'); }
var set_player_points = (points) => { $('#points').html((parseInt(points) || 0) + 'pts'); }
var set_scenario_list = (scenarios) => {
	var scenario = $('#scenario');
	scenarios //
		.map((e, i) => $(`<option value="${i}">${e.name}</option>`)) //
		.forEach(e => e.appendTo(scenario));
}
var set_version = (v) => { $('.version').html('v' + v); }
var chat = (msg) => { console.log(msg); $('.chat').html('<[' + msg + ']>'); }
var desc_res = (res) => { return res?.map(e => e[1] + ' ' + resources[e[0]].name)?.join(', '); }
var desc_rec = (rec) => { return [desc_res(rec?.req), desc_res(rec?.product)] //
		.filter(e => e) //
		.join(' to '); }
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
	setTimeout(() => load_scenario(game_data?.scenarios[scenario]), 100);

	console.log('reset.stop');
}
var load_scenario = (scenario) => {

	resources = scenario.resources;
	load_div_as_table('.resources_display', 2, 'Resources', resources, (e, i) => {
		return $(`<tr>
				<td class="label"><label for="r${i}">${e.name}</label></td>
				<td><input id="r${i}" name="r${i}" value="0" disabled /></td>
			</tr>`);
	});
	storage = scenario.resources.map(e => 0);

	scenario.stepper.forEach(e => e.disabled = true);
	stepper = scenario.stepper;
	load_div_as_table('.recipes_display', 3, 'Recipes', stepper, (e, i) => {
		return $(`<tr>
				<td class="label"><label for="c${i}">${e.name}</label></td>
				<td><input id="c${i}" type="checkbox"
				${e?.disabled?'':'checked'} onclick="toggle_recipe(${i})"/></td>
				<td class="desc">${desc_rec(e)}</td>
			</tr>`);
	});

	victory = scenario.victory();
	has_yet_to_win = true;

	$('.board').show();
	if (game_data.autoresume) resume(); else pause();
}
var load_div_as_table = (selector, column_count, title, input, row) => {
	$(selector).html('<table>');
	var table = $(selector + ' > table');
	$(`<tr><td class="title" colspan="${column_count}">${title}</td></tr>`).appendTo(table);
	input.map(row).forEach(e => e.appendTo(table));
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

	var product = storage.map((e, i) => 0);
	stepper.forEach(e => handle_recipe(e, storage, product));
	product.forEach((e, i) => storage[i] += e);
	storage.forEach((e, i) => $('input[name=r' + i + ']').val(e));
	storage.forEach((e, i) => console.log('resource#' + i + ': ' + e));

	var is_victory = victory(storage);

	if (is_victory && has_yet_to_win) setTimeout(win, 100);
	else if (is_running) setTimeout(run, 100);

	console.log('run.stop');
}
var handle_recipe = (recipe, storage, product) => {
	if (recipe?.disabled
		|| recipe?.req?.some(e => storage[e[0]] < e[1])
		|| recipe?.product?.some(e => e.length > 2 && storage[e[0]] >= e[2])
	) return;
	// Handle max? Recipe does not yield above certain amount of product
	recipe?.req?.forEach(e => storage[e[0]] -= e[1]);
	recipe?.product?.forEach(e => product[e[0]] += e[1]);
/*
	chat([desc_res(recipe?.req), desc_res(recipe?.product)] //
		.filter(e => e) //
		.join(' to '));
*/
	chat(desc_rec(recipe));
}
// var toggle_recipe = (i) => { stepper[i].disabled = !$(`c${i}`).val(); }
var toggle_recipe = (i) => {
	console.log(stepper[i]);
	console.log(stepper[i].disabled);
	console.log($(`#c${i}`).is(':checked'));
	stepper[i].disabled = !$(`#c${i}`).is(':checked');
	console.log(stepper[i].disabled);
}
var win = () => {
	pause();
	has_yet_to_win = false;
	$('.victory_condition').html('You won!');
	alert('Victory!');
}

// Victory
var check_amount = (amount) => {
	return () => {
		$('.victory_condition').html(`Reach ${desc_res(amount)} to obtain victory`);
		return (storage) => { return amount?.every(e => storage[e[0]] >= e[1]); }
	}
}

$(() => {
	game_data = load_game_data();
	player_data = load_player_data();
	load_game(game_data, player_data);
});

console.log('engine.js:stop');

