
const TITLE = 'Battles'

function setup() {
	$('title').html(TITLE);

	const main = $('<div>').addClass('main').appendTo($('body'));
	const tabs = $('<div>').appendTo(main);
	const ul = $('<ul>').appendTo(tabs);
	[
		['icon:gear', 'Options'],
		['Battle', 'Battle enemies and gain experience'],
		['Experience', 'Spend experience and gain levels'],
		['This', 'Helper text'],
		['That', 'Helper text'],
	].map(e => {
		const selector = `tab-${e[0].toLowerCase()}`;
		const description = e[0].startsWith('icon:') ? `<span class="ui-icon ui-icon-${e[0].split(':')[1]}"></span>` : e[0];
		$(`<li title="${e[1]}"><a href="#${selector}">${description}</a></li>`).appendTo(ul);
		$('<div>').prop('id', selector).appendTo(tabs);
	});
	tabs.tabs({ active: 1, classes: { 'ui-tabs-nav': 'ui-corner-top' } });
}

