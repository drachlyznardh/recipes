
const load_game_data = () => {
	return {
		scenarios: [{
			resources: ['Dirt', 'Gold', 'Glory'],
			description: {
				resources: new Map([['Dirt', 'Just dirt'],
					['Gold', 'Ohoo! Shiny!'],
					['Glory', 'Glorious']])
			}
		}]
	}
}

