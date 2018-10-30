/**
 * Capitan accordion.js v1.0.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 27.08.2015
 * MIT License (MIT)
 */

import deepmerge from 'deepmerge';
import assertBreakpoint from '../../js/function/assert-breakpoint';

const _ = {
	defaults: {
		componentSelector: '.accordion, [data-component-accordion], .footer, .expert-listing, .table-block--accordion',

		pluginOptions: {
			selectors: {
				trigger: '.accordion__trigger',
				content: '.accordion__content-wrapper',
				activeTrigger: '.accordion__trigger.is-open',
				activeContent: '.accordion__content-wrapper.is-open'
			},
			classes: {
				trigger: 'accordion__trigger',
				content: 'accordion__content-wrapper'
			},
			active: false,
			expandable: false,
			callbacks: {},
			errorMessages: {}
		}
	}
};

const o = _.defaults;

/**
 * check breakpoints
 * @param accordion
 */
function checkBreakpoint(accordion) {
	//console.log(accordion.breakpoints);

	if ((assertBreakpoint('eq', accordion.breakpoints[0]) || assertBreakpoint('ht', accordion.breakpoints[0])) && assertBreakpoint('lt', accordion.breakpoints[1])) {
		//console.log('PREPARE');
		prepareAccordion(accordion);
		observeEvents(accordion);
	} else {
		resetAccordion(accordion, accordion.options);
	}
}

/**
 * reset accordion
 * @param accordion
 */
function resetAccordion(accordion) {
	const triggers = accordion.querySelectorAll(accordion.options.selectors.trigger);

	for (let i = 0; i < triggers.length; i += 1) {
		const id = triggers[i].dataset.target;
		let content = document.getElementById(id);

		// if content is next dom element
		if (!content) {
			content = triggers[i].nextElementSibling;
		}

		triggers[i].removeEventListener('click', triggerListener);
		triggers[i].classList.remove(o.pluginOptions.classes.trigger);

		if (content) {
			content.classList.remove(o.pluginOptions.classes.content);
			content.style.maxHeight = '';
		}
	}
}

/**
 * prepare accordion
 * @param accordion
 */
function prepareAccordion(accordion) {
	const triggers = accordion.querySelectorAll(accordion.options.selectors.trigger);

	for (let i = 0; i < triggers.length; i += 1) {
		const id = triggers[i].dataset.target;
		let content = document.getElementById(id);

		// if content is next dom element
		if (!content) {
			content = triggers[i].nextElementSibling;
		}

		if (accordion.inlineSettings && content) {
			triggers[i].classList.add(o.pluginOptions.classes.trigger);
			content.classList.add(o.pluginOptions.classes.content);
		}

		triggers[i].accordionContent = content;
	}
}

/**
 * listener for click on trigger
 * @param event
 */
function triggerListener(event) {
	console.log('CLICK!');
	event.preventDefault();
	const accordion = $(event.currentTarget).closest(o.componentSelector);
	triggerContent(event.currentTarget, accordion.get(0));
}

/**
 * observe Events
 *
 * @param {Object} accordion
 */
function observeEvents(accordion) {
	const triggers = accordion.querySelectorAll(accordion.options.selectors.trigger);

	for (let i = 0; i < triggers.length; i += 1) {
		triggers[i].addEventListener('click', triggerListener);
	}
}

/**
 * on breakpoint change
 */
function handleResize() {
	const components = document.querySelectorAll(o.componentSelector);
	const activeItems = document.querySelectorAll(o.pluginOptions.selectors.activeContent);

	for (let i = 0; i < components.length; i += 1) {
		if (components[i].breakpoints.length) {
			checkBreakpoint(components[i]);
		}
	}

	// resize open accordion items
	for (let i = 0; i < activeItems.length; i += 1) {
		activeItems[i].style.maxHeight = `${activeItems[i].scrollHeight}px`;
	}
}

/**
 * open or close elements
 * @param trigger
 * @param accordion
 */
function triggerContent(trigger, accordion) {
	const triggers = accordion.querySelectorAll(accordion.options.selectors.trigger);
	const contents = accordion.querySelectorAll(accordion.options.selectors.content);
	let content = trigger.accordionContent;

	// activate a specific accordion by index
	if (accordion.options.active === true) {
		triggers[accordion.options.active].classList.add('is-open');
		contents[accordion.options.active].style.maxHeight = 'none';
	}

	if (content) {
		if (!trigger.classList.contains('is-open')) {
			// if only one at a time should be open, close the other ones
			if (accordion.options.expandable === false) {
				for (let i = 0; i < triggers.length; i += 1) {
					triggers[i].classList.remove('is-open');
				}

				for (let i = 0; i < contents.length; i += 1) {
					contents[i].classList.remove('is-open');
					contents[i].style.maxHeight = '0';
				}
			}
			
			
			// scroll to triggered content after transition
			$(content).on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
				
				// Remove the event listeners after the animation has ended, to prevent browsers from firing prefixed "transitionend" events as well.
				$(content).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				
				// Set at small timeout to prevent opening and closing animations from interfering with each other.
				setTimeout(function () {
					$('body').stop().animate({
						scrollTop: $(trigger).offset().top
					}, 300);
				}, 300);
			});

			// set classes and content height
			trigger.classList.add('is-open');
			content.classList.add('is-open');
			content.style.maxHeight = `${content.scrollHeight}px`;
		} else {
			// if item was already active -> close it
			trigger.classList.remove('is-open');
			content.classList.remove('is-open');
			content.style.maxHeight = '0';
		}
	}
}

export function init() {
	const components = document.querySelectorAll(o.componentSelector);

	for (let i = 0; i < components.length; i += 1) {
		let inlineSettings = components[i].dataset.componentAccordion ? JSON.parse(components[i].dataset.componentAccordion) : null;

		// initialize accordion for the footer, data-attribute for settings could not be set inside magento
		if (components[i].classList.contains('footer')) {
			inlineSettings = deepmerge(o.pluginOptions, {
				breakpoints: ["xs", "lg"],
				options: {
					selectors: {
						trigger: ".footer__heading"
					}
				}
			});
		}

		if (components[i].classList.contains('expert-listing')) {
			inlineSettings = deepmerge(o.pluginOptions, {
				breakpoints: ["xs", "md"],
				options: {
					selectors: {
						trigger: ".teaser__expert-title"
					}
				}
			});
		}

		if (components[i].classList.contains('table-block--accordion')) {
			inlineSettings = deepmerge(o.pluginOptions, {
				breakpoints: ["xs", "md"],
				options: {
					selectors: {
						trigger: ".col-xs-12:first-of-type"
					}
				}
			});
		}

		let breakpoints = inlineSettings !== null ? inlineSettings.breakpoints : [];
		let options = inlineSettings ? deepmerge(o.pluginOptions, inlineSettings.options) : o.pluginOptions;

		// store data
		components[i].breakpoints = breakpoints;
		components[i].inlineSettings = inlineSettings;
		components[i].options = options;

		if (breakpoints.length) {
			checkBreakpoint(components[i]);
		} else {
			prepareAccordion(components[i]);
			observeEvents(components[i]);
		}

		Capitan.Vars.$window.smartresize(handleResize);
	}
}