<?php
/**
 * Created by 8/30/18 1:52 PM.
 * @author Mediengstalt Heimbach - Johannes Heimbach
 */

$indexer = [
    'contactindexer',
    'facilityindexer',
    'eventindexer'
];

$GLOBALS['TCA']['tx_kesearch_indexerconfig']['columns']['sysfolder']['displayCond'] .= ','.  implode(',', $indexer);