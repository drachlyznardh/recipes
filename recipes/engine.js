
const build_resources = (gd) => {
	const div = $('.resources');
	// div.addClass('ui-widget-header ui-corner-all');
	div.addClass('ui-corner-all');
	$(`<span>Resources</span>
		<div class="controlgroup">
			<input class="expand all" type="button" value="Expand all" />
			<input class="collapse all" type="button" value="Collapse all" />
		</div>`).appendTo(div);
	$('.resources input.expand.all').on('click', () => {
		$('.resource.description').show();
		$('.resource.toggle').addClass('ui-icon-minusthick').removeClass('ui-icon-plusthick')
	});
	$('.resources input.collapse.all').on('click', () => {
		$('.resource.description').hide();
		$('.resource.toggle').addClass('ui-icon-plusthick').removeClass('ui-icon-minusthick')
	});

	const scenario = gd?.scenarios[0];
	scenario?.resources //
		.forEach((e, i) => console.log(`Resource #${i}: ${e}`));
	const recipe_grid = $('.main');
	scenario?.resources //
		.map((e, i) => $(`<div class="resource display">
				<div class="resource name" title="${scenario?.description?.resources.get(e) || ''}">${e}</div>
				<div class="resource description">${e} is a resource</div>
			</div>`)) //
		.forEach(e => e.appendTo(recipe_grid));
	$('.resource.display') //
		.addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all') //
		.find('.resource.name') //
		.addClass('ui-widget-header ui-corner-all') //
		.append('<span class="ui-icon ui-icon-plusthick resource toggle"></span>');
	$('.resource.toggle').on('click', function() {
		$(this) //
			.toggleClass('ui-icon-minusthick ui-icon-plusthick') //
			.closest('.resource.display').find('.resource.description').toggle();
	});
	$('.resource.description').toggle();
	$('.main').sortable({
		handle: '.resource.name',
		cancel: '.resource.toggle',
		placeholder: 'ui-corner-all'
	});
}

$(() => {
	const gd = load_game_data();

	build_resources(gd);

	$('.controlgroup').controlgroup();
	$('.controlgroup.search').controlgroup({
		'items': {
			'button': 'input[type=button], input[type=text], button'
		}
	});

	const r = $('.recipes.sortable');
	Array(25).keys() //
		.map(e => $(`<div style="width: 250px; float: left" class="ui-widget ui-widget-content ui-corner-all">
			<div class="ui-widget-header ui-corner-all">
				<span class="ui-icon ui-icon-arrow-4"></span>
				Recipe ${e}
				<span class="ui-icon ui-icon-plusthick"></span>
			</div>
			<div>Some details about Recipe ${e}</div>
		</div>`)) //
		.forEach(e => e.appendTo(r));

	$('.recipes.sortable').sortable({
		connectWith: '.recipes.sortable',
		grid: [20, 10]
	});

	$('.h, .s, .c, .f').addClass('ui-widget ui-widget-content ui-corner-all');
});

