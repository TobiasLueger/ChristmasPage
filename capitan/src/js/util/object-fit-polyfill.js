/*
*  Object Fit Polyfill v0.1.0
*
* Fix image element-cover by replacing it with a background image 
* this script is only executed in browser that do not support object fit
*
* Copyright brandung GmbH & Co.KG
* http://www.brandung.de/
*
* Date: 2018-05-24
* MIT License (MIT)
*/

const _ = {
	defaults: {
		componentSelector: '.stage--bg, .col-lg-7 .teaser--health-magazine',
		pluginOptions: {
			selectors: {
				image: '.stage__main-image > img, .teaser__main-image > img'
			}
		}
	}
};
const o = _.defaults;

export default (function objectFitPolyfill() {
	Capitan.Vars.$body.addClass('no-object-fit');

	const components = document.querySelectorAll(o.componentSelector);

	for (let i = 0; i < components.length; i += 1) {
		let $container = $(components[i]),
			imgUrl = $container.find(o.pluginOptions.selectors.image).prop('src');

		if (imgUrl) {
			$container.css('backgroundImage', 'url(' + imgUrl + ')');
		}
	}
}());