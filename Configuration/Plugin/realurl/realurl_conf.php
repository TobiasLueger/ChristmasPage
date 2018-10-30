<?php

$register['postVarSets'] = [
    'cHash'           => [
        [
            'GETvar'  => 'cHash',
            'noMatch' => 'bypass',
        ],
    ],
    'seite'           => [
        [
            'GETvar' => 'tx_news_pi1[@widget_0][currentPage]',
        ],
    ],
    'veranstaltungen' => [
        [
            'GETvar'   => 'tx_braeventsmdc_event[month]',
            'valueMap' => [
                'januar'    => '1',
                'februar'   => '2',
                'maerz'     => '3',
                'märz'      => '3',
                'april'     => '4',
                'mai'       => '5',
                'juni'      => '6',
                'juli'      => '7',
                'august'    => '8',
                'september' => '9',
                'oktober'   => '10',
                'november'  => '11',
                'dezember'  => '12',
            ],
            'noMatch'  => 'bypass'
        ],
        [
            'GETvar' => 'tx_braeventsmdc_event[year]',
        ],
        [
            'GETvar'  => 'tx_braeventsmdc_event[action]',
            'noMatch' => 'bypass',
        ],
        [
            'GETvar'  => 'tx_braeventsmdc_event[controller]',
            'noMatch' => 'bypass',
        ],
    ],
];

$register['fixedPostVars'] = [
    'eventDetailConfiguration' => [
        [
            'GETvar'      => 'tx_braeventsmdc_event[event]',
            'lookUpTable' => [
                'table'                    => 'tx_braeventsmdc_domain_model_event',
                'id_field'                 => 'uid',
                'alias_field'              => 'title',
                'enable404forInvalidAlias' => true,
                'addWhereClause'           => ' AND NOT deleted',
                'useUniqueCache'           => 1,
                'useUniqueCache_conf'      => [
                    'strtolower'     => 1,
                    'spaceCharacter' => '-'
                ],
            ]
        ],
    ],
    'newsDetailConfiguration'  => [
        [
            'GETvar'   => 'tx_news_pi1[action]',
            'valueMap' => [
                'detail' => '',
            ],
            'noMatch'  => 'bypass'
        ],
        [
            'GETvar'   => 'tx_news_pi1[controller]',
            'valueMap' => [
                'News' => '',
            ],
            'noMatch'  => 'bypass'
        ],
        [
            'GETvar'      => 'tx_news_pi1[news]',
            'lookUpTable' => [
                'table'                    => 'tx_news_domain_model_news',
                'id_field'                 => 'uid',
                'alias_field'              => 'IF(path_segment!="",path_segment,title)',
                'addWhereClause'           => ' AND NOT deleted',
                'useUniqueCache'           => 1,
                'languageGetVar'           => 'L',
                'languageExceptionUids'    => '',
                'languageField'            => 'sys_language_uid',
                'transOrigPointerField'    => 'l10n_parent',
                'expireDays'               => 180,
                'enable404forInvalidAlias' => true
            ]
        ],
        [
            'GETvar'      => 'tx_news_pi1[overwriteDemand][categories]',
            'lookUpTable' => [
                'table'                 => 'sys_category',
                'id_field'              => 'uid',
                'alias_field'           => 'title',
                'addWhereClause'        => ' AND NOT deleted',
                'useUniqueCache'        => 1,
                'useUniqueCache_conf'   => [
                    'strtolower'     => 1,
                    'spaceCharacter' => '-'
                ],
                'languageGetVar'        => 'L',
                'languageExceptionUids' => '',
                'languageField'         => 'sys_language_uid',
                'transOrigPointerField' => 'l10n_parent',
                'autoUpdate'            => 1,
                'expireDays'            => 180,
            ]
        ],
    ],
    'newsListConfiguration'    => [
        [
            'GETvar'      => 'tx_news_pi1[overwriteDemand][categories]',
            'lookUpTable' => [
                'table'                 => 'sys_category',
                'id_field'              => 'uid',
                'alias_field'           => 'title',
                'addWhereClause'        => ' AND NOT deleted',
                'useUniqueCache'        => 1,
                'useUniqueCache_conf'   => [
                    'strtolower'     => 1,
                    'spaceCharacter' => '-'
                ],
                'languageGetVar'        => 'L',
                'languageExceptionUids' => '',
                'languageField'         => 'sys_language_uid',
                'transOrigPointerField' => 'l10n_parent',
                'autoUpdate'            => 1,
                'expireDays'            => 180,
            ]
        ],
        [
            'GETvar'      => 'tx_news_pi1[news]',
            'lookUpTable' => [
                'table'                    => 'tx_news_domain_model_news',
                'id_field'                 => 'uid',
                'alias_field'              => 'IF(path_segment!="",path_segment,title)',
                'addWhereClause'           => ' AND NOT deleted',
                'useUniqueCache'           => 1,
                'languageGetVar'           => 'L',
                'languageExceptionUids'    => '',
                'languageField'            => 'sys_language_uid',
                'transOrigPointerField'    => 'l10n_parent',
                'expireDays'               => 180,
                'enable404forInvalidAlias' => true
            ]
        ],
    ],
    '34'                       => 'eventDetailConfiguration'

];

return $register;

