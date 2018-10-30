<?php

namespace Cobra3\BraProjectfilesMdcCorporate\Helper;

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Extbase\Utility\ArrayUtility;


/**************************************************************
 *
 *  Copyright notice
 *
 *  (c) 2015 Yassine Daghor <yassine.daghor@brandung.de>, brandung GmbH & Co. KG
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/
class RealUrlHandler
{
    /**
     * register realurl config
     *
     * @param array $register
     *
     */
    public function register($register)
    {
        foreach ($GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] as $domain => $config) {
            if (is_array($config) && $domain !== 'decodeSpURL_preProc' && $domain !== 'encodeSpURL_postProc') {

                foreach ($register as $registerName => $registerValue) {
                    if ($registerName != "postVarSets") {
                        $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'][$domain][$registerName]
                            = ArrayUtility::arrayMergeRecursiveOverrule(
                            $registerValue, (array)$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'][$domain][$registerName]
                        );
                    } else {
                        $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'][$domain]['postVarSets']['_DEFAULT']
                            = ArrayUtility::arrayMergeRecursiveOverrule(
                            $registerValue, (array)$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'][$domain]['postVarSets']['_DEFAULT']
                        );
                    }
                }
            }
            unset($config);
        }
        unset($register);
        reset($GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']);
    }

    /**
     *
     * Checks if Extension is loaded and if the Extension got a configuration File
     * If both are true, the configuration file will be loaded
     *
     * @param      $extName
     * @param null $pathToConfig
     */
    public function loadRealUrlConfiguration($extName, $pathToConfig = null)
    {
        if (empty($pathToConfig)) {
            $pathToConfig = "Configuration/Plugins/Realurl/realurl_conf.php";
        }

        if (\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded($extName)) {
            if (isset($extName) && !empty($extName)) {
                $filepath = ExtensionManagementUtility::extPath($extName) . $pathToConfig;
                if (file_exists($filepath)) {
                    $extConfig = include $filepath;
                    $this->register($extConfig);
                }
            }
        }


    }
}