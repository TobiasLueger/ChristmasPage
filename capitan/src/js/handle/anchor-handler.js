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

const _ = {};
const scrollOffset = 0;

/**
 * scroll to target
 * @param $target
 */
function checkTarget ($target) {
	const $header = $('.header');
	let headerHeight = 0;
	let scrollDistance = 0;

	// if header exists and is fixed
	if ($header.length && $header.css('position') === 'fixed') {
		headerHeight = $header.outerHeight(true);
	}

	// if not target is set as a parameter -> scroll to top of the page
	if ($target !== undefined && $target.length) {
		// if target exists
		scrollDistance = $target.offset().top - headerHeight - scrollOffset;
		scrollTo(scrollDistance);
	} else {
		scrollTo(scrollDistance);
	}
}

function scrollTo (scrollDistance) {
	$('html, body').animate({
		scrollTop: scrollDistance
	}, 400);
}

export default (function () {
	'use strict';

	if (window.location.hash) {
		checkTarget($(window.location.hash));
	}

	$('body').on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		const $this = $(this);
		const href = $this.attr('href');

		if (href === '#top') {
			checkTarget();
		} else if (href.length > 1) {
			checkTarget($(href));
		}
	});
}());