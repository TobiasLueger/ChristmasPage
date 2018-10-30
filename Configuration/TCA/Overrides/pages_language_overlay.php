<?php
if (!defined('TYPO3_MODE')) {
    die ('Access denied.');
}
/**
 * Extend TCA for content elements in navigation flyout
 */
$temporaryColumns = array(
    'quicklinksnavi' => [
        'exclude' => 1,
        'label'   => 'LLL:EXT:bra_projectfiles_mdc_corporate/Resources/Private/Language/locallang_db.xlf:quicklinksnavi',
        'config'  => [
            'type'                    => 'inline',
            'foreign_table'           => 'tt_content',
            'foreign_record_defaults' => [
                'CType' => 'mask_quicklinksnavi'
            ],
            'overrideChildTca'        => [
                'columns' => [
                    'colPos' => [
                        'config' => [
                            'default' => '999'
                        ],
                    ],
                ],
            ],
            'appearance'              => array(
                'useSortable'                     => true,
                'showSynchronizationLink'         => true,
                'showAllLocalizationLink'         => true,
                'showPossibleLocalizationRecords' => true,
                'showRemovedLocalizationRecords'  => false,
                'expandSingle'                    => true,
                'enabledControls'                 => array(
                    'localize' => true,
                ),
            ),
        ],
    ],
);

/**
 * Add to TCA pages
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns(
    'pages_language_overlay',
    $temporaryColumns
);

/**
 * Add additional tab for page properties
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('pages_language_overlay',
    '--div--;Navigation,quicklinksnavi', 1);

