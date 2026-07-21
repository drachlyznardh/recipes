
const load_game_data = () => {
	const mk_about = () => {
		const title = 'Recipes';
		const version = '0.0.6';
		const is_release = false;
		const devel_suffix = '-dev';
		const base_url = 'https://github.com/drachlyznardh';
		const project_name = 'recipes';

		const mk_link = (href, name) => `<a href="${href}" target="_blank">${name}</a>`;
		const full_version = is_release ? version : version + devel_suffix;
		const version_link = mk_link( //
			`${base_url}/${project_name}/${is_release ? 'releases/tag/v' + full_version : 'tree/dev'}`, //
			full_version);
		const game_link = mk_link(`${base_url}/${project_name}`, title);
		const author_link = mk_link(base_url, 'DrachLyznardh');

		const jquery_link = mk_link('https://jquery.com/', 'jQuery');
		const jqueryui_link = mk_link('https://jqueryui.com/', 'jQuery UI');

		return [title, //
			`v${full_version}`, //
			`<p>This is version ${version_link} of ${game_link}</p>
				<p>Written by ${author_link} for fun since 2026,
					powered by ${jquery_link} and ${jqueryui_link}</p>`];
	}
	const mk_res = (name, key) => { return { name: name, key: key || name.toLowerCase() }; }
	const mk_ress = (names) => { return names.map(mk_res); }
	[title, version, about] = mk_about();
	return {
		title: title,
		version: version,
		about: about,
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
			name: 'Come back in a minute',
			resources: mk_ress(['Dirt']),
			autoenable: true,
			stepper: [{ name: 'Free dirt', product: [[0, 1]] }],
			victory: check_amount([[0, 600]])
		}, {
			name: 'To the max!',
			resources: mk_ress(['Dirt', 'Gold', 'Glory']),
			autoenable: true,
			stepper: [{ name: 'Free dirt', product: [[0, 1]]},
				{ name: 'Gold traces', req: [[0, 5]], product: [[1, 1]], max: [[1, 10]] },
				{ name: 'Glory', req: [[0, 10]], product: [[2, 1]], max: [[2, 5]] },
				{ name: 'Gold chunks', req: [[0, 50]], product: [[1, 10]] }],
			victory: check_amount([[1, 20], [2, 5]])
		}]
	};
}
const load_player_data = () => {
	return {
		name: 'GODS',
		ranking: 1337
	};
}

