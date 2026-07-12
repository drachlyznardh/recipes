console.log('game-03.js:start');

var load_game_data = () => {
	return {
		title: 'Il Giochino',
		scenarios: [{
			name: '.5s to victory',
			resources: [{ key: 'dirt', name: 'Dirt'}],
			stepper: [[[], 1]],
			victory: check_amount([5])
		}]
	};
}
var load_player_data = () => {
	return {
		name: 'GODS',
		points: 1337
	};
}
var load_game = (game_data, player_data) => {
	console.log('load_game.start');

	document.title = game_data?.title || 'Game Loaded';
	set_player_name(player_data?.name);
	set_player_points(player_data?.points);
	set_scenario_list(game_data?.scenarios);

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

function reset() {
	console.log('reset.start');
	console.log('game_data', game_data);
	console.log('reset.stop');
}

// Victory
var check_amount = (amount) => {
	return (resources) => {
		amount.map((e, i) => resources[i] < e).filter(e => e).length == 0;
	}
}

$(() => {
	var game_data = load_game_data();
	var player_data = load_player_data();
	load_game(game_data, player_data);
});

console.log('game-03.js:stop');

