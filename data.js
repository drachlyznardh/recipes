
var load_game_data = () => {
	return {
		title: 'Il Giochino',
		version: '0.0.5-dev',
		autoresume: false,
		scenarios: [{
			name: '.5s to victory',
			resources: [{ key: 'dirt', name: 'Dirt' }],
			autoenable: true,
			stepper: [{ name: 'Free dirt', product: [[0, 1]]}],
			victory: check_amount([[0, 5]])
		}, {
			name: 'Two resources',
			resources: [{ key: 'dirt', name: 'Dirt' },
				{ key: 'gold', name: 'Gold' }],
			autoenable: true,
			stepper: [{ name: 'Free dirt', product: [[0, 1]]},
				{ name: 'Found gold', req: [[0, 5]], product: [[1, 1]]}],
			victory: check_amount([[1, 5]])
		}, {
			name: 'Hold on',
			resources: [{ key: 'dirt', name: 'Dirt' },
				{ key: 'gold', name: 'Gold' },
				{ key: 'victory', name: 'Victory' }],
			autoenable: true,
			stepper: [{ name: 'Free dirt', product: [[0, 1]]},
				{ name: 'Found gold', req: [[0, 5]], product: [[1, 1]]},
				{ name: 'Hold on', req: [[0, 50]], product: [[2, 1]]}],
			victory: check_amount([[2, 1]])
		}]
	};
}
var load_player_data = () => {
	return {
		name: 'GODS',
		points: 1337
	};
}

