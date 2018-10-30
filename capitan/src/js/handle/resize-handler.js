/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 *
 * Main resize handler
 * Sets the currentBreakpoint and currentOrientation variables and sets related classes on the html element;
 * Triggers an event (on document), when the breakpoint has changed
 */
import getBreakpoint from '../function/get-breakpoint';
import getOrientation from '../function/get-orientation';

export default function resizeHandler() {
	const _ = {};

	_.handler = function handler() {
		Capitan.Vars.currentBreakpoint = getBreakpoint();
		Capitan.Vars.currentOrientation = getOrientation();

		let breakpoint = `on-breakpoint-${Capitan.Vars.currentBreakpoint}`;
		let orientation = `on-orientation-${Capitan.Vars.currentOrientation}`;

		if (!Capitan.Vars.$html.hasClass(breakpoint)) {
			Capitan.Vars.$html[0].className = Capitan.Vars.$html[0].className.replace(
				/\s?on-breakpoint-(xs|sm|md|lg|xl)/g,
				'',
			);

			Capitan.Vars.$doc.trigger('on-set-class', [breakpoint]);
			Capitan.Vars.$doc.trigger('on-changed-breakpoint', [
				Capitan.Vars.currentBreakpoint,
			]);
		}

		if (!Capitan.Vars.$html.hasClass(orientation)) {
			Capitan.Vars.$html[0].className = Capitan.Vars.$html[0].className.replace(
				/\s?on-orientation-(landscape|portrait)/g,
				'',
			);

			Capitan.Vars.$doc.trigger('on-set-class', [orientation]);
		}
	};

	// TODO: evaluate if smartresize is triggered on orientationchange
	Capitan.Vars.$window.smartresize(_.handler);
	_.handler();
};
