/*
* Capitan content-block v1.5.0
*
* Copyright brandung GmbH & Co.KG
* http://www.brandung.de/
*
* Date: 2019-09-13
* MIT License (MIT)
*/

const _ = {
    defaults: {
        componentSelector: '.content-block',
        pluginOptions: {
            classes: {
                isActive: 'is-active'
            }
        }
    }
};

const o = _.defaults;


function resetBlocks () {
    $(o.componentSelector).removeClass(o.pluginOptions.classes.isActive);
}

export function init() {
    try {
        if (document.querySelector(o.componentSelector)) {
            $(o.componentSelector).on('click', function () {
                $(this).addClass(o.pluginOptions.classes.isActive);

                setTimeout(() => resetBlocks(), 500);
            });
        }
    } catch (err) {
        console.warn('Error: ', err.message);
    }
}
