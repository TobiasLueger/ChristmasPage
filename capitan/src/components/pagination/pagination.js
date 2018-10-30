/*
 * Capitan pagination v1.5.0
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.Capitan.de/
 *
 * Date: 2018-09-26
 * MIT License (MIT)
 */

import * as ajaxHandler from '../../js/handle/ajax-handler';

const _ = {
    defaults: {
        componentSelector: '.pagination',
        pluginOptions: {
            selectors: {
                componentItem: '.pagination li',
                formPagination: '.form--pagination',
                customSelect: '.custom-select',
                page: 'input[name="tx_bramediacentermdc_list[page]"]'
            },
            classes: {
                pagePrevious: 'pagination__previous',
                pageNext: 'pagination__next',
                active: 'is-active',
                first: 'is-first',
                last: 'is-last',
                filter: 'filter'
            },
            callbacks: {},
            errorMessages: {}
        }
    }
};

const o = _.defaults;

/**
 * add event listeners
 */
function preparePagination(pagination) {

    console.log('preparePagination', pagination);

    $(o.pluginOptions.selectors.componentItem).on('click', function () {

        let $this = $(this),
            ajaxUrl = '',
            ajaxType = $(o.pluginOptions.selectors.formPagination).data('ajax-type'),
            ajaxError = true,
            page = $(o.pluginOptions.selectors.formPagination).find(o.pluginOptions.selectors.page).val(),
            newPage;

        // if pagination is active do nothing
        if ($this.hasClass(o.pluginOptions.classes.active)) {
            return;
        }

        else if ($this.hasClass(o.pluginOptions.classes.pagePrevious)) {
            if ($this.hasClass(o.pluginOptions.classes.first)) {
                return;

            } else {

                // decreate page by one
                newPage = parseInt(page) - 1;
            }
        }

        else if ($this.hasClass(o.pluginOptions.classes.pageNext)) {
            if ($this.hasClass(o.pluginOptions.classes.last)) {
                return;

            } else {

                // increate page by one
                newPage = parseInt(page) + 1;
            }
        }

        else {
            newPage = $this.find('a').html();
        }

        // create spinner
        $(o.pluginOptions.selectors.customSelect).closest(o.pluginOptions.classes.filter).addClass('util-spinner');

        // update page variable
        $(o.pluginOptions.selectors.formPagination).find(o.pluginOptions.selectors.page).val(newPage);
        let ajaxParams = $(o.pluginOptions.selectors.formPagination).find('input, select').serialize();

        // use ajax handler
        ajaxHandler.doAjax('pagination.js', ajaxUrl, ajaxParams, ajaxType, ajaxError, function () {

            // remove spinner
            $(o.pluginOptions.selectors.customSelect).closest(o.pluginOptions.classes.filter).removeClass('util-spinner');

        });
    });
}


/**
 * re init pagination
 */
export function reInitPagination(pagination) {
    console.log('reInitPagination', pagination);

    preparePagination(pagination);
}

export function init() {
    console.log('pagination init');

    preparePagination();
}