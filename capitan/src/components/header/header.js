/**
 * Capitan header v1.0.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.Capitan.de/
 *
 * Date: 2017-01-14
 * MIT License (MIT)
 */

const _ = {
		defaults: {
			componentSelector: 'header',
			pluginOptions: {
				selectors: {
					headerMain: '.header__main-wrapper',
					headerMeta: '.header__nav-meta'
				},
				classes: {
					sticky: 'is-header-sticky',
					fixed: 'is-fixed'
				}
			}
		}
	}
;

const o = _.defaults;
let timer;

export function init() {
	if (document.querySelector(o.componentSelector)) {
		const $component = $(o.componentSelector);
		let headerHeight = $(o.componentSelector).outerHeight(true);

		$component.addClass(o.pluginOptions.classes.fixed);
		document.body.style.paddingTop = headerHeight + 'px';

		window.addEventListener('scroll', () => {
			if (window.scrollY > headerHeight && !document.body.classList.contains(o.pluginOptions.classes.sticky)) {
				document.body.classList.add(o.pluginOptions.classes.sticky);
			} else if (window.scrollY === 0) {
				document.body.classList.remove(o.pluginOptions.classes.sticky);
			}
		});

		Capitan.Vars.$window.smartresize(() => {
			headerHeight = $(o.componentSelector).outerHeight(true);
			document.body.style.paddingTop = headerHeight + 'px';
		});
	}
}