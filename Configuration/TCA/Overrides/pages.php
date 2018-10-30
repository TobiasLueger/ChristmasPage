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
        'label' => 'LLL:EXT:bra_projectfiles_mdc_corporate/Resources/Private/Language/locallang_db.xlf:quicklinksnavi',
        'config' => [
            'type' => 'inline',
            'foreign_table' => 'tt_content',
            'minitems' => 0,
            'maxitems' => 1,
            'foreign_record_defaults' => [
                'CType' => 'mask_quicklinksnavi'
            ],
            'overrideChildTca' => [
                'columns' => [
                    'colPos' => [
                        'config' => [
                            'default' => '999'
                        ],
                    ],
                ],
            ],
            'appearance' => array(
                'useSortable' => true,
                'showSynchronizationLink' => true,
                'showAllLocalizationLink' => true,
                'showPossibleLocalizationRecords' => true,
                'showRemovedLocalizationRecords' => false,
                'expandSingle' => true,
                'enabledControls' => array(
                    'localize' => true,
                ),
            ),
            'behaviour' => array(
                'localizationMode' => 'select',
                'mode' => 'select',
                'localizeChildrenAtParentLocalization' => true,
            ),
        ],
    ],
    'showTabNaviSubpages' => [
        'exclude' => 1,
        'label' => 'Tab Navigation auf dieser Ebene Anzeigen',
        'config' => [
            'type' => 'check',
            'items' => [
                ['Einblenden', '1'],
            ],
        ]
    ],
    'tabColor' => [
        'displayCond' => 'FIELD:showTabNaviSubpages:REQ:true',
        'exclude' => 1,
        'label' => 'Tab Hintergrundfarbe',
        'config' => [
            'type' => 'radio',
            'items' => [
                ['Weiß', 1],
                ['Grau', 2],
            ],
        ],
    ],
    'tabNaviHeader' => [
        'displayCond' => 'FIELD:showTabNaviSubpages:REQ:true',
        'exclude' => 1,
        'label' => 'Tab Navigation Überschrift',
        'config' => [
            'type' => 'input',
        ],
    ],
    'tabNaviText' => [
        'displayCond' => 'FIELD:showTabNaviSubpages:REQ:true',
        'exclude' => 1,
        'label' => 'Tab Navigation Text',
        'config' => [
            'type' => 'text',
            'cols' => 30,
            'rows' => 5
        ]
    ],
);

/**
 * Add to TCA pages
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns(
    'pages',
    $temporaryColumns
);

/**
 * Add additional tab for page properties
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('pages',
    '--div--;Navigation,quicklinksnavi', 1);

/**
 * rename and rearrange "subtitle" as second "navigation title"
 */
$GLOBALS['TCA']['pages']['palettes']['title']['showitem'] = preg_replace('/--linebreak--,\s*subtitle;[^;,]+/',
    'subtitle;LLL:EXT:bra_projectfiles_mdc_corporate/Resources/Private/Language/locallang.xlf:nav_title2',
    $GLOBALS['TCA']['pages']['palettes']['title']['showitem']);
$GLOBALS['TCA']['pages']['columns']['subtitle']['label'] = 'LLL:EXT:bra_projectfiles_mdc_corporate/Resources/Private/Language/locallang.xlf:nav_title2';

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('pages',
    '--div--;Tab Navigation,showTabNaviSubpages,tabColor,tabNaviHeader,tabNaviText');