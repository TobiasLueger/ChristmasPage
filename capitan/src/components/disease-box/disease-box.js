/*

Capitan disease-box v1.5.0
*
Copyright brandung GmbH & Co.KG
http://www.Capitan.de/
*
Date: 2017-10-19
MIT License (MIT)
*/

export const bindBoxEvents = () => {
	document.querySelectorAll('.disease-box__close').forEach(button => {
		button.addEventListener('click', event => {
			button.closest('.disease-box').classList.add('disease-box--hidden');
		});
	});
};

export function toggleBox(id) {
	document.querySelectorAll('[data-infobox]').forEach(box => {
		box.getAttribute('data-infobox') !== id
			? box.classList.add('disease-box--hidden')
			: box.classList.remove('disease-box--hidden');
	});
}

export function init() {
	bindBoxEvents();
}
