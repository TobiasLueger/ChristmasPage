/**
 * Capitan nav-mobile.js v1.5.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 03.02.2017
 * MIT License (MIT)
 *
 * @module navMobile
 */

import assertBreakpoint from '../../js/function/assert-breakpoint';

const _ = {
	defaults: {
		componentSelector: '.nav-mobile',
		clonedComponentSelector: '.nav-mobile.mm-menu',
		overlaySelector: '.mm-page__blocker',
		customItemSelector: '.nav-mobile__item, .nav-meta > ul:first-child > li',
		activeClass: 'is-active',
		navbarBottomSelector: '.mm-navbars_bottom',
		navbarTopSelector: '.mm-navbars_top',
		panelSelector: '.mm-panels',

		pluginOptions: {
			selectors: {
				menuToggle: '.nav-mobile__toggle',
				nodesToRemove: '.list--quicklinks',
				nodesToStrip: 'div'
			},
			classes: {
				menuIsOpen: 'is-open'
			},
			callbacks: {},
			errorMessages: {},
			i18n: {
				'Close submenu': 'Zurück'
			}
		},

		mmenuOptions: {
			extensions: [
				"position-top",
				"fullscreen",
				"fx-listitems-drop",
				"border-offset"
			],
			navbars: [],
			autoHeight: true
		},

		mmenuConfiguration: {
			classNames: {
				vertical: 'nav-mobile__vertical',
				fixedElements: {
					fixed: "mm-fixed",
					sticky: "mm-sticky"
				}
			}
		}
	}
};

const o = _.defaults;
let menuApi = {};


/**
 * Bind events.
 *
 */
function bindEvents() {
	// right, left click and touch on overlay should reset active class of menu trigger
	$(o.overlaySelector).on('click contextmenu touchstart', function () {
		close();
	});

	$(o.pluginOptions.selectors.menuToggle).on('click', function (e) {
		e.preventDefault();

		let $this = $(this);

		if ($this.hasClass(o.activeClass)) {
			$this.removeClass(o.activeClass);
			close();
		} else {
			$this.addClass(o.activeClass);
			open();
		}

		handleNavbarHeight();
	});

    if (assertBreakpoint('lt', 'lg') && !$(o.componentSelector).hasClass('js-init')) {
		if (menuApi !== undefined) {
			// close menu if trigger is inactive after opening has finished
			menuApi.bind("opened", function () {
				if (!$(o.pluginOptions.selectors.menuToggle).hasClass(o.activeClass)) {
					close();
				}
			});

			console.log('bindEvents 2');

			// open menu if trigger is active after closing has finished
			menuApi.bind("closed", function () {
				if ($(o.pluginOptions.selectors.menuToggle).hasClass(o.activeClass)) {
					open();
				}
			});
		}
	}

	Capitan.Vars.$window.smartresize(() => {
		handleNavbarHeight();
	});
}

/**
 * recalculate navbar footer height and set bottom and top values of navbar panel
 * so menu panel does not get cut off
 */
function handleNavbarHeight() {
	if ($(o.navbarBottomSelector).length) {
		$(o.panelSelector).css('bottom', $(o.navbarBottomSelector).outerHeight() + 'px');
	}

	if ($(o.navbarTopSelector).length) {
		$(o.panelSelector).css('top', $(o.navbarTopSelector).outerHeight() + 'px');
	}
}

/**
 * public methods
 */
export function close() {
	$(o.pluginOptions.selectors.menuToggle).removeClass(o.activeClass);
	menuApi.close();
}

export function open() {
	$(o.pluginOptions.selectors.menuToggle).addClass(o.activeClass);
	menuApi.open();
}

export function rebindMobileNav() {
	bindEvents();
}

/**
 * add item to mobile navigation
 * @param item
 * @param target
 * @param position
 */
function addMenuItem(item, target, position) {
	if (position && position === 'before') {
		$(target).find(".mm-listview").prepend('<li class="mm-custom-item">' + item + '</li>');
	} else {
		$(target).find(".mm-listview").append('<li class="mm-custom-item">' + item + '</li>');
	}

	menuApi.initPanels($(target));
}

/**
 * add a navbar to the menu
 * @param position
 * @param $content
 * @param nodeType
 * @param nodeClass
 */
function addNavbar(position, $content, nodeType, nodeClass) {
	let navbar = {},
		className = nodeClass ? nodeClass : '';

	navbar.position = position;
	navbar.content = [];

	$content.each(function () {
		let $this = $(this);

		navbar.content.unshift('<' + nodeType + ' class="' + className + '">' + $this.html() + '</' + nodeType + '>');
	});

	o.mmenuOptions.navbars.push(navbar);
}

/**
 * init plugin
 * @param $componentElements
 * @param initOptions
 * @memberOf module:navMobile
 * @see https://github.com/FrDH/jQuery.mmenu
 *
 * @example
 * $('.menu-selector').mmenu();
 *
 */
function initPlugin($componentElements, initOptions) {
	if (assertBreakpoint('lt', 'lg') && !$(o.componentSelector).hasClass('js-init')) {

		import(/* webpackChunkName: "nav-mobile" */ 'jquery.mmenu/dist/jquery.mmenu.all.css').then(() => {
			import(/* webpackChunkName: "nav-mobile" */ 'jquery.mmenu').then(mmenu => {
				let $mainNavMobile = $(o.componentSelector).clone().removeAttr('class'),
					$nodesToDelete = $(o.pluginOptions.selectors.nodesToRemove, $mainNavMobile),
					$nodesToStrip = $(o.pluginOptions.selectors.nodesToStrip, $mainNavMobile);

				// add init to component
				$(o.componentSelector).addClass('js-init');

				// Remove unneeded html nodes from the cloned navigation.
				if ($nodesToDelete.length) {
					$nodesToDelete.remove();
				}
				
				// Strip unneeded wrapping html nodes from the cloned navigation.
				if ($nodesToStrip.length) {
					$nodesToStrip.each(function () {
						
						let first = $(this).find('span')[0];
						
						if ((typeof(first) != "undefined")) {
							$(this).find('span')[0].innerHTML = first.innerText + '&nbsp;';
						}
						
						$(this).replaceWith(function () {
							return $('> *', this);
						});
					});
				}

				// Update the id of the cloned menu.
				$mainNavMobile.attr('id', 'nav-mobile');

				// Prepend the cloned menu inside the page wrapper that is defined for the mmenu plugin.
				//$(o.mmenuConfiguration.offCanvas.pageSelector).prepend($mainNavMobile);

				// add a navbar
				addNavbar('top', $('.nav-meta__flyout--search'), 'div', 'nav-mobile__meta-search');

				addNavbar('bottom', $('.nav-meta__flyout--language'), 'div', 'nav-mobile__meta-language');
				addNavbar('bottom', $('.nav-meta__flyout--fontsize'), 'div', 'nav-mobile__meta-contrast');
				
				// translations
				if (o.pluginOptions.i18n) {
					$['mmenu'].i18n(o.pluginOptions.i18n);
				}

				// Finally initialize the plugin.
				$mainNavMobile.mmenu(o.mmenuOptions, o.mmenuConfiguration);

				// store the plugin API
				menuApi = $mainNavMobile.data('mmenu');

				// append all custom menu items
				if ($(o.customItemSelector).length) {
					$(o.customItemSelector).each(function () {
						let $this = $(this);
						addMenuItem($this.html(), '#mm-0', $this.data('mobile-position'));
					});
				}

				// Bind events.
				bindEvents();
			});
		});
	}
}

export function init() {
	if (document.querySelector(o.componentSelector)) {
		// init the plugin
		initPlugin($(o.componentSelector));

		// check on changed breakpoint
		Capitan.Vars.$doc.on('on-changed-breakpoint', function () {
			initPlugin($(o.componentSelector));
		});
	}
}
