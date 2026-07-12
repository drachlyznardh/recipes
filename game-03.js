console.log('game-03.js:start');

var load_game = (game_data, player_data) => {
	console.log('load_game.start');
	console.log('game_data.length=' + (game_data.length || 0));

	document.title = game_data.title || 'Game Loaded';
	$('#profile').html(player_data.name || '<NO INFO>');
	set_player_points(player_data?.points); // $('#points').html(player_data.points ? player_data.points + 'pts': '<NO INFO>');

	console.log('load_game.stop');
}
var set_player_points = (points) => {
	$('#points').html(points ? Number.isInteger(points) ? points + 'pts' : points : '<NO INFO>' );
}

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

