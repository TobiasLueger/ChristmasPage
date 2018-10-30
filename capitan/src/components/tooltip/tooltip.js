/*
* Capitan tooltipster v1.5.0
*
* Copyright brandung GmbH & Co.KG
* http://www.brandung.de/
*
* Date: 2016-01-20
* MIT License (MIT)
*/

import tooltipster from 'tooltipster/dist/js/tooltipster.bundle.min';
import 'tooltipster/dist/css/tooltipster.bundle.min.css';

const _ = {
	defaults: {
		componentSelector: '.tooltipster',
		pluginOptions: {}
	}
};
const o = _.defaults;

export default function () {
	console.log('Tooltipster init');
}