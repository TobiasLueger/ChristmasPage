/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 27.01.2018
 * MIT License (MIT)
 *
 */

const _ = {
	defaults: {
		componentSelector: '[data-handle-touch]'
	}
};

const o = _.defaults;

export default function () {
	if ('ontouchstart' in window) {
		$('body').on('click', o.componentSelector, function (e) {
			const _this = this;
			const className = $(_this).data('handle-touch');

			if (!_this.classList.contains(className)) {
				e.preventDefault();
				_this.classList.add(className);
			}
		});
	}
};

