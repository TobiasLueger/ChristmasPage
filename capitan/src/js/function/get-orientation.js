/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 *
 * Returns the current orientation
 *
 * @return {string} - portrait or landscape
 */
export default function getOrientation() {
	'use strict';

	let windowWidth = window.innerWidth,
		windowHeight = window.innerHeight,
		orientation = '';

	if (windowWidth <= windowHeight) {
		orientation = 'portrait';
	} else {
		orientation = 'landscape';
	}

	return orientation;
};
