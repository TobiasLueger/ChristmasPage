/**
 * Capitan tabs.js v1.0.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 *
 * Date: 2018-08-14
 * MIT License (MIT)
 */

import * as ajaxHandler from '../../js/handle/ajax-handler';

const _ = {
	defaults: {
		componentSelector: '.tabs',

		classes: {
			isActive: 'active',
            tabsMedia: 'tabs--media',
            tabsRedirect: 'tabs--redirect',
            filter: 'filter'
		},

		selectors: {
			tabsWrapper: '.tabs__wrapper',
			tabsDropdown: '.tabs__dropdown',
            componentItem: '.tabs__navigation li',
            formPagination: '.form--pagination',
            customSelect: '.custom-select'
		},

		pluginOptions: {
            settings: {
                mouseevent: 'click',
                attribute: 'href',
                animation: false,
                active: 1
            },
            settingsRedirect: {
                mouseevent: 'click',
                attribute: 'href',
                animation: false,
                active: 0
            }
		}
	}
};

const o = _.defaults;


/**
 * Initialize Tabs
 *
 * @desc Initializes each tab component.
 */
function initializeTabs() {
    let settings = {};

	const $tabsComponents = $(o.componentSelector);

	$tabsComponents.each(function () {
		const $tabsComponent = $(this);
		const $tabsDropdown = $tabsComponent.find(o.selectors.tabsDropdown).find('select');
		const $tabsWrapper = $tabsComponent.find(o.selectors.tabsWrapper);

		// Bind events
		$tabsDropdown.on('change', function (event) {
            if ($tabsComponent[0].classList.contains(o.classes.tabsRedirect)) {
                handleRedirect(event);
            } else {
                handleDropdownChange(event);
			}
		});

        if ($tabsComponent[0].classList.contains(o.classes.tabsRedirect)) {
            Object.assign(settings, o.pluginOptions.settings, o.pluginOptions.settingsRedirect);
        } else {
            Object.assign(settings, o.pluginOptions.settings);
        }

		// Initialize the tab plugin
        $tabsWrapper.tabslet(settings);
	});
}


/**
 * Handle Dropdown Change
 *
 * @param event
 */
function handleDropdownChange(event) {
	const $accordingTabNavItem = $('[href="#' + event.target.value + '"]');

	$accordingTabNavItem.trigger('click');
}


/**
 * Handle Redirect
 *
 * @param event
 */
function handleRedirect(event) {
    window.location.href = event.target.value;
}


/**
 * re init tabs
 */
export function reInitTabs() {
    initializeTabs();
}


/**
 * initialize the component
 * @export function
 */
export function init() {
	if (document.querySelector(o.componentSelector)) {
		import(/* webpackChunkName: "tabs" */ 'tabslet/jquery.tabslet.min').then(tabslet => {
			import(/* webpackChunkName: "tabs" */ '../custom-select/custom-select').then(() => {

				// Initialize the tab component.
				initializeTabs();
			});
		});
	}
}
