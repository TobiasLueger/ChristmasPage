/*
* Capitan cookie-layer v1.5.0
*
* Copyright brandung GmbH & Co.KG
* http://www.brandung.de/
*
* Date: 2016-01-20
* MIT License (MIT)
*/

const _ = {
	defaults: {
		componentSelector: '.cookie-layer',
		pluginOptions: {
			$containerHeader: $('.cookie-layer'),
			$closeLayer: $('.cookie-layer__close'),
			expireCookie: 9999
		}
	}
};
const o = _.defaults;

/**
 * get cookie helper
 *
 * @public
 * @param name of cookie
 * @param decode
 * @returns {*}
 */
function getCookie(name, decode) {
	const nameEQ = name + '=',
		ca = document.cookie.split(';');
	let c = null;

	if (decode === undefined) {
		decode = false;
	}

	for (let i = 0; i < ca.length; i++) {
		c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(nameEQ) === 0) {
			if (decode) {
				return decodeURIComponent(c.substring(nameEQ.length, c.length));
			} else {
				return c.substring(nameEQ.length, c.length);
			}

		}
	}
	return null;
}

/**
 * set cookie helper
 *
 * @public
 * @param name of cookie
 * @param value of cookie
 * @param days expired
 * @param encode
 * @returns {boolean}gr
 *
 */
function setCookie(name, value, days, encode) {
	const date = new Date();
	let expires = '';

	if (days) {
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = '; expires=' + date.toGMTString();
	}

	if (encode === undefined) {
		encode = false;
	}

	if (encode) {
		document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
	} else {
		document.cookie = name + '=' + value + expires + '; path=/';
	}

	return true;
}

export function init() {
	try {
		if (!getCookie('cookieAccepted')) {
			$(o.componentSelector).addClass('is-active');

			o.pluginOptions.$closeLayer.on('click', function () {
				setCookie('cookieAccepted', true, o.pluginOptions.expireCookie);
				$(o.componentSelector).removeClass('is-active');
			});
		}
	} catch (e) {
	}
}
