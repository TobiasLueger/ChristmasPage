/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 25.10.2018
 * MIT License (MIT)
 *
 */

const _ = {
    defaults: {
        componentSelector: 'a[target="_blank"]'
    }
};

const o = _.defaults;

/**
 *
 */
export default (function () {
    console.log('rel-security: Init');

    $(o.componentSelector).each(function() {
        const $this = $(this);

        let $originalRel = $this.attr('rel'),
            $newRel;

        if($originalRel) {
            $newRel = $originalRel.split(' ');


            if ($originalRel.indexOf('noopener') === -1) {
                $newRel.push('noopener');
            }

            if ($originalRel.indexOf('nofollow') === -1) {
                $newRel.push('nofollow');
            }

            $this.attr('rel', $newRel.join(' ').trim());

        } else {

            $this.attr('rel', 'noopener nofollow');
        }

    });

}());
