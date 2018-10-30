/**
 * Capitan scrolltop.js v1.0.0
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
		componentSelector: '.scrolltop',
		pluginOptions: {
			classes: {
				isVisible: 'is-visible'
			},
		}
	}
};

const o = _.defaults;

/**
 * get position
 *
 * @private
 */
function getPosition() {
	let $this = Capitan.Vars.$doc,
		positionY = $(_.defaults.componentSelector).position().top,
		currentY = $this.scrollTop() + positionY;
	
	return {
		'currY': currentY,
		'posY': positionY
	};
};


/**
 * initialize the component
 * @export function
 */
export function init() {
	let $this = $(o.componentSelector),
		visible = o.pluginOptions.classes.isVisible;
	
	Capitan.Vars.$window.on('scroll', function () {
		if (getPosition().currY > getPosition().posY) {
			$this.addClass(visible);
		} else {
			$this.removeClass(visible);
		}
	});
}
