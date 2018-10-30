/**
 * Capitan notification.js v1.0.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 *
 * Date: 2018-05-28
 * MIT License (MIT)
 */

const _ = {
	defaults: {
		componentSelector: '.notification',
		pluginOptions: {
			selector: {
				close: '.notification__close'
			},
			classes: {
				isActive: 'is-active'
			},
		}
	}
};

const o = _.defaults;

/**
 * initialize the component
 * @export function
 */
export function init() {
	let active = o.pluginOptions.classes.isActive;
	
	Capitan.Vars.$doc.on('click', o.pluginOptions.selector.close, o.componentSelector, function (e) {
		e.preventDefault();
		let $this = $(this);
		
		if ($this.closest(o.componentSelector).hasClass(active)) {
			$this.closest(o.componentSelector).removeClass(active);
		}
	});
}
