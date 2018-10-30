/*
 * Capitan custom-datepicker v1.5.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.Capitan.de/
 *
 * Date: 2017-01-14
 * MIT License (MIT)
 */

const _ = {
	defaults: {
		componentSelector: '.custom-datepicker',
		pluginOptions: {
			settings: {
				locale: 'de',
				enableTime: 'true',
				dateFormat: 'd.m.Y H:i',
				minDate: "today",
				time_24hr: true,
				onOpen: [
					function (selectedDates, dateStr, instance) {
						$(instance.element).addClass('is-active');
					}
				],
				onClose: [
					function (selectedDates, dateStr, instance) {
						$(instance.element).removeClass('is-active');
					}
				]
			},
			selectors: {},
			classes: {},
			callbacks: {},
			errorMessages: {}
		}
	}
};
const o = _.defaults;
const components = $(o.componentSelector);

export function init() {
	if (document.querySelector(o.componentSelector)) {
		import(/* webpackChunkName: "custom-datepicker" */ 'flatpickr/dist/flatpickr.min.css').then(() => {
			import(/* webpackChunkName: "custom-datepicker" */ 'flatpickr').then(flatpickr => {
				import(/* webpackChunkName: "custom-datepicker" */ 'flatpickr/dist/l10n/de').then(() => {
					import(/* webpackChunkName: "custom-datepicker" */ 'flatpickr/dist/plugins/rangePlugin').then(() => {
						console.log("flatpickr init");

						flatpickr.l10ns.default.rangeSeparator = ' - ';

						if (navigator.language) {
							o.pluginOptions.settings.locale = navigator.language.substr(0,2);
						} else if ($('html').attr('lang')) {
							o.pluginOptions.settings.locale = $('html').attr('lang').substr(0,2);
						}
						for (let i = 0; i < components.length; i += 1) {
							const $this = $(components[i]),
								settings = o.pluginOptions.settings,
								$input = $('input[type="date"]', this);

							if ($this.hasClass('custom-datepicker--range')) {
								$.extend(settings, {
									mode: 'range'
								});
							}
							if ($input.data('date-start') && $input.data('date-end')) {
								$.extend(settings, {
									defaultDate: [$input.data('date-start'), $input.data('date-end')]
								});
							}
							flatpickr(o.componentSelector, o.pluginOptions.settings)
						}
					});
				});
			});
		});
	}
}

