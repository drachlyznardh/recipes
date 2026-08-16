
const TITLE = 'Battles'
const options = new Options();

function setupTabs(list, container, active) {
	const ul = $('<ul>').appendTo(container);
	list.map(e => {
		const selector = `tab-${e.length > 2 ? e[2] : e[0].toLowerCase()}`;
		const description = e[0].startsWith('icon:') ? `<span class="ui-icon ui-icon-${e[0].split(':')[1]}"></span>` : e[0];
		$(`<li title="${e[1]}"><a href="#${selector}">${description}</a></li>`).appendTo(ul);
		$('<div>').prop('id', selector).appendTo(container);
	});
	container.tabs({ active: active || 0, classes: { 'ui-tabs-nav': 'ui-corner-top' } });
	return container;
}

function setupOptions(container) {
	const div = $('<div>').addClass(['ui-widget', 'ui-widget-content', 'ui-corner-all']) //
		.appendTo($('<div>').addClass(['level', 'center']).appendTo(container));
	$('<div>').html('Options').addClass(['ui-widget-header', 'ui-corner-top']).appendTo(div);
	const group = $('<div>').controlgroup();
	[
		['Skip', ''],
	].map(e => {
		// $(e).appendTo(e);
	});
	return container;
}

function setup() {
	$('title').html(TITLE);

	const main = $('<div>').addClass('main').appendTo($('body'));
	setupTabs([
		['icon:gear', 'Options', 'options'],
		['Battle', 'Battle enemies and gain experience'],
		['Experience', 'Spend experience and gain levels'],
		['This', 'Helper text'],
		['That', 'Helper text'],
	], $('<div>').appendTo(main), 0);
	// setupOptions($('#tab-options'));
	options.graphics($('#tab-options'));
}

