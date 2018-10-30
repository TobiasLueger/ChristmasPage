/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 20.08.2015
 * MIT License (MIT)
 *
 * Checks if the current breakpoint matches the given condition, e.g.
 * Capitan.currentBreakpoint is 'sm', then import assertBreakpoint from ... and use assertBreakpoint('lt', 'lg')
 * would return true
 *
 * @param {string} operator - lt (lower than), eq (equal), ht (higher than)
 * @param {string} breakpoint - xs, sm, md, lg, xl
 * @return {boolean} breakpoint condition
 */

export default function assertBreakpoint(operator, breakpoint) {
	'use strict';

	const breakpoints = Object.keys(Capitan.Vars.breakpoints),
		curBreakpointIndex = breakpoints.indexOf(
			Capitan.Vars.currentBreakpoint
		),
		conditionalBreakpointIndex = breakpoints.indexOf(breakpoint);

	switch (operator) {
		case 'eq':
			return curBreakpointIndex === conditionalBreakpointIndex;
		case 'lt':
			return curBreakpointIndex < conditionalBreakpointIndex;
		case 'ht':
			return curBreakpointIndex > conditionalBreakpointIndex;
		default:
			return false;
	}
};
