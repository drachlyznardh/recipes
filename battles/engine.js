
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
	container.tabs({ active: active || 1, classes: { 'ui-tabs-nav': 'ui-corner-top' } });
	return container;
}

function setupOptions(container) { return options.setup(container); }

function setupBattle(container) {
	const div = Style.mkTabBody(container, 'Battle');
	const group = $('<div>').controlgroup();
	[
		['Skip', ''],
	].map(e => {
		// $(e).appendTo(e);
	});
	return container;
}

function setupExperience(container) {
	return Style.mkTabBody(container, 'Experience');
}

function setupQuests(container) {
	const div = Style.mkTabBody(container, 'Quests');
	[
		'Win a battle',
		'Lose a battle',
	].map(e => $(`<div>`).html(e).appendTo(div));
	return container;
}

function setupChallenges(container) {
	const div = Style.mkTabBody(container, 'Challenges');

	[
		'Win a battle',
		'Lose a battle',
	].map(e => $(`<div>`).html(e).appendTo(div));

	return div;
}

function setup() {
	$('title').html(TITLE);

	const main = $('<div>').addClass('main').appendTo($('body'));
	const tabs = setupTabs([
		['icon:gear', 'Options', 'options'],
		['Battle', 'Battle enemies and gain experience'],
		['Experience', 'Spend experience and gain levels'],
		['Quests', 'Complete quests and unlock bonuses'],
		['Challenges', 'Apply challenges and unlock bonuses'],
	], $('<div>').appendTo(main), 3);
	setupOptions($('#tab-options'));
	setupBattle($('#tab-battle'));
	setupExperience($('#tab-experience'));
	setupQuests($('#tab-quests'));
	setupChallenges($('#tab-challenges'));
}

