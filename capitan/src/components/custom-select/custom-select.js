/*
 * Capitan custom-select v1.5.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.Capitan.de/
 *
 * Date: 2017-01-14
 * MIT License (MIT)
 */

import * as ajaxHandler from '../../js/handle/ajax-handler';
import { toggleBox } from '../disease-box/disease-box';

const _ = {
	defaults: {
		componentSelector: '.custom-select',
		expertSelector: '.slider--expert',
		pluginOptions: {
			settings: {
				minimumResultsForSearch: -1,
				width: '100%'
			},
			selectors: {},
			classes: {},
			callbacks: {},
			errorMessages: {}
		}
	}
};

const o = _.defaults;

/**
 * prepare select fields
 */
function prepareSelect(select) {
	if (select) {
		let $this = $(select),
			settings = {};

		// fresh settings for each item
		$.extend(settings, o.pluginOptions.settings);

		if ($this.data('placeholder')) {
			$.extend(settings, {
				placeholder: {
					id: '',
					text: $this.data('placeholder')
				}
			});
		}

		//extend options depending on selector
		if ($this.hasClass('custom-select--nosearch')) {
			$.extend(settings, {
				minimumResultsForSearch: 20
			});
		}

		//extend options depending on selector
		if ($this.hasClass('custom-select--label')) {
			$.extend(settings, {
				templateSelection: function(state) {
					if (!state.id) {
						return state.text;
					}

					// display label above selected options
					return $(
						'<p class="util-h4 util-reset-margin-bottom util-add-margin-top">' +
							$this.data('label') +
						'</p><span>' +
							state.text +
						'</span>'
					);
				}
			});
		}

		//extend options depending on selector
		if ($this.hasClass('custom-select--filter')) {
			$('select', $this).on('select2:select', function(e) {
				$this.closest('.filter').addClass('util-spinner');

				// reset all select fields to their default state
				let filterFields = $('.custom-select--filter').not($this);

				for (let i = 0; i < filterFields.length; i += 1) {
					// reset select value and update it
					$('select', filterFields[i])
						.val(0)
						.trigger('change');
				}

				if ($this.data('ajax')) {
					let ajaxUrl = $this.data('ajax-url'),
						ajaxParams = $this
							.closest('form')
							.find('input, select')
							.serialize(),
						ajaxType = $this.data('ajax-type'),
						ajaxError = true;

					ajaxHandler.doAjax(
						'custom-select.js',
						ajaxUrl,
						ajaxParams,
						ajaxType,
						ajaxError,
						function() {
							$this
								.closest('.filter')
								.removeClass('util-spinner');
						}
					);
				} else {
					// include fallback here
				}
			});
		}

		if ($this.hasClass('custom-select--redirect')) {
			$('select', $this).on('select2:select', function(e) {
				let redirect = $(this).val();

				if (redirect) {
					window.location.href = redirect;
				}
			});
		}

		// adjustment for parsley validation on focusout
		$('select', $this).on('select2:close', function(e) {
			$(e.target).trigger('focusout');
		});

		// init select2 plugin
		$('select', $this).select2(settings);
	} else {
		$(o.componentSelector).each(function() {
			let _this = this,
				$this = $(_this),
				settings = {};

			// fresh settings for each item
			$.extend(settings, o.pluginOptions.settings);

			if ($this.data('placeholder')) {
				$.extend(settings, {
					placeholder: {
						id: '',
						text: $this.data('placeholder')
					}
				});
			}

			//extend options depending on selector
			if ($this.hasClass('custom-select--nosearch')) {
				$.extend(settings, {
					minimumResultsForSearch: 20
				});
			}

			//extend options depending on selector
			if ($this.hasClass('custom-select--label')) {
				$.extend(settings, {
					templateSelection: function(state) {
						if (!state.id) {
							return state.text;
						}

						// display label above selected options
						return $(
							'<p class="util-h4 util-reset-margin-bottom util-add-margin-top">' +
								$this.data('label') +
							'</p><span>' +
								state.text +
							'</span>'
						);
					}
				});
			}

			//extend options depending on selector
			if ($this.hasClass('custom-select--filter')) {
				$.extend(settings, {
					minimumResultsForSearch: 20
				});

				$('select', $this).on('select2:select', function(e) {
					$this.closest('.filter').addClass('util-spinner');

					// reset all select fields to their default state
					let filterFields = $('.custom-select--filter').not($this);

					for (let i = 0; i < filterFields.length; i += 1) {
						// reset select value and update it
						$('select', filterFields[i])
							.val(0)
							.trigger('change');
					}

					if ($this.data('ajax')) {
						let ajaxUrl = $this.data('ajax-url'),
							ajaxParams = $this
								.closest('form')
								.find('input, select')
								.serialize(),
							ajaxType = $this.data('ajax-type'),
							ajaxError = true;

						ajaxHandler.doAjax(
							'custom-select.js',
							ajaxUrl,
							ajaxParams,
							ajaxType,
							ajaxError,
							function() {
								$this
									.closest('.filter')
									.removeClass('util-spinner');
							}
						);
					} else {
						// include fallback here
					}
				});
			}

			if ($this.hasClass('custom-select--redirect')) {
				$('select', $this).on('select2:select', function(e) {
					let redirect = $(this).val();

					if (redirect) {
						window.location.href = redirect;
					}
				});
			}

			if ($this.hasClass('custom-select--disease-filter')) {
				$.extend(settings, {
					minimumResultsForSearch: 1
				});

				$('select', $this).on('select2:select', function(e) {
					const value = $(this).val();

					// check if Value is a Number (NaN is never equal to NaN)
					if (Number(value) === Number(value)) {
						toggleBox(value);
					} else {
						window.location.href = value;
					}
				});
			}

			// adjustment for parsley validation on focusout
			$('select', $this).on('select2:close', function(e) {
				$(e.target).trigger('focusout');
				_this.classList.remove('is-open');
			});

			// add class when opening to be able to identify opened select boxes
			$('select', $this).on('select2:open', function(e) {
				_this.classList.add('is-open');
			});

			// init select2 plugin
			$('select', $this).select2(settings);
		});
	}
}

/**
 * re init select
 * @param select
 */
export function reInitSelect(select) {
	if (document.querySelector(select)) {
		let language = $('html').attr('lang');

		// set language for plugin messages
		if (language && language !== '') {
			$.extend(o.pluginOptions.settings, {
				language: language
			});
		}

		//init the plugin
		prepareSelect(select);
	}
}

/**
 * destroy select
 * @param select
 */
export function destroySelect(select) {
	$(select).select2('destroy');
}

/**
 * empty select
 * @param select
 */
export function emptySelect(select) {
	$(select).empty();
}

/**
 * update select options
 * @param select
 * @param value
 * @param data
 */
export function updateSelect(select, value, data) {
	if (data) {
		$(select).append(data);
	}
}

export function init() {
	if (document.querySelector(o.componentSelector)) {
		import(/* webpackChunkName: "custom-select" */ 'select2/dist/css/select2.min.css').then(
			() => {
				import(/* webpackChunkName: "custom-select" */ './custom-select.scss').then(
					() => {
						import(/* webpackChunkName: "custom-select" */ 'select2').then(
							select2 => {
								import(/* webpackChunkName: "custom-select" */ 'select2/dist/js/i18n/de').then(
									() => {
										let language = $('html').attr('lang');

										// set language for plugin messages
										if (language && language !== '') {
											$.extend(o.pluginOptions.settings, {
												language: language
											});
										}

										//init the plugin
										prepareSelect();
									}
								);
							}
						);
					}
				);
			}
		);
	}
}
