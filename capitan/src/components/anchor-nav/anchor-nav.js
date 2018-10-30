/**
 * Capitan anchor-nav v1.5.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.Capitan.de/
 *
 * Date: 2018-08-21
 * MIT License (MIT)
 *
 */

import * as navMain from '../nav-main/nav-main';
import * as navMobile from '../nav-mobile/nav-mobile';
import getBreakpoint from '../../js/function/get-breakpoint';

const _ = {
	defaults: {
		componentSelector: '.anchor-nav',
		selectors: {
			navContainer: '',
			mobileNav: '.header',
			mobileNavAnchor: '.anchor-nav--mobile',
			anchorNav: '.anchor-nav',
			mainNavTarget: '.nav-main__list > li > a, .nav-main__list > li > span',
			mainNavFlyout: '.nav-main__flyout',
		},
		classes: {
			stickyClass: 'has-anchor',
			activeClass: 'is-active',
			offCanvas: 'off-canvas',
		},
	},
};

const o = _.defaults;
const breakPoint = getBreakpoint();

let oldScroll = 0;
let anchorOffset = 0;
let headerOffset = 0;

_.bindEvents = () => {
	// add scroll functionality to anchor-links
	document.querySelector('body').addEventListener('click', (event) => {
		if (event.target.classList.contains('anchor-link')) {
			const target = event.target.getAttribute('data-target');
			const section = document.querySelector(`.anchor[data-target="${target}"]`);
            const scrollPos = window.pageYOffset;

			if (scrollPos > section.offsetTop) {
                switch (breakPoint) {
                    case 'xs':
                    case 'sm':
                    case 'md':
                    case 'lg':
                        headerOffset = 40;
                        break;
					default:
                        headerOffset = 147;
						break;
                }
			} else {
                switch (breakPoint) {
                    case 'xs':
                    case 'sm':
                    case 'md':
                    case 'lg':
                        headerOffset = -40;
                        break;
                    default:
                        headerOffset = 68;
                        break;
                }
			}

			_.scrollTo(Math.floor(section.offsetTop - headerOffset));
		}
	});

	// handle select2 events
	$('body').on('select2:select', o.selectors.mobileNav, (event) => {
		const target = event.target.value;
		const section = document.querySelector(`.anchor[data-target="${target}"]`);
        const scrollPos = window.pageYOffset;

        if (scrollPos > section.offsetTop) {
            headerOffset = -40;
        } else {
            headerOffset = 40;
        }

        _.scrollTo(Math.floor(section.offsetTop + headerOffset));
	});

	window.addEventListener('scroll', (e) => {
		_.scrollHandler(e);
	});
};

_.scrollHandler = (e) => {
	const scrollPos = window.pageYOffset;
	e.stopPropagation();

	if (scrollPos <= oldScroll) {
        switch (breakPoint) {
            case 'xs':
            case 'sm':
            case 'md':
            case 'lg':
                headerOffset = 80;
                break;
            default:
                headerOffset = 147;
                break;
        }
    } else {
        switch (breakPoint) {
            case 'xs':
            case 'sm':
            case 'md':
            case 'lg':
                headerOffset = 40;
                break;
            default:
                headerOffset = 68;
                break;
        }
	}

	// Check if scrolled by anchor-links
	if (
		scrollPos >= anchorOffset - headerOffset
	) {
		// Append anchor nav to header if not already happened
		if (!document.querySelector('.header .anchor-nav')) {
			$('.anchor-nav--mobile select').select2('destroy');
			document.querySelector('.header').innerHTML += document.querySelector('.anchor-nav').outerHTML;
			$('header .anchor-nav--mobile select').select2({
				minimumResultsForSearch: Infinity,
			});

			// rebind MainNavigation EventListener, because select2 destroyer
			navMain.rebindNavMain();
			navMobile.rebindMobileNav();
		}

		// Toggle nav on/off canvas if anchor is fixed
		if (scrollPos < oldScroll) {
			document.querySelector('.header').classList.remove(o.classes.offCanvas);
		} else {
			document.querySelector('.header').classList.add(o.classes.offCanvas);
		}

		// Changes active item
		const anchors = document.querySelectorAll('.anchor');
		for (let anchor of anchors) {
			if (scrollPos >= (anchor.offsetTop - headerOffset)) {
				const target = anchor.getAttribute('data-target'),
					anchorLink = document.querySelector(`.anchor-link[data-target="${target}"]`).parentElement;

				// remove is-active from all other anchor-links and add it to current active section
				$(anchorLink).siblings().removeClass('is-active');
				anchorLink.classList.add('is-active');

				// on mobile select the current section
				$('#anchor-nav')
					.val(target)
					.trigger('change');
			}
		}

		// Adds anchor class if past anchor point
		document
			.querySelector(o.selectors.mobileNav)
			.classList.add(o.classes.stickyClass);
	} else {
		// Remove anchor class if before anchor point
		document
			.querySelector(o.selectors.mobileNav)
			.classList.remove(o.classes.stickyClass);
	}

	// Update old scroll position
	oldScroll = scrollPos;
};

_.scrollTo = (y) => {
	console.log('scrollTo', y);

	window.scroll({
		top: y,
		left: 0,
		behavior: 'smooth',
	});
};

/**
 * Init component
 */
export function init() {
	anchorOffset = document.querySelector('.anchor-nav').offsetTop;

	console.log('anchorOffset', anchorOffset);

	_.bindEvents();
}
