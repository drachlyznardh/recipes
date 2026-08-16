
class Style {
	static mkTabBody(container, title) {
		const div = $('<div>').addClass(['ui-widget', 'ui-widget-content', 'ui-corner-all']) //
			.appendTo($('<div>').addClass(['level', 'center']).appendTo(container));
		$('<div>').html(title).addClass(['ui-widget-header', 'ui-corner-top']).appendTo(div);
		return div;
	}
}

