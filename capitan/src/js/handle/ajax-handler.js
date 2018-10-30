/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 21.08.2018
 * MIT License (MIT)
 *
 * Main ajax handler
 *
 * expert carousell
 * success false => http://www.mocky.io/v2/5b7c17ff2e00005900bfe302
 * success true => http://www.mocky.io/v2/5b7c0dfc2e00008800bfe2c3
 */

import * as slider from '../../components/slider/slider';
import * as select from '../../components/custom-select/custom-select';
import * as animations from '../../components/animations/animations';
import * as pagination from '../../components/pagination/pagination';
import * as tabs from '../../components/tabs/tabs';

const _ = {
	defaults: {
		prefixURL: '',
		pluginOptions: {
			classes: {
				slickInit: 'slick-initialized'
			}
		}
	}
};


const o = _.defaults;

// Promises after DOM has updated
let promiseResolve;
let promiseReject;
const promise = new Promise((resolve, reject) => {
	promiseResolve = resolve;
	promiseReject = reject;
});

export function doAjax(location, ajaxURL, paramString, type, showError, callback) {

	if (!ajaxURL) {
		ajaxURL = '';
	}

	console.log('ajaxURL', ajaxURL);

	if (type && type !== '') {
		// does the URL contain params
		if (ajaxURL.match(/\?./)) {
			ajaxURL += '&type=' + type;
		} else {
			ajaxURL += '?type=' + type;
		}
	}

	console.log('paramString', paramString);

    if (paramString && paramString !== '') {
        // does the URL contain params
        if (ajaxURL.match(/\?./)) {
            ajaxURL += '&' + paramString
        } else {
            ajaxURL += '?' + paramString
        }
    }

	// ajaxURL = 'https://career-stage.mcl.kundenheimat.de/';		// career
	// ajaxURL = 'http://web.poezmen-mdc-cp.brandung-dev.de/';		// pinar
	// ajaxURL = 'http://web.akoehnlein-mdc-cp.brandung-dev.de';		// albrecht

	// test URL for expert finder (TYPE = 1535377457)
	// ajaxURL = 'http://www.mocky.io/v2/5b9fd9103000005b007b13b3';

	// test URL for expert carousel (TYPE = 1527842430)
	// ajaxURL = 'http://www.mocky.io/v2/5b96833030000068000bd310';

	// let tabs = paramString.split('&'),
	// 	tabsSecond = tabs[0].split('=');
    //
	// console.log('tabs', tabs);
	// console.log('tabsSecond', tabsSecond);
    //
	// if (tabsSecond[0] === 'tx_bramediacentermdc_list%5Btype%5D') {
	// 	switch (tabsSecond[1]) {
	// 		case '1':
	// 			ajaxURL = 'http://www.mocky.io/v2/5bb395673300002900cad314';
	// 			break;
	// 		case '2':
	// 			ajaxURL = 'http://www.mocky.io/v2/5bb395ce3300007100cad315';
	// 			break;
	// 		case '3':
	// 			ajaxURL = 'http://www.mocky.io/v2/5bb395fc3300002900cad317';
	// 			break;
	// 		default:
	// 			ajaxURL = 'http://www.mocky.io/v2/5bb395673300002900cad314';
	// 			break;
	// 	}
	// }

	// set showError to false by default
	showError = showError ? showError : false;

	// do the ajax call
	$.ajax({
		url: ajaxURL,
		type: 'post',
		dataType: 'json',

		success: function (data) {
			success(data, callback);
		},

		error: function (data) {
			console.error('Error:', data.statusText);

			// show error notification
			if (showError) {
				// notification('error');
			}
		},

		complete: function (data) {
			if (callback !== "undefined" && typeof callback === "function") {
				callback(data);
			}
		}
	});
}


/**
 * Success Handler
 *
 * @param data
 * @param callback
 */
function success(data, callback) {
	// if response is an array
	if (Array.isArray(data)) {
		data = data[0];
	}

	if (data.success === true) {

		// create data required json format
		if (data.html) {
			updateHTML(data.html);

			// proceed after DOM has been updated
			promise.then(() => {
				if (data.events) {
					triggerEvents(data.events, callback);
				} else {
					fireCallback(callback);
				}
			});
		} else {
			fireCallback(callback);
		}

	} else {
		// show error notification
		// notification('error');
	}
}

/**
 * update HTML container
 *
 * @param arr
 */
function updateHTML(arr) {

	for (let i in arr) {
		if (arr.hasOwnProperty(i)) {
			let key = Object.keys(arr[i])[0];
			let value = arr[i][Object.keys(arr[i])];
			let updateMarkup = true;
			let $dataWrapper = $('[data-wrapper="' + key + '"]');

			console.log(key);

			// add new conditions below
			if (key === 'expertCarousel') {

				// unslick slider before adding new html
				if ($dataWrapper.hasClass(o.pluginOptions.classes.slickInit)) {
					$($dataWrapper).slick('unslick');
				}

			}

			else if (key === 'expertFinder') {

				animations.init(true);

			}

			else if (key === 'mediaContent') {

				animations.init(true);
			}

			if (updateMarkup) {
				if ($dataWrapper.length > 0) {
					// insert new html into container
					$dataWrapper.empty().html(value);
				} else {
					// Fill the $dataWrapper variable, so the reinitialization wont try to reinitialize over an empty element.
					$dataWrapper = $('<div data-wrapper="' + key + '">' + value + '</div>');

					// new data-wrapper, append to body
					$dataWrapper.appendTo($('body'));
				}

				// notification('success');
			}
		}
	}

	// Resolve Promise after DOM has updated
	promiseResolve();

	return true;
}


/**
 * Event Handling
 *
 * Trigger a specific event after AJAX response
 *
 * @param events
 * @param callback
 */
function triggerEvents(events, callback) {

	// trigger each event required json format
	for (let key in events) {

		if (events.hasOwnProperty(key)) {
			let value = events[key];
			const currentEvent = events[key];

			if (typeof value !== 'string' && currentEvent.hasOwnProperty('target')) {
				value = currentEvent.target;
			}

			if (key === 'reInitSlider') {

				// call reinit function at slider component
				slider.reInitSlider(value);

			}

			else if (key === 'reInitSelect') {

				if (value.length > 0) {
					// call reinit function at select component
					for (let i = 0; i <= value.length - 1; i++) {
						select.reInitSelect(value[i].target);
					}
				}

			}

			else if (key === 'reInitPagination') {

				if (value.length > 0) {
					// call reinit function at select component
					for (let i = 0; i <= value.length - 1; i++) {
						pagination.reInitPagination(value[i].target);
					}
				}

			}

			else if (key === 'reInitTabs') {

				// if (value.length > 0) {
				// 	// call reinit function at tabs component
				// 	for (let i = 0; i <= value.length - 1; i++) {
				// 		tabs.reInitTabs(value[i].target);
				// 	}
				// }

			}
		}
	}

	fireCallback(callback);
}

/**
 * fire callback
 * @param callback
 */
function fireCallback(callback) {
	// fire callback depend on type
	if (callback !== 'undefined' && typeof callback === 'function') {
		callback();
	}
}

/**
 * Show notification depend on type
 *
 * @param type
 */
function notification(type) {
	// console.log('notification');

	let notification;

	if (type === 'error') {

		notification = '<div class="notification--error notification--ajax notification is-active">' +
			'<div><strong>Fehler:</strong> Aktion war fehlerhaft.</div>' +
			'</div>';

	} else if (type === 'success') {

		notification = '<div class="notification--success notification--ajax notification is-active">' +
			'<div><strong>Erfolg:</strong> Aktion wurde durchgeführt.</div>' +
			'</div>';

	} else if (type === 'notice') {

		notification = '<div class="notification--notice notification--ajax notification is-active">' +
			'<div><strong>Info:</strong> Aktion war nicht umsetzbar.</div>' +
			'</div>';

	}

	// append new notification at body tag with absolute position via css
	$('body').append(notification);

	// delete notification markup after some seconds
	setTimeout(function () {
		$('body').find('.notification').remove();
	}, 4000);
}