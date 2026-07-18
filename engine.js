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
var desc_rec = (rec) => { return [[desc_res(rec?.req), desc_res(rec?.product)] //
		.filter(e => e) //
		.join(' to '), desc_res(rec?.max)] //
		.filter(e => e) //
		.join(' up to '); }
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
	pause();
	setTimeout(() => load_scenario(game_data?.scenarios[scenario]), short_break);

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

	var enabler = (scenario.autoenable) ? (e) => e.disabled = false : (e) => e.disabled = true;
	scenario.stepper.forEach(enabler);
	stepper = scenario.stepper;
	load_div_as_table('.recipes_display', 3, 'Recipes', stepper, (e, i) => {
		return $(`<tr>
				<td class="label"><label for="c${i}">${e.name}</label></td>
				<td><input id="c${i}" type="checkbox" ${e?.disabled?'':'checked'} onclick="toggle_recipe(${i})"/></td>
				<td class="desc">${desc_rec(e)}</td>
			</tr>`);
	});

	victory = scenario.victory();
	has_yet_to_win = true;
	rounds = 0;

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
	setTimeout(run, short_break);
}
var run = () => {
	console.log('run.start');

	if (is_running) {
		var product = storage.map((e, i) => 0);
		stepper.forEach(e => handle_recipe(e, storage, product));
		product.forEach((e, i) => storage[i] += e);
		storage.forEach((e, i) => $('input[name=r' + i + ']').val(e));
		storage.forEach((e, i) => console.log('resource#' + i + ': ' + e));

		rounds++;
		var is_victory = victory(storage);

		if (is_victory && has_yet_to_win) setTimeout(win, short_break);
		else if (is_running) setTimeout(run, round_break);
	}

	console.log('run.stop');
}
var handle_recipe = (recipe, storage, product) => {
	if (recipe?.disabled
		|| recipe?.req?.some(e => storage[e[0]] < e[1])
		|| recipe?.product?.some(e => e.length > 2 && storage[e[0]] >= e[2])
		|| recipe?.max?.some(e => storage[e[0]] >= e[1])
	) return;
	recipe?.req?.forEach(e => storage[e[0]] -= e[1]);
	recipe?.product?.forEach(e => product[e[0]] += e[1]);
	chat(desc_rec(recipe));
}
var toggle_recipe = (i) => { stepper[i].disabled = !$(`#c${i}`).is(':checked'); }
var win = () => {
	pause();
	has_yet_to_win = false;
	$('.victory_condition').html('You won!');
	var time_desc = (rounds) => {
		var timems = rounds * round_break;
		if (timems < 1000) return 'less than a second';
		else if (timems < 60000) return `${Math.floor(timems /
			1000)}.${Math.floor(timems / 100) % 10}seconds`;
		else {
			times = Math.floor(timems / 1000);
			var aday = 86400;
			var anhour = 3600;
			var aminute = 60;
			var plural = (n, v) => v ? `${v}${n}${v > 1 ? 's' : ''}` : false;
			var commas = (l) => {
				if (l?.length > 2) return `${l.slice(0, -1).join(', ')} and ${l[l.length -1]}`;
				else if (l?.length > 1) return `${l[0]} and ${l[1]}`;
				else if (l?.length > 0) return l[0];
			}
			days = plural('day', Math.floor(times / aday));
			hours = plural('hour', Math.floor((times % aday) / anhour));
			minutes = plural('minute', Math.floor((times % anhour) / aminute));
			seconds = plural('second', times % 10);
			return commas([days, hours, minutes, seconds].filter(e => e));
			return commas([days, hours, minutes, seconds].map(plural).filter(e => e));
			return [days, hours, minutes, seconds].map(plural).filter(e => e).join(' ');
			return [fdays, fhours, fminutes].filter(e => e).join(' ');
			return `${Math.floor(timems / 1000)}s`;
		}
	}
	var test_time_desc = () => {
		[9, 10, 28, 36, 60, 65, 588, 600, 605, 3500, 3600, 3605, //
			10000, 100000, 1000000 //
			].forEach(e => console.log(`time_desc(${e})=${time_desc(e)}`));
	}
	test_time_desc();
	alert(`Victory! You won in ${time_desc(rounds)}`);
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

