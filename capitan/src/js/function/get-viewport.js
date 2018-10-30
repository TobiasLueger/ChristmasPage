/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 26.10.2015
 * MIT License (MIT)
 */
export default function getViewport() {
	const viewport = {
		top: Capitan.Vars.$window.scrollTop(),
		left: Capitan.Vars.$window.scrollLeft()
	};

	viewport.right = viewport.left + Capitan.Vars.$window.width();
	viewport.bottom = viewport.top + Capitan.Vars.$window.height();

	const bounds = this.offset();
	bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = bounds.top + this.outerHeight();

	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};