/**
 * Capitan animations.js v1.0.0
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
		componentSelector: '[data-aos], .animations',
		pluginOptions: {}
	}
};

const o = _.defaults;


export function init(refresh) {
	if (document.querySelector(o.componentSelector)) {
		import(/* webpackChunkName: "animations" */ 'aos/dist/aos.css').then(() => {
			import(/* webpackChunkName: "animations" */ 'aos/dist/aos').then(AOS => {

				if (refresh) {
					console.log('AOS refresh');

                    AOS.refresh();
				} else {
                	console.log('AOS init');

					AOS.init();
				}

			});
		});
	}
}