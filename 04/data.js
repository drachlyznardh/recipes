
var load_game_data = () => {
	return {
		title: 'Il Giochino',
		version: '0.0.4',
		scenarios: [{
			name: '.5s to victory',
			resources: [{ key: 'dirt', name: 'Dirt' }],
			stepper: [{ product: [[0, 1]]}],
			victory: check_amount([[0, 5]])
		}, {
			name: 'Two resources',
			resources: [{ key: 'dirt', name: 'Dirt' },
				{ key: 'gold', name: 'Gold' }],
			stepper: [{ product: [[0, 1]]},
				{ req: [[0, 5]], product: [[1, 1]]}],
			victory: check_amount([[1, 5]])
		}]
	};
}
var load_player_data = () => {
	return {
		name: 'GODS',
		points: 1337
	};
}

