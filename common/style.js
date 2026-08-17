
class Style {
	static mkTitle(container, title) {
		return title //
			?  $('<div>').addClass(['ui-widget-header', 'ui-corner-top']).html(title).appendTo(container)
			: container;
	}

	static mkWidget(container, title) {
		const div = $('<div>').addClass(['ui-widget', 'ui-widget-content', 'ui-corner-all']) //
			.appendTo(container);
		Style.mkTitle(div, title);
		return div;
	}

	static mkLevel(container) {
		return $('<div>').addClass(['level', 'center']).appendTo(container);
	}

	static mkTabBody(container, title) {
		return Style.mkWidget(Style.mkLevel(container), title);
	}
}

