
var load_game_data = () => {
	var mk_res = (name, key) => { return { name: name, key: key || name.toLowerCase() }; }
	var mk_ress = (names) => { return names.map(mk_res); }
	return {
		title: 'Il Giochino',
		version: '0.0.6-dev',
		autoresume: true,
		scenarios: [{
			name: '.5s to victory',
			resources: mk_ress(['Dirt']),
			autoenable: true,
			stepper: [{ name: 'Free dirt', product: [[0, 1]]}],
			victory: check_amount([[0, 5]])
		}, {
			name: 'Two resources',
			resources: mk_ress(['Dirt', 'Gold']),
			autoenable: true,
			stepper: [{ name: 'Free dirt', product: [[0, 1]]},
				{ name: 'Found gold', req: [[0, 5]], product: [[1, 1]]}],
			victory: check_amount([[1, 5]])
		}, {
			name: 'Hold on',
			resources: mk_ress(['Dirt', 'Gold', 'Glory']),
			autoenable: true,
			stepper: [{ name: 'Free dirt', product: [[0, 1]]},
				{ name: 'Found gold', req: [[0, 5]], product: [[1, 1]]},
				{ name: 'Hold on', req: [[0, 50]], product: [[2, 1]]}],
			victory: check_amount([[2, 1]])
		}, {
			name: 'To the max!',
			resources: mk_ress(['Dirt', 'Gold']),
			autoenable: true,
			stepper: [{ name: 'Free dirt', product: [[0, 1]], max: [[0, 5]] }],
			victory: check_amount([[0, 10]])
		}, {
			name: 'Come back in a minute',
			resources: mk_ress(['Dirt']),
			autoenable: true,
			stepper: [{ name: 'Free dirt', product: [[0, 1]] }],
			victory: check_amount([[0, 600]])
		}]
	};
}
var load_player_data = () => {
	return {
		name: 'GODS',
		points: 1337
	};
}

