
var dbg = is_debug ? console.log : (msg) => {}
var log = console.log;
var now = () => new Date().getTime();

var load_game = (game_data, player_data) => {
	var loading_since = now();

	const title = game_data?.title || 'Game Loaded';
	document.title = title;
	set_player_name(player_data?.name);
	set_player_points(player_data?.points);
	set_scenario_list(game_data?.scenarios);
	const version = game_data?.version || 'v0.0.x-dev';
	set_version(version);
	toggle_reset(true);
	configure_buttons();
	configure_panels();
	configure_about(title, version, game_data?.about || '');
	pause(); // is_running = false; toggle_running();

	log(`Done loading in ${time_desc(now() - loading_since)}`);
}
var set_player_name = (name) => { $('#profile').val(name || '<NO INFO>'); }
var set_player_points = (points) => { $('#points').val((parseInt(points) || 0) + 'pts'); }
var set_scenario_list = (scenarios) => {
	var scenario = $('#scenario');
	scenarios //
		.map((e, i) => $(`<option value="${i}">${e.name}</option>`)) //
		.forEach(e => e.appendTo(scenario));
}
var set_version = (v) => { $('.version').val(v); }
var chat = (msg) => { dbg(msg); $('.chat').val(msg); }
var desc_res = (res) => { return res?.map(e => e[1] + ' ' + resources[e[0]].name)?.join(', '); }
var desc_rec = (rec) => { return [[desc_res(rec?.req), desc_res(rec?.product)] //
		.filter(e => e) //
		.join(' to '), desc_res(rec?.max)] //
		.filter(e => e) //
		.join(' up to '); }
const toggle_reset = (v) => { $('input[name=reset]').toggle(v); }
const toggle_running = () => { if (is_running) pause(); else resume(); }
const configure_buttons = () => {
	$('input[type=button]').button();
	$('select').selectmenu();
	$('.controlgroup').controlgroup();
	$('.victory.condition') //
		.on('click', () => $('.victory.recap').dialog('open'));
	$('.version') //
		.on('click', () => $('.about').dialog('open'));
}
var configure_panels = () => {
	$('.popup.open').dialog({ autoOpen: true });
	$('.popup.noopen').dialog({ autoOpen: false });
	$('.popup.modal').dialog({ modal: true });
	$('.popup.nomodal').dialog({ modal: false });
	$('.popup.resize').dialog({ resizable: true });
	$('.popup.noresize').dialog({ resizable: false });
}
const configure_about = (title, version, about) => {
	$('.about') //
		.html(about) //
		.dialog({ title: `About ${title} ${version}`,
			width: 600 });
}

var reset = () => {
	dbg('reset.start');

	dbg('game_data', game_data);
	var scenario = $('select[name=scenario]').val();
	dbg('scenario=' + scenario);
	setTimeout(() => load_scenario(game_data?.scenarios[scenario]), short_break);

	dbg('reset.stop');
}
var load_scenario = (scenario) => {
	pause();

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
	rounds_played = 0;
	rounds_away = 0;

	$('.board').show();
	last_reset_at = now();
	is_running = game_data.autoresume;
	toggle_running();
}
var load_div_as_table = (selector, column_count, title, input, row) => {
	$(selector).html('<table>');
	var table = $(selector + ' > table');
	$(`<tr><td class="title" colspan="${column_count}">${title}</td></tr>`).appendTo(table);
	input.map(row).forEach(e => e.appendTo(table));
}
var pause = () => {
	is_running = false;
	$('input[name=toggle]').val('Resume');
}
var resume = () => {
	is_running = true;
	$('input[name=toggle]').val('Pause');
	last_run_at = now();
	setTimeout(run, short_break);
}
var run = () => {
	dbg('run.start');

	if (is_running) {
		var is_victory = false;
		var rounds_left = Math.floor((now() - last_run_at) / round_break);
		rounds_away += rounds_left -1;
		while (rounds_left--) {
			var product = storage.map((e, i) => 0);
			stepper.forEach(e => handle_recipe(e, storage, product));
			product.forEach((e, i) => storage[i] += e);

			rounds_played++;
			last_run_at = now();
			is_victory = has_yet_to_win && victory(storage);

			if (is_victory) {
				render_storage();
				setTimeout(win, short_break);
				break;
			}
		}

		if (!is_victory && is_running) {
			render_storage();
			setTimeout(run, round_break);
		}

		dbg(`Round_played#${rounds_played} run at ${now()}`);
	}

	dbg('run.stop');
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
var render_storage = () => {
	storage.forEach((e, i) => $('input[name=r' + i + ']').val(e));
	storage.forEach((e, i) => dbg('resource#' + i + ': ' + e));
}
var win = () => {
	pause();
	has_yet_to_win = false;
	var time_played = rounds_played * round_break; var desc_played = time_desc(time_played);
	var time_elapsed = now() - last_reset_at; var desc_elapsed = time_desc(time_elapsed);
	var time_paused = time_elapsed - time_played; var desc_paused = time_desc(time_paused);
	var time_away = rounds_away * round_break; var desc_away = time_desc(time_away);
	const table = $('<table>');
	[
		['played', time_played],
		['elapsed', time_elapsed],
		['paused', time_paused],
		['away', time_away]
	].forEach(e => $(`<tr><td class="label">Time ${e[0]}:</td><td>${time_desc(e[1])}</td></tr>`).appendTo(table));
	table.appendTo($('.victory.recap') //
		.html(false) //
		.dialog({ title: 'Victory!' }) //
		.dialog('open'));
	$('.victory.condition') //
		.val('You won!') //
		.attr('title', 'You won!') //
		.show();
}
var time_desc = (timems) => {
	if (timems < 1000) return 'less than a second';
	else if (timems < 60000) return `${Math.floor(timems / 1000)}.${Math.floor(timems / 100) % 10} seconds`;
	else {
		var aday = 86400, anhour = 3600, aminute = 60;
		times = Math.floor(timems / 1000);
		var plural = (n, v) => v ? `${v} ${n}${v > 1 ? 's' : ''}` : false;
		var commas = (l) => {
			if (l?.length > 2) return `${l.slice(0, -1).join(', ')} and ${l[l.length -1]}`;
			else if (l?.length > 1) return `${l[0]} and ${l[1]}`;
			else if (l?.length > 0) return l[0];
		}
		return commas([
			days = plural('day', Math.floor(times / aday)),
			hours = plural('hour', Math.floor((times % aday) / anhour)),
			minutes = plural('minute', Math.floor((times % anhour) / aminute)),
			seconds = plural('second', times % 10)
		].filter(e => e));
	}
}
var test_time_desc = () => {
	[9, 10, 28, 36, 60, 65, 588, 600, 605, 610, 3500, 3600, 3605, //
		10000, 10010, 100000, 100010, 1000000, 1000010, 10000000, 10000010 //
	].map(e => e * round_break).forEach(e => dbg(`time_desc(${e}) => ${e * round_break}ms => ${time_desc(e)}`));
}

// Victory
var check_amount = (amount) => {
	return () => {
		const desc = `Reach ${desc_res(amount)} to obtain victory`;
		$('.victory.condition') //
			.val(desc) //
			.attr('title', desc) //
			.show();
		$('.victory.recap') //
			.html(desc) //
			.dialog({ title: 'Victory condition' });
		return (storage) => { return amount?.every(e => storage[e[0]] >= e[1]); }
	}
}

$(() => {
	game_data = load_game_data();
	player_data = load_player_data();
	load_game(game_data, player_data);
});

