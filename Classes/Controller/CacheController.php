<?php
/**
 * Created by 9/3/18 1:32 PM.
 * @author Mediengstalt Heimbach - Johannes Heimbach
 */

namespace Cobra3\BraProjectfilesMdcCorporate\Controller;

use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManagerInterface;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;
use TYPO3\CMS\Extbase\Mvc\Exception\NoSuchArgumentException;
use TYPO3\CMS\Extbase\Mvc\View\JsonView;
use TYPO3\CMS\Extbase\Service\CacheService;

/**
 * Class CacheController
 *
 * Clears Cache for Entries from the Storage System
 */
class CacheController extends JsonBaseController
{

    /**
     * @var CacheService
     */
    private $cacheManager;

    /**
     * @var array
     */
    private $extensionSettings;

    /**
     * @param ConfigurationManagerInterface $configurationManager
     */
    public function injectConfigurationManager(ConfigurationManagerInterface $configurationManager)
    {
        $this->configurationManager = $configurationManager;
    }

    /**
     * @param CacheService $cacheService
     */
    public function injectCacheManager(CacheService $cacheService)
    {
        $this->cacheManager = $cacheService;
    }

    public function initializeAction()
    {
        $this->extensionSettings = $this->configurationManager->getConfiguration(
            ConfigurationManagerInterface::CONFIGURATION_TYPE_SETTINGS,
            'branewsmdc'
        );
    }

    /**
     * Clear cache action
     * loads pageids from typoscript settings and clears page cache
     */
    public function clearAction(): void
    {

        /** @noinspection PhpUnhandledExceptionInspection  we check if Argument is available first, we dont need to handle the Exception */
        if (!$this->request->hasArgument('secure') || $this->request->getArgument('secure') !== '478ee6381e6f4a71501dab0b4b3e60cf8de76e459d350d9b1f8ec11eb10a50a4') {
            return;
        }

        try {
            $cacheType = (int)$this->request->getArgument('cacheType');
        } catch (NoSuchArgumentException $e) {
            $this->setJsonOutput($this->createErrorOutput('No CacheType given'));
            return;
        }

        if ($cacheType === 1535969119) {
            $pageIds = $this->getIdsFromSettings([
                'newsListPid',
                'newsDetailPid',
                'newsAndEventsPid'
            ]);
        } elseif ($cacheType === 1535969120) {
            $pageIds = $this->getIdsFromSettings([
                'eventDetailPid',
                'eventListPid',
            ]);
        } elseif ($cacheType === 1535969121) {
            $pageIds = $this->getIdsFromSettings([
                'contactDetailPid',
                'contactListPid',
            ]);
        } elseif ($cacheType === 1535969122) {
            $pageIds = $this->getIdsFromSettings([
                'mediaDetailPid',
                'mediaListPid',
            ]);
        } elseif ($cacheType === 1535969123) {
            $pageIds = $this->getIdsFromSettings([
                'downloadDetailPid',
                'downloadListPid',
            ]);
        } else {
            $this->setJsonOutput($this->createErrorOutput('Wrong TypeId given'));
            return;
        }

        if (!empty($pageIds)) {
            $this->clearCache($pageIds);
        } else {
            // no page ids found, maybe typoscript settings are empty?
            $this->setJsonOutput($this->createErrorOutput('Page ids are not set'));
            return;
        }

        // everything was correct
        $this->setJsonOutput(['success' => true]);
    }

    /**
     * Clears cache for given page ids
     * @param $ids
     */
    protected function clearCache($ids): void
    {
        $this->cacheManager->clearPageCache($ids);
    }

    /**
     * gets all pageIds from the Typoscript settings, filtered by settingsKeys
     *
     * @param array $settingsKeys
     * @return array
     */
    protected function getIdsFromSettings($settingsKeys): array
    {
        $ids = [];

        // iterate over all keys
        foreach ($settingsKeys as $settingsKey) {

            // ignore if entry does not exists
            if (!array_key_exists($settingsKey, $this->extensionSettings)) {
                continue;
            }
            // when entry is not empty or zero,
            if ($this->extensionSettings[$settingsKey] !== '' && $this->extensionSettings[$settingsKey] !== 0) {
                // split string at comma
                $ids[] = GeneralUtility::intExplode(',', $this->extensionSettings[$settingsKey], true);
            }
        }

        if ($this->extensionSettings['othersPid'] !== '' && $this->extensionSettings['othersPid'] !== 0) {
            // split string at comma
            $ids[] = GeneralUtility::intExplode(',', $this->extensionSettings['othersPid'], true);
        }


        if (!empty($ids)) {
            // merge all arrays in $ids, because explode returns an array (but we want all pageIds on the same level)
            return array_merge(...$ids);
        }

        return [];
    }
}