/*
* Capitan formValidation v1.5.0
*
* Copyright brandung GmbH & Co.KG
* http://www.Capitan.de/
*
* Date: 2018-01-23
* MIT License (MIT)
*/

const _ = {
	defaults: {
		componentSelector: '.form[data-validate="true"]:not(.js-init)',
		pluginOptions: {
			selectors: {},
			classes: {},
			callbacks: {},
			errorMessages: {}
		}
	}
};

const o = _.defaults;

/**
 * init parsley validation
 * @param component
 */
export function initPlugin(component) {
	window.Parsley.on('form:init', function (instance) {
		instance.element.classList.add('js-init');
	});

	$(component).parsley({
		trigger: 'focusout',
		errorClass: 'is-invalid',
		successClass: 'is-valid',
		excluded: '.util-hidden input, .util-hidden select, .util-hidden textarea',
		classHandler: function (el) {
			return el.$element.closest('.form__field-wrapper'); //working
		},
		errorsContainer: function (ParsleyField) {
			return ParsleyField.$element.attr("title");
		},
		errorsWrapper: false
	}).on('field:error', function (fieldInstance) {
		let currentInput = fieldInstance.$element;
		const parentForm = fieldInstance.parent.element;
		
		console.log(fieldInstance);
		
		// append tooltip to select wrapper if select field is hidden
		if (currentInput.hasClass('select2-hidden-accessible')) {
			currentInput = currentInput.parent();
		}
		
		// append tooltip to label for checkbox or radio inputs if they are hidden
		if (currentInput.attr('type') === 'checkbox' || currentInput.attr('type') === 'radio') {
			currentInput = currentInput.next('label');
		}
		
		// initialize tooltip
		if (!currentInput.hasClass("tooltipstered")) {
			currentInput.tooltipster({
				trigger: 'click',
				position: 'top',
				updateAnimation: 'scale',
				distance: 0,
				theme: 'tooltipster-error',
				content: ParsleyUI.getErrorsMessages(fieldInstance)
			});
		} else if (currentInput.tooltipster('content')[0] !== ParsleyUI.getErrorsMessages(fieldInstance)[0]) {
			// update tooltip content if error message has changed
			currentInput.tooltipster('content', ParsleyUI.getErrorsMessages(fieldInstance));
		}
		
		// open tooltip if it is not already opened
		if (!parentForm.classList.contains('js-tooltip-after-submit')) {
			if (parentForm.classList.contains('js-validating')) {
				// add class to indicate that one tooltip has been opened after submitting the form
				parentForm.classList.add('js-tooltip-after-submit');
				
				// only open tooltip for first invalid field
				setTimeout(function () {
					if (currentInput.hasClass("tooltipstered")) {
						currentInput.tooltipster('open');
					}
				}, 200);
				
			} else if (!currentInput.tooltipster('instance').status().open) {
				// open tooltip (e.g. on blur) with delay if it is not already opened
				setTimeout(function () {
					if (currentInput.hasClass("tooltipstered")) {
						currentInput.tooltipster('open');
					}
				}, 200);
			}
		}
		
	}).on('field:success', function (fieldInstance) {
		let currentInput = fieldInstance.$element;
		
		// remove tooltip from select wrapper on success
		if (currentInput.hasClass('select2-hidden-accessible')) {
			currentInput = currentInput.parent();
		}
		
		// remove tooltip from label for checkbox or radio inputs on success
		if (currentInput.attr('type') === 'checkbox' || currentInput.attr('type') === 'radio') {
			currentInput = currentInput.next('label');
		}
		
		// destroy tooltip on success
		if (currentInput.hasClass("tooltipstered")) {
			currentInput.tooltipster('destroy');
		}
	}).on('form:validate', function (instance) {
		// remove tooltip shown class to reset tooltip display
		instance.element.classList.remove('js-tooltip-after-submit');
		// add js-validating class to indicate that form is validating
		instance.element.classList.add('js-validating');
	}).on('form:validated', function (instance) {
		// remove js-validating class when form is validated
		instance.element.classList.remove('js-validating');
		
		if (instance.validationResult) {
			instance.$element[0].dispatchEvent(new Event('is-validate-success'));
		} else {
			instance.$element[0].dispatchEvent(new Event('is-validate-error'));
		}
	});
	
	// fix transition label overlay value
	// if value is set, keep focused label position on top by add/remove focused class
	$('input, textarea', component).on('change', function (e) {
		const $this = $(this);
		
		if ($this.val() !== '') {
			$this.focus();
			$this.addClass('focused');
		} else {
			$this.removeClass('focused');
		}
	});
	
	// used for custom selects with select2 implementation
	// select2 triggers select change events -> after that validate with parsley
	$('select', component).on('change', function (e) {
		const $this = $(this);
		
		$this.parsley().validate();
	});
}

export function init() {
	if (document.querySelector(o.componentSelector)) {
		import(/* webpackChunkName: "form-validation" */ 'tooltipster/dist/css/tooltipster.bundle.min.css').then(() => {
			import(/* webpackChunkName: "form-validation" */ 'tooltipster/dist/js/tooltipster.bundle.min').then(tooltipster => {
				import(/* webpackChunkName: "form-validation" */ 'parsleyjs').then(parsley => {
					import(/* webpackChunkName: "form-validation" */ 'parsleyjs/dist/i18n/de').then(() => {
						import(/* webpackChunkName: "form-validation" */ 'parsleyjs/dist/i18n/de.extra').then(() => {
							const components = $(o.componentSelector);

							for (let i = 0; i < components.length; i += 1) {
								initPlugin(components[i]);
							}
						});
					});
				});
			});
		});
	}
}
