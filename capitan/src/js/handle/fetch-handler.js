/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 27.01.2018
 * MIT License (MIT)
 *
 */

const _ = {
	defaults: {
		componentSelector: '[data-fetch]',
		classes: {
			fetching: 'util-fetching'
		}
	}
};

const o = _.defaults;

export default (function () {
	$(o.componentSelector).on('click', function (e) {
		e.preventDefault();

		const $this = $(this);
		const data = $this.data('fetch');

		if (data && data.hasOwnProperty('url') && data.hasOwnProperty('comp') && !$this.hasClass(o.classes.fetching)) {
			$this.addClass(o.classes.fetching);

			fetch(data.url).then(function(response) {
				return response.json();
			}).then(function (response) {
				$this.removeClass(o.classes.fetching);

				import(/* webpackChunkName: "fancybox" */ '@fancyapps/fancybox/dist/jquery.fancybox.min.css').then(() => {
					import(/* webpackChunkName: "fancybox" */ '@fancyapps/fancybox').then(fancybox => {
						if (response.content) {
							$.fancybox.open(response.content, {
								//modal: true
								baseClass: 'fancybox--fetch'
							});
						}

					});
				});
			});
		}
	});
}());

