const _ = {
	defaults: {
		componentSelector: '.switch',
		selectors: {
			input: '.switch input'
		}
	}
};
const o = _.defaults;

import * as cookieHandler from '../../js/handle/cookie-handler';

function enableContrastMode() {
	if (document.getElementById('contrastStylesheet')) {
		document.getElementById('contrastStylesheet').removeAttribute('disabled');
	} else {
		let styleSheetNode = document.createElement('link');
		styleSheetNode.href = Capitan.Vars.folderPath + 'css/contrast.css';
		styleSheetNode.rel = 'stylesheet';
		styleSheetNode.type = 'text/css';
		styleSheetNode.id = 'contrastStylesheet';
		// onload event can be used to display a loader
		// styleSheetNode.onload = () => { console.log('stylesheet loaded) };
		document.body.appendChild(styleSheetNode);
	}
}

function disableContrastMode() {
	if (document.getElementById('contrastStylesheet')) {
		document.getElementById('contrastStylesheet').setAttribute('disabled','disabled');
	}
}

function bindingEvents() {

	// Listen for the change event on the document, as the switch component gets cloned for the mobile view and loses
	// any event binding references.
	document.addEventListener('change', function (event) {
		if (event.target.parentNode.matches(o.componentSelector)) {
			if (event.target.checked) {
				cookieHandler.setCookie('enableHighContrastMode', true);
				enableContrastMode();
			} else {
				cookieHandler.removeCookie('enableHighContrastMode');
				disableContrastMode();
			}
		}
	});
}

export function init() {
	if (document.querySelector(o.componentSelector)) {
		const component = document.querySelector(o.componentSelector);

		// bind events
		bindingEvents(component);

		// check if cookie for contrast theme has been set
		if (cookieHandler.getCookie('enableHighContrastMode')) {
			const switchInput = component.querySelector(o.selectors.input);
			switchInput.checked = true;
			enableContrastMode();
		}
	}
}