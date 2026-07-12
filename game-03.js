console.log('game-03.js:start');

var load_game = (game_data, player_data) => {
	console.log('load_game.start');
	console.log('game_data.length=' + (game_data.length || 0));

	document.title = game_data.title || 'Game Loaded';
	$('#profile').html(player_data.name || '<NO INFO>');
	set_player_points(player_data?.points);

	console.log('load_game.stop');
}
var set_player_points = (points) => { $('#points').html((parseInt(points) || 0) + 'pts'); }

$(() => {
	var game_data = {
		title: 'Il Giochino'
	};
	var player_data = {
		name: 'GODS',
		points: 1337
	};
	load_game(game_data, player_data);
});

console.log('game-03.js:stop');

