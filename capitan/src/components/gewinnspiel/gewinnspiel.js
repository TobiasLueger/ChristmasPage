/**
 * Capitan gewinnspiel.js v1.0.0
 *
 *
 *
 * Date: 2018-10-31
 * MIT License (MIT)
 */

const _ = {
	defaults: {
		componentSelector: '.gewinnspiel',

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
 * initialize the component
 * @export function
 */

export function init() {

}
