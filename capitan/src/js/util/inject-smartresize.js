/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 *
 * Resize handler with debounce, should be used for resize handling purposes instead of e.g. $(window).on('resize', ...)
 */
export default (function injectSmartResize($, sr) {
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	const debounce = function debounce(func, threshold, execAsap, ...args) {
		let timeout = null;

		return function debounced() {
			const that = this;

			if (timeout) {
				clearTimeout(timeout);
			} else if (execAsap) {
				func.apply(that, args);
			}

			timeout = setTimeout(() => {
				if (!execAsap) {
					func.apply(that, args);
				}

				timeout = null;
			}, threshold || 100);
		};
	};

	// smartresize
	$.fn[sr] = function bindSmartresize(fn) {
		return fn ? this.on('resize', debounce(fn)) : this.trigger(sr);
	};
}(jQuery, 'smartresize'));
