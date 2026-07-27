
$(() => {
	const gd = load_game_data();

	gd?.scenarios[0]?.resources //
		.forEach((e, i) => console.log(`Resource #${i}: ${e}`));
});

