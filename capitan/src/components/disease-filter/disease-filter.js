/**
 * Capitan diseases v1.5.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.Capitan.de/
 *
 * Date: 2018-10-04
 * MIT License (MIT)
 *
 */

import preact from 'preact';
import App from './app/DiseaseApp';

const bindEvents = () => {
  preact.render(
  <App />,
  document.querySelector('#disease-filter'));
};

/**
 * Init component
 */
export function init() {

	// TODO: find cleaner way to init fancybox
	import(/* webpackChunkName: "fancybox" */ '@fancyapps/fancybox/dist/jquery.fancybox.min.css').then(() => {
		import(/* webpackChunkName: "fancybox" */ '@fancyapps/fancybox').then(fancybox => {
			setDefaults();
			bindingEvents();
		}).catch(error => 'An error occurred while loading the component');
	});

	bindEvents();
}
