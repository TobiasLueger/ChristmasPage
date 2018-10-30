/**
 * CountUp v1.8.2
 *
 * Copyright brandung GmbH & Co.KG
 *
 * Date: 2018-07-05
 * MIT License (MIT)
 */

import getViewport from '../../js/function/get-viewport';
import CountUp from 'countup/dist/countUp.min.js';

const _ = {
	defaults: {
		componentSelector: '.countup',
		pluginOptions: {},
		classes: {},
		selectors: {
			counterDigit: '.countup__digit'
		},
		settings: {
			decimals: 0,
			duration: 6,
			options: {
				useEasing: true,
				useGrouping: true,
				separator: '.',
				decimal: ',',
				prefix: '',
				suffix: ''
			}
		}
	}
};
const o = _.defaults;

function initPlugin(component) {
	const counter = component.querySelector(o.selectors.counterDigit),
		target = $(counter).attr('id'),
		startVal = $(counter).data('start') || 0,
		endVal = $(counter).data('end') || 1000;
	let instance = {};

	// check if endval has decimals and set them
	if (endVal.toString().indexOf('.') >= 0) {
		const endValString = endVal.toString(),
			decimalIndex = endValString.indexOf('.'),
			decimalSubString = endValString.substr(decimalIndex, endValString.length - 1),
			decimalLength = decimalSubString.length - 1;

		// Call new plugin instance
		instance = new CountUp(
			target,
			startVal,
			endVal,
			decimalLength,
			o.settings.duration,
			o.settings.options
		);
	} else {
		// Call new plugin instance
		instance = new CountUp(
			target,
			startVal,
			endVal,
			o.settings.decimals,
			o.settings.duration,
			o.settings.options
		);
	}

	// Call plugin method
	$(window).on('scroll', function () {
		if (getViewport.call($(counter)) === true) {
			instance.start();
		}
	});

	if (getViewport.call($(counter)) === true) {
		instance.start();
	}
}

export function init() {
	const components = document.querySelectorAll(o.componentSelector);

	if (navigator && navigator.language) {
		const lang = navigator.language.substr(0, 2);

		if (lang === 'en') {
			Object.assign(o.settings, {
				options: {
					separator: ',',
					decimal: '.'
				}
			});
		}
	}

	for (let i = 0; i < components.length; i += 1) {
		const _this = components[i];

		initPlugin(_this);
	}
}