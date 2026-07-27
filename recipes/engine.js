
$(() => {
	const gd = load_game_data();

	gd?.scenarios[0]?.resources //
		.forEach((e, i) => console.log(`Resource #${i}: ${e}`));
	const recipe_grid = $('.main');
	gd?.scenarios[0]?.resources //
		.map((e, i) => $(`<div class="resource display">
				<div class="resource name">${e}</div>
				<div class="resource description">${e} is a resource</div>
			</div>`)) //
		.forEach(e => e.appendTo(recipe_grid));
	$('.resource.display') //
		.addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all') //
		.find('.resource.name') //
		.addClass('ui-widget-header ui-corner-all') //
		// .prepend('<span class="ui-icon ui-icon-minusthick resource toggle"></span>');
		.append('<span class="ui-icon ui-icon-minusthick resource toggle"></span>');
	$('.resource.toggle').on('click', function() {
		const icon = $(this);
		console.log('Toggle');
		console.log(icon);
		icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
		const display = icon.closest('.resource.display');
		console.log(display);
		const description = display.find('.resource.description');
		console.log(description);
		description.toggle();
	});
	$('.main').sortable({
		handle: '.resource.name',
		cancel: '.resource.toggle',
		placeholder: 'ui-corner-all'
	});
});

