
class Style {
	static mkTabBody(container, title) {
		const div = $('<div>').addClass(['ui-widget', 'ui-widget-content', 'ui-corner-all']) //
			.appendTo($('<div>').addClass(['level', 'center']).appendTo(container));
		$('<div>').html(title).addClass(['ui-widget-header', 'ui-corner-top']).appendTo(div);
		return div;
	}

	static mkWidget(container, title) {
		const div = $('<div>').addClass(['ui-widget', 'ui-widget-content', 'ui-corner-all']) //
			.appendTo(container);
		if (title) $('<div>').addClass(['ui-widget-header', 'ui-corner-top']).html(title).appendTo(div);
		return div;
	}
}

