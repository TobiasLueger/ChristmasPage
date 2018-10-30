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

const _ = {
	defaults: {
		componentSelector: '[data-cookie]'
	}
};

const o = _.defaults;

/**
 * retrieve cookie value from cookie name
 * @param name
 * @returns {any}
 */
export function getCookie(name) {
	const regex = new RegExp(name + "=([^;]+)");
	const value = regex.exec(document.cookie);

	return (value != null) ? value[1] : null;
}

/**
 * set cookie with defined attributes
 * @param name
 * @param value
 * @param expires
 */
export function setCookie(name, value, expires) {
	document.cookie = `${name}=${value}${expires ? `;expires=${expires}` : ``}`;
}

/**
 * remove cookie with defined attributes
 * @param name
 */
export function removeCookie(name) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

/**
 * handle click events for cookie triggers
 */
export default function () {
	$('body').on('click', o.componentSelector, function (e) {
		e.preventDefault();

		const $this = $(this);
		const data = $this.data('cookie');

		// check if name and value are set correctly
		if (data && data.hasOwnProperty('name') && data.hasOwnProperty('value')) {
			setCookie(data.name, data.value);
		}
	});
};

