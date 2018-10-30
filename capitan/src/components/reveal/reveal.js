/**
 * Capitan reveal.js v1.0.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 2016-06-03
 * MIT License (MIT)
 */


//private functions / properties
const _ = {
	defaults: {
		componentSelector: '.reveal',
		selectors: {
			trigger: '.reveal__trigger',
			triggerText: '.reveal__trigger-text',
			content: '.reveal__content',
			header: '.header'
		},
		classes: {
			open: 'is-open'
		},
		data: {
			open: 'open'
		}
	}
};

const o = _.defaults;


/**
 * Bind events
 *
 */
function bindEvents () {
	Capitan.Vars.$body.on('click', o.selectors.trigger, function () {
		toggle($(this));
	});
}


/**
 * scroll to target
 * @param $target
 */
function scrollTo($target) {
    $('html, body').animate({
        scrollTop: $target.offset().top - $(o.selectors.header).outerHeight(true)
    }, 300);
}


/**
 * Toggle the content
 *
 * @param $trigger
 * @param stayopen
 */
function toggle($trigger, stayopen) {
	let $reveal = $trigger.parent(),
		$revealContent = $trigger.prev(o.selectors.content).length > 0 ? $trigger.prev(o.selectors.content) : $trigger.next(o.selectors.content),
		maxHeight = $revealContent.prop('scrollHeight');

	if (stayopen && $reveal.hasClass(o.classes.open)) return;

    $reveal.toggleClass(o.classes.open);

    if (!$reveal.hasClass(o.classes.open)) {
        scrollTo($reveal);
	}

	// Change wording
	let tmp = $trigger.data(o.data.open);
	
	$trigger.data(o.data.open, $trigger.find(o.selectors.triggerText).text());
	$trigger.find(o.selectors.triggerText).text(tmp);
	
	// Check if the reveal component is open.
	if ($reveal.hasClass(o.classes.open)) {
		$revealContent.css('max-height', maxHeight);
	} else {
		$revealContent.removeAttr('style');
	}
}


/**
 * public methods
 *
 * @public
 */

export function	open($trigger) {
	toggle($trigger, true);
}


/**
 * Init component
 *
 * @public
 * @param settings
 */
export function init() {
	console.log('Init: reveal');
	
	// Init the plugin
	bindEvents();
}

