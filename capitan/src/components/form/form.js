/**
* Capitan forms v1.0.0
*
* Copyright brandung GmbH & Co.KG
* http://www.Capitan.de/
*
* Date: 2017-01-14
* MIT License (MIT)
*/

import * as ajaxHandler from '../../js/handle/ajax-handler';

const _ = {
		defaults: {
			componentSelector: 'form',
			pluginOptions: {
				selectors: {
					ajaxForm: '.form--ajax',
					triggerArea: 'input.toggleArea',
					toogleArea: '.data-toggle-area'
				}
			}
		}
	}
;

const o = _.defaults;

/**
 * check remaining input length till maxlength is reached
 * @param elem
 */
function checkLength(elem) {
	const maxCount = $(elem).attr('maxlength');

	$('<small class="form__counter">' + maxCount + ' / ' + maxCount + '</small>').insertAfter($(elem));

	$(elem).on('keyup', function() {
		let currentCount = $(elem).val().length,
			remainingCount = maxCount - currentCount;

		$(elem).next('small').text(remainingCount + ' / ' + maxCount);
	});
}

function bindingEvents() {
	$('body').on('submit', o.pluginOptions.selectors.ajaxForm, function (e) {
		e.preventDefault();
		const _this = this;
		const $this = $(_this);

		if ($this.parsley()) {
			if ($this.parsley().isValid()) {
				_this.classList.add('util-spinner');

				ajaxHandler.doAjax('form.js', $this.attr('action'), $this.serialize(), '', '', function () {
					_this.classList.remove('util-spinner');
				});
			}
		} else {
			console.log('NO VALIDATION - READY FOR AJAX CALL');
		}
	});

	// toggle hidden area at form module
    $(o.pluginOptions.selectors.triggerArea).on('click', function () {
        const _this = this;
        const $this = $(_this);

        $this.closest('.form').find(o.pluginOptions.selectors.toogleArea).toggleClass('util-hidden');
    });
}

function stopSubmit() {
    $(".stopSubmit").bind('keyup', function(event){
        if(event.keyCode === 13){
            event.preventDefault();
            console.log(this.value);
        }
    });
}

export function init() {
	if (document.querySelector(o.componentSelector)) {
		import(/* webpackChunkName: "form-validation" */ 'parsleyjs').then(parsley => {
			import(/* webpackChunkName: "form-validation" */ 'parsleyjs/dist/i18n/de').then(() => {
				import(/* webpackChunkName: "form-validation" */ 'parsleyjs/dist/i18n/de.extra').then(() => {
					const textareas = $('textarea');

					for (let i = 0; i < textareas.length; i += 1) {
						if ($(textareas[i]).attr('maxlength')) {
							checkLength(textareas[i]);
						}
					}

					bindingEvents();

					stopSubmit();
				});
			});
		});
	}
};
