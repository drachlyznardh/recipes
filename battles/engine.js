
const TITLE = 'Battles'

function setup() {
	$('title').html(TITLE);

	const main = $('<div>').addClass('main').appendTo($('body'));
	const tabs = $('<div>').appendTo(main);
	const ul = $('<ul>').appendTo(tabs);
	$('<li title="Options"><a href="#tab-options"><span class="ui-icon ui-icon-gear"></span></a></li>').appendTo(ul);
	$('<div>').prop('id', 'tab-options').appendTo(tabs);
	[
		['Battle', 'Battle enemies and gain experience'],
		['Experience', 'Spend experience and gain levels'],
		['This', 'Helper text'],
		['That', 'Helper text'],
	].map(e => {
		const selector = `tab-${e[0].toLowerCase()}`;
		$(`<li title="${e[1]}"><a href="#${selector}">${e[0]}</a></li>`).appendTo(ul);
		$('<div>').prop('id', selector).appendTo(tabs);
	});
	tabs.tabs({ active: 1, classes: { 'ui-tabs-nav': 'ui-corner-top' } });
}

