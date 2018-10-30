<?php
/**
 * Im Extensionmanager in den RealURL-Einstellungen unter:
 * "Path to configuration file"
 * folgenden Pfad angeben:
 * typo3conf/ext/bra_projectfiles_mdc_corporate/Configuration/Plugin/Realurl/realurl_configuration_init.php
 */

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = [
    '_DEFAULT' => [
        'init' => [
            'enableCHashCache' => true,
            'appendMissingSlash' => 'ifNotFile,redirect',
            'adminJumpToBackend' => true,
            'enableUrlDecodeCache' => true,
            'enableUrlEncodeCache' => true,
            'emptyUrlReturnValue' => '/',
        ],
        'pagePath' => [
            'type' => 'user',
            'userFunc' => 'EXT:realurl/class.tx_realurl_advanced.php:&tx_realurl_advanced->main',
            'spaceCharacter' => '-',
            'languageGetVar' => 'L',
            'rootpage_id' => 1,
            'firstHitPathCache' => 1,
        ],
        'fileName' => [
            'defaultToHTMLsuffixOnPrev' => 0,
            'acceptHTMLsuffix' => 1,
            'index' => [
                'robots.txt' => [
                    'keyValues' => [
                        'type' => 201,
                    ],
                ],
                'sitemap.xml' => [
                    'keyValues' => [
                        'type' => 1449874941,
                    ]
                ],
                'sitemap_news.xml' => [
                    'keyValues' => [
                        'type' => 1451160842,
                    ]
                ]
            ],

        ],
        'preVars' => [
            [
                'GETvar' => 'no_cache',
                'valueMap' => [
                    'nc' => 1,
                ],
                'noMatch' => 'bypass',
            ],
            [
                'GETvar' => 'L',
                'valueMap' => [
                    'en' => 1,
                ],
                'noMatch' => 'bypass',
            ],
        ],

    ],
];

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_LAHRBADEN'] = $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT'];
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_LAHRBADEN']['pagePath']['rootpage_id'] = 41;
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DOMAINS'] = array(
    'encode' => [
        [
            'GETvar'           => 'L',
            'value'            => '0',
            'urlPrepend'       => 'https://lahrbaden-akut-stage.mcl.kundenheimat.de/',
            'useConfiguration' => '_LAHRBADEN',
        ],
    ],
    'decode' => [
        'lahrbaden-akut-stage.mcl.kundenheimat.de'            => [
            'GETvars'          => [
                'L' => 0,
            ],
            'useConfiguration' => '_LAHRBADEN',
        ],
    ],
);

//TODO Objectmanager / Ergebniss makeInstance
$conf = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(Cobra3\BraProjectfilesMdcCorporate\Helper\RealUrlHandler::class);

/**
 * Extension Key - Loads Config from Extension under: Configuration/Plugins/Realurl/realurl_conf.php
 *
 * @var Cobra3\BraProjectfilesMdcCorporate\Helper\RealUrlHandler $conf
 */
$conf->loadRealUrlConfiguration('bra_projectfiles_mdc_corporate', 'Configuration/Plugin/realurl/realurl_conf.php');


