const _ = {
	defaults: {
		componentSelector: '[data-fancybox], .fancybox',
		selectors: {
			openSelectFields: '.custom-select.is-open'
		}
	}
};

const o = _.defaults;

/**
 * afterLoad event callback
 * @param instance
 * @param current
 */
function afterLoad(instance, current) {
	// fix for Select2 -> Select2 dropdowns do not close when clicking inside fancybox or closing it
	instance.$refs.container.on('click', function (event) {
		// check if the current instance contains open select boxes
		if (this.querySelector(o.selectors.openSelectFields)) {
			const openedSelectFields = this.querySelectorAll(o.selectors.openSelectFields);

			for (let i = 0; i < openedSelectFields.length; i += 1) {
				const selectField = openedSelectFields[i].querySelector('select');

				// Check if Select2 has been initialized and only close dropdowns if they are already opened --> do not close the dropdown that we just opened
				if (selectField.classList.contains('select2-hidden-accessible') && openedSelectFields[i] !== $(event.target).closest('.custom-select')[0]) {
					// Close select dropdown if it is open
					$(selectField).select2('close');
				}
			}
		}
	});
}

/**
 * afterShow event callback
 * @param instance
 * @param current
 */
function afterShow(instance, current) {
	// check for forms inside fancybox that need to be initialized
	if (instance.$refs.container[0].querySelector('.form[data-validate="true"]:not(.js-init)')) {
		import(/* webpackChunkName: "form-validation" */ '../form/form-validation').then((component) => {
			component.init();
		});
	}
}

function setDefaults() {
	$.fancybox.defaults.spinnerTpl = '<div class="util-spinner"></div>';
	$.fancybox.defaults.btnTpl.arrowLeft = '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow-left" title="{{PREV}}"></button>';
	$.fancybox.defaults.btnTpl.arrowRight = '<button data-fancybox-next class="fancybox-button fancybox-button--arrow-right" title="{{NEXT}}"></button>';
	$.fancybox.defaults.touch = false;
	$.fancybox.defaults.afterLoad = afterLoad;
	$.fancybox.defaults.afterShow = afterShow;
}

function bindingEvents() {
	Capitan.Vars.$body.on('click', '.fancybox__close', function (e) {
		e.preventDefault();
		$.fancybox.close(true);
	});
}

export function updateContent(newContent) {
	$.fancybox.getInstance().setContent($.fancybox.getInstance().current, newContent);
}

export function init() {
	if (document.querySelector(o.componentSelector)) {
		import(/* webpackChunkName: "fancybox" */ '@fancyapps/fancybox/dist/jquery.fancybox.min.css').then(() => {
			import(/* webpackChunkName: "fancybox" */ '@fancyapps/fancybox').then(fancybox => {
				setDefaults();
				bindingEvents();
			}).catch(error => 'An error occurred while loading the component');
		});
	}
}
