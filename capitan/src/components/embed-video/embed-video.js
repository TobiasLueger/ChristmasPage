/**
 * Capitan embed-video v1.5.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 2015-09-22
 * MIT License (MIT)
 */

const _ = {
	defaults: {
		componentSelector: '.embed-video',
		imageBreakpoint: 'sm',
		selectors: {
			playButton: '.embed-video__play-button',
			placeHolder: '.embed-video__placeholder'
		}
	}
};

const o = _.defaults;

/**
 * embed youtube video
 * @param $placeholder
 * @param id
 * @param url
 */
function createEmbed($placeholder, id, url) {
	const imageSource = 'https://img.youtube.com/vi/' + id + '/sddefault.jpg';
	const iframeSrc = url;

	$placeholder.data('iframe-src', iframeSrc);

	generateEmbed($placeholder, imageSource);
}

/**
 * start html5 video
 * @param $placeholder
 */
function startVideo($placeholder) {
	let video = $placeholder.find('video')[0];

	$placeholder.find(o.selectors.playButton).remove();
	video.play();
}

/**
 * generate embed from data
 * @param $placeholder
 * @param imageSource
 */
function generateEmbed($placeholder, imageSource) {
	// Load the image asynchronously
	let image = new Image();

	// get image from data attribute
	if ($placeholder.data('embed-image') && o.imageBreakpoint) {
		imageSource = handlePlaceholderImages($placeholder);

		Capitan.Vars.$doc.on('on-changed-breakpoint', function () {
			if (!$placeholder.hasClass('is-init')) {
				image.src = handlePlaceholderImages($placeholder);
			}
		});
	}

	image.src = imageSource;

	image.addEventListener('load', function () {
		// calculate image ratio for custom image
		if ($placeholder.data('embed-image')) {
			let ratio = this.height / this.width,
				percentage = ratio * 100 + '%';

			$placeholder.parent().css('padding-top', percentage);
		}

		$placeholder.append(image);
	});

	Capitan.Vars.$body.off('click', o.selectors.placeHolder);
	Capitan.Vars.$body.on('click', o.selectors.placeHolder, function (event) {
        if(event.target.tagName === 'A')
            return;

		event.preventDefault();

		let $this = $(this);

		$this.addClass('is-init');

		if ($this.hasClass('embed-video__placeholder--html5')) {
			startVideo($this);

		} else {
			createIframe.call(this, $this.data('iframe-src'));
		}
	});
}

/**
 * create iframe object
 * @param iframeSrc
 */
function createIframe(iframeSrc) {
	let iframe = document.createElement("iframe");

	iframe.setAttribute("frameborder", "0");
	iframe.setAttribute("allowfullscreen", "");
	iframe.setAttribute("src", iframeSrc);

	this.innerHTML = "";
	this.appendChild(iframe);
}

/**
 * check for custom placeholder image on mobile and desktop
 * @param $placeholder
 * @returns {string}
 */
function handlePlaceholderImages($placeholder) {
	const customImageUrl = $placeholder.data('embed-image'),
		mobileCustomImageUrl = o.imageBreakpoint && $placeholder.data('embed-image-mobile') ? $placeholder.data('embed-image-mobile') : customImageUrl;

	if (Capitan.Function.assertBreakpoint('lt', o.imageBreakpoint)) {
		return mobileCustomImageUrl;
	} else {
		return customImageUrl;
	}
}

/**
 * init embedVideo plugin
 */
function initEmbedVideo() {
	let placeholders = document.querySelectorAll(o.selectors.placeHolder);

	for (let i = 0; i < placeholders.length; i++) {
		let id = $(placeholders[i]).data('embed-id'),
			url = $(placeholders[i]).data('embed-url');

		createEmbed($(placeholders[i]), id, url);
	}
}

/**
 * @constructor
 */
export function init() {
	initEmbedVideo();
}
