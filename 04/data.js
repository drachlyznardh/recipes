
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

