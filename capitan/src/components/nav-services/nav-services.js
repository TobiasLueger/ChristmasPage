/**
 * Capitan nav-services v1.5.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.Capitan.de/
 *
 * Date: 2017-07-11
 * MIT License (MIT)
 *
 * @see https://github.com/hammerjs/hammer.js
 * @see http://hammerjs.github.io/
 * @see http://hammerjs.github.io/tips/
 *
 * @licence https://github.com/hammerjs/hammer.js/blob/master/LICENSE.md
 *
 */

import assertBreakpoint from '../../js/function/assert-breakpoint';

const _ = {
		defaults: {
			componentSelector: '.nav-services',
			pluginOptions: {
				openOnClick: true,
				selectors: {
					navList: '.nav-services__list',
					navListItems: '.nav-services__list > li > a',
					navListActiveItems: '.nav-services__list > li.is-active',
					navFlyoutLayer: '.nav-services__flyout-layer',
					navOverlay: '.nav-services__overlay',
					flyout: '.nav-services__flyout',
					closeBtn: '.nav-services__close-btn',
					overlayParent: '#page-wrapper',
					navOpen: '.is-nav-services-open'
				},
				classes: {
					navFlyoutLayer: 'nav-services__flyout-layer',
					navOverlay: 'nav-services__overlay',
					navOpen: 'is-nav-services-open'
				},
				callbacks: {},
				errorMessages: {}
			}
		}
	}
	;

const o = _.defaults;

/**
 * add event listeners
 */
function addListeners() {
	let mainNavList = document.querySelectorAll(o.pluginOptions.selectors.navList);

	//console.log($(o.pluginOptions.selectors.navListItems));

	// close flyouts if overlay is clicked / hovered
	$(o.pluginOptions.selectors.navListItems).on('click touchstart', function (event) {
		let $this = $(this),
			flyout = $this.next(o.pluginOptions.selectors.flyout);

		if (!$this.parent().hasClass('is-active') && flyout.length) {
			event.preventDefault();
			// prevent ghost events once if item is not active
			closeFlyouts();
			openFlyout($this, flyout);
		} else {
			closeFlyouts();
		}
	});

	// close flyouts if overlay is clicked / hovered
	$(o.pluginOptions.selectors.navOverlay).on('click', function (event) {
		if (!mainNavList[0].contains(event.target) || event.target === mainNavList[0]) {
			// only close when not on mobile
			if (assertBreakpoint('ht', 'sm')) {
				closeFlyouts();
			}
		}
	});

	// close flyout on close btn click
	$(o.pluginOptions.selectors.closeBtn).on('click', function () {
		closeFlyouts();
	});

	//resize flyoutLayer on smartResize
	Capitan.Vars.$window.smartresize(function () {
		const activeMainNavLinks = document.querySelectorAll(o.pluginOptions.selectors.navListActiveItems),
			flyout = $('> ' + o.pluginOptions.selectors.flyout, activeMainNavLinks);

		resizeFlyoutLayer(flyout);
	});

	Capitan.Vars.$html.on('click', '.is-nav-services-open', function (event) {
		if (!mainNavList[0].contains(event.target) || event.target === mainNavList[0]) {
			// only close when not on mobile
			if (assertBreakpoint('ht', 'sm')) {
				closeFlyouts();
			}
		}
	})
}

/**
 * open flyout
 * @param $item
 * @param flyout
 */
function openFlyout($item, flyout) {

	Capitan.Vars.$body.addClass(o.pluginOptions.classes.navOpen);

	resizeFlyoutLayer(flyout);

	if ($item) {
		$item.parent().addClass('is-active');
	}
}

/**
 * close all submenus
 */
function closeFlyouts() {
	if (Capitan.Vars.$body.hasClass(o.pluginOptions.classes.navOpen)) {
		// get active menu links
		const activeMainNavLinks = document.querySelectorAll(o.pluginOptions.selectors.navListActiveItems);

		// add nav open class
		Capitan.Vars.$body.removeClass(o.pluginOptions.classes.navOpen);

		// close flyout layer
		resizeFlyoutLayer(0);

		if (activeMainNavLinks.length) {
			// remove active class from active links
			for (let i = 0; i < activeMainNavLinks.length; i++) {
				activeMainNavLinks[i].classList.remove('is-active');
			}
		}
	}
}

/**
 * resize flyout layer on opening
 * @param flyout
 */
function resizeFlyoutLayer(flyout) {
	const o = _.defaults;
	let scaleFactor = 0;
	const $flyoutLayer = $(o.pluginOptions.selectors.navFlyoutLayer);

	// if flyout is set, check scale factor
	if (flyout.length) {
		// check height including margins
		const flyoutHeight = flyout[0].clientHeight + parseInt(window.getComputedStyle(flyout[0]).marginTop) + parseInt(window.getComputedStyle(flyout[0]).marginBottom);

		scaleFactor =
			$flyoutLayer.height() > flyoutHeight ?
				$flyoutLayer.height() / flyoutHeight :
				flyoutHeight / $flyoutLayer.height();
	}
	/*
	 default css height ist 1px with scale factor 0
	 e.g. height of flyout is 50px -> scale factor 50/1 = 50,
	 so the layer gets scaled to 50 * 1px = 50px height
	 */
	$flyoutLayer.css('transform', 'scale3d(1 ,' + - scaleFactor + ', 1)');
}

/**
 * append flyout layer and overlay
 */
function appendElements() {
	const o = _.defaults;
	const $mainNav = $(o.componentSelector);
	const flyout = document.createElement('div');
	const overlay = document.createElement('div');

	flyout.classList.add(o.pluginOptions.classes.navFlyoutLayer);
	overlay.classList.add(o.pluginOptions.classes.navOverlay);
	$mainNav.append(flyout);
	$(o.pluginOptions.selectors.overlayParent).append(overlay);
}

/**
 * prevent ghost click and multiple (mouse) events being fired after touch
 * @param $el - interaction element to prevent events for
 */
function preventGhostEvents($el) {
	let lastInteractionTime,
		mouseEvents = ["mousedown", "mouseenter", "mouseleave", "mouseup", "mousemove", "click"],
		touchEvents = ["touchstart", "touchend"];

	function interpert(type, e) {
		// console.log("got tap " + e.type + " of pointer " + type);
		let now = Date.now();

		// console.log('Event-Type: ', e.type);
		if (now - lastInteractionTime <= 50) {
			// console.log("!prevented!");
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			return false;
		}

		lastInteractionTime = now;
	}

	function attachEvents(elist, type) {
		elist.forEach(function (eventName) {
			$el.one(eventName, interpert.bind(null, type));
		});
	}

	attachEvents(mouseEvents, 0);
	// do not prevent touch events, because touchend is fired on iOS when touched again after a few seconds
	// attachEvents(touchEvents, 1);
}

/**
 * Init component
 */
export function init() {
	if (document.querySelector(o.componentSelector)) {
		appendElements();
		addListeners();
	}
}