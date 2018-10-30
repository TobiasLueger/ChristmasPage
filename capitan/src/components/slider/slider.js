/**
 * Slider v0.1.0
 *
 * Copyright brandung GmbH & Co.KG
 *
 * Date: 2017-01-31
 * MIT License (MIT)
 */

import assertBreakpoint from '../../js/function/assert-breakpoint';

const _ = {
		defaults: {
			componentSelector: '.slider',
			sliderExpert: '.slider--expert',
            teaserCaption: '.teaser__caption',
			pluginOptions: {
				classes: {
                    slickSlide : '.slick-slide',
                    slickActive: '.slick-active'
				},
				selectors: {
                    slickVisible: 'slick-visible'
				},
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					mobileFirst: true,
                    infinite: false,
					dots: true,
					arrows: false,
					prevArrow: '<button type="button" class="slider__arrow slider__arrow--prev">Previous</button>',
					nextArrow: '<button type="button" class="slider__arrow slider__arrow--next">Next</button>',
					dotsClass: 'slider__dots'
                },
				settingsInitMD: {
					responsive: [
						{
							breakpoint: Capitan.Vars.breakpoints.xs,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: false,
								adaptiveHeight: true
							}
						},
						{
							breakpoint: Capitan.Vars.breakpoints.md,
							settings: {
                                arrows: true,
								dots: true,
                                infinite: true,
								slidesToShow: 2,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: Capitan.Vars.breakpoints.lg,
							settings: 'unslick'
						}
					]
				},
                settingsTestimonial: {
                    responsive: [
                        {
                            breakpoint: Capitan.Vars.breakpoints.xs,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows: false,
                                dots: true,
                                adaptiveHeight: true
                            }
                        },
                        {
                            breakpoint: Capitan.Vars.breakpoints.sm,
                            settings: {
                                arrows: true,
								dots: true
                            }
                        }
                    ]
                },
				settingsExpert: {
					responsive: [
						{
							breakpoint: Capitan.Vars.breakpoints.xs,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: false,
								dots: true,
								adaptiveHeight: true
							}
						},
						{
							breakpoint: Capitan.Vars.breakpoints.sm,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                arrows: true,
                                dots: true,
                                infinite: true,
                                adaptiveHeight: true
                            }
						},
						{
							breakpoint: Capitan.Vars.breakpoints.md,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                arrows: true,
                                dots: true,
                                infinite: true,
                                adaptiveHeight: true
                            }
						}
					]
				},
				settingsNews: {
					responsive: [
						{
							breakpoint: Capitan.Vars.breakpoints.sm,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: false,
								dots: true,
                                adaptiveHeight: true
							}
						},
						{
							breakpoint: Capitan.Vars.breakpoints.md,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                arrows: true,
                                dots: false,
                                infinite: true,
                                adaptiveHeight: true
                            }
						},
						{
							breakpoint: Capitan.Vars.breakpoints.lg,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                arrows: true,
                                dots: false,
                                infinite: true,
                                adaptiveHeight: true
                            }
						}
					]
				},
				settingsDisease: {
                    settings: 'unslick',
					responsive: [
                        {
                            breakpoint: Capitan.Vars.breakpoints.xs,
                            settings: {
                                arrows: false,
								dots: true
                            }
                        },
						{
							breakpoint: Capitan.Vars.breakpoints.sm,
							settings: {
								rows: 2,
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: true,
								dots: true,
                                infinite: true,
								adaptiveHeight: true
							}
						},
						{
							breakpoint: Capitan.Vars.breakpoints.lg,
							settings: {
								rows: 2,
								slidesToShow: 2,
								slidesToScroll: 2,
								arrows: true,
								dots: true,
                                infinite: true,
								adaptiveHeight: true
							}
						}
					]
				},
				settingsSpecialarea: {
					settings: 'unslick',
					responsive: [
                        {
                            breakpoint: Capitan.Vars.breakpoints.xs,
                            settings: {
                                arrows: false,
								dots: true,
                            }
                        },
						{
							breakpoint: Capitan.Vars.breakpoints.sm,
							settings: {
								centerMode: true,
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: true,
								dots: true,
                                infinite: true,
								adaptiveHeight: true
							}
						}
					]
				},
				settingsRegular: {
					responsive: [
                        {
                            breakpoint: Capitan.Vars.breakpoints.xs,
                            settings: {
								arrows: false,
                                dots: true
                            }
						},
						{
							breakpoint: Capitan.Vars.breakpoints.sm,
							settings: {
								arrows: true,
								dots: true
							}
						}
					]
				}
			}
		}
	};

const o = _.defaults,
	$component = $(o.componentSelector);

/**
 * get plugin settings
 * @param slider
 * @returns settings
 */
function getPluginSettings(slider) {
	let settings = {};

	if (slider.classList.contains('slider--init-md')) {
		//initCell('.slider--init-md');
		
		Object.assign(settings, o.pluginOptions.settings, o.pluginOptions.settingsInitMD);

		Capitan.Vars.$window.on('resize', function() {
			if (assertBreakpoint('lt', 'lg') && !slider.classList.contains('slick-initialized')) {
				$(slider).slick(settings);
			}
		});
	} else if (slider.classList.contains('slider--expert')) {
		initCell('.slider--expert');

		Object.assign(settings, o.pluginOptions.settings, o.pluginOptions.settingsExpert);

		Capitan.Vars.$window.on('resize', function() {
			if (assertBreakpoint('lt', 'lg') && !slider.classList.contains('slick-initialized')) {
				$(slider).slick(settings);

                initCell('.slider--expert');
			}
		});
	} else if (slider.classList.contains('slider--testimonial')) {
		Object.assign(settings, o.pluginOptions.settings, o.pluginOptions.settingsTestimonial);
	} else if (slider.classList.contains('slider--two-rows')) {
		Object.assign(settings, o.pluginOptions.settings, o.pluginOptions.settingsDisease);
	} else if (slider.classList.contains('slider--disease-minimal')) {
		Object.assign(settings, o.pluginOptions.settings, o.pluginOptions.settingsSpecialarea);
	} else if (slider.classList.contains('slider--events')) {
		Object.assign(settings, o.pluginOptions.settings, o.pluginOptions.settingsRegular);
	} else if (slider.classList.contains('slider--portrait')) {
		Object.assign(settings, o.pluginOptions.settings, o.pluginOptions.settingsRegular);
	} else if (slider.classList.contains('slider--related-news')) {
		Object.assign(settings, o.pluginOptions.settings, o.pluginOptions.settingsNews);
	} else {
		Object.assign(settings, o.pluginOptions.settings);
	}

	return settings;
}


/**
 * init slick slider cell
 */
function initCell(name) {
    let maxHeight = 0;
	
	$(name).find(o.teaserCaption).each(function() {
		let height = $(this).height();
	
		if (height > maxHeight) {
			maxHeight = height;
		}
	});

	$(name).find(o.teaserCaption).each(function() {
		$(this).height(maxHeight);
	});
}


/**
 * prepare slider classes
 * @param slider
 */
function prepareSlider(slider) {
    $(slider).find(o.pluginOptions.classes.slickActive).addClass(o.pluginOptions.selectors.slickVisible);
    $(slider).find(o.pluginOptions.classes.slickActive).next().addClass(o.pluginOptions.selectors.slickVisible);
    $(slider).find(o.pluginOptions.classes.slickActive).next().next().addClass(o.pluginOptions.selectors.slickVisible);
    $(slider).find(o.pluginOptions.classes.slickActive).next().next().next().addClass(o.pluginOptions.selectors.slickVisible);
}


/**
 * change slider classes on swipe
 * @param slider
 * @param direction
 */
function swipeSlider(slider, direction) {
    if (direction === 'left') {
        $(slider).find(o.pluginOptions.classes.slickActive).addClass(o.pluginOptions.selectors.slickVisible);
        $(slider).find(o.pluginOptions.classes.slickActive).prev().addClass(o.pluginOptions.selectors.slickVisible);
        $(slider).find(o.pluginOptions.classes.slickActive).prev().prev().prev().prev().removeClass(o.pluginOptions.selectors.slickVisible);
    }
    else if (direction === 'right') {
        $(slider).find(o.pluginOptions.classes.slickActive).addClass(o.pluginOptions.selectors.slickVisible);
        $(slider).find(o.pluginOptions.classes.slickActive).next().addClass(o.pluginOptions.selectors.slickVisible);
        $(slider).find(o.pluginOptions.classes.slickActive).next().next().next().next().removeClass(o.pluginOptions.selectors.slickVisible);
    }
}


/**
 * update slider
 * @param slider
 */
export function updateSlider(slider) {
	console.log('updateSlider', slider);

    $(slider).slick('setPosition');
}


/**
 * update slider
 * @param slider
 */
export function reInitSlider(slider) {
	console.log('reInitSlider');

    const components = document.querySelectorAll(slider);

    for (let i = 0; i < components.length; i += 1) {
        const slider = components[i];
        const settings = getPluginSettings(slider);

        // get the translated pagination prefix
        o.pluginOptions.paginationPrefix = $component.data('pagination-prefix');

		$(slider).slick(settings);
	
		initCell('.slider--expert');
    }
}

export function init() {
	if (document.querySelector(o.componentSelector)) {
		import(/* webpackChunkName: "slick-slider" */ 'slick-carousel/slick/slick.css').then(() => {
			import(/* webpackChunkName: "slick-slider" */ 'slick-carousel').then(slick => {
				const components = document.querySelectorAll(o.componentSelector);

				for (let i = 0; i < components.length; i += 1) {
					const slider = components[i];
					const settings = getPluginSettings(slider);
					
					// get the translated pagination prefix
					o.pluginOptions.paginationPrefix = $component.data('pagination-prefix');

					$(slider).slick(settings);
					

                    if (assertBreakpoint('lt', 'sm')) {
                        prepareSlider(slider);

                        $(slider).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                            $(o.pluginOptions.classes.slickSlide).removeClass(o.pluginOptions.selectors.slickVisible);
                        });

                        $(slider).on('swipe', function(event, slick, direction) {
                            swipeSlider(slider, direction);
                        });
					}
				}
			});
		});
	}
}