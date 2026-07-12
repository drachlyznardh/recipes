console.log('game-03.js:start');

var load_game_data = () => {
	return {
		title: 'Il Giochino'
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

	console.log('load_game.stop');
}
var set_player_name = (name) => { $('#profile').html(name || '<NO INFO>'); }
var set_player_points = (points) => { $('#points').html((parseInt(points) || 0) + 'pts'); }

$(() => {
	var game_data = load_game_data();
	var player_data = load_player_data();
	load_game(game_data, player_data);
});

console.log('game-03.js:stop');

