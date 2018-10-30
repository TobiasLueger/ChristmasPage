<?php
/**
 * Created by 9/14/18 12:15 PM.
 * @author Mediengstalt Heimbach - Johannes Heimbach
 */

class ModifyList
{

    /**
     * @param array $fluidTemplatesVars
     * @param tx_kesearch_pi2 $ke_search
     */
    public function modifyResultList(&$fluidTemplatesVars, &$ke_search) {
        $ke_search->renderFilters();

        // searchword input value
        $searchString = $ke_search->piVars['sword'];

        if (!empty($searchString) && $searchString !== $ke_search->pi_getLL('searchbox_default_value')) {
            $swordValue = $searchString;
        } else {
            $swordValue = '';
        }

        $fluidTemplatesVars['searchword'] = htmlspecialchars($swordValue);
    }
}