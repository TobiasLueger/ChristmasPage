<?php
/**
 * Created by 8/30/18 1:02 PM.
 * @author Mediengstalt Heimbach - Johannes Heimbach
 */

namespace Cobra3\BraProjectfilesMdcCorporate\Indexer;

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

class EventIndexer extends AbstractIndexer
{

    protected $indexerConfigurationKey = 'eventindexer';

    protected $fields = [
        'title',
        'description',
        'location',
        'target_group',
        'organizer',
        'startdate',
        'enddate',
        'clinicrelated'
    ];

    /**
     * Adds the custom indexer to the TCA of indexer configurations, so that
     * it's selectable in the backend as an indexer type when you create a
     * new indexer configuration.
     *
     * @param array $params
     * @param type $pObj
     */
    public function registerIndexerConfiguration(&$params, $pObj)
    {
        // Set a name and an icon for your indexer.
        $customIndexer = array(
            '[BRA] Event-Indexer (ext:bra_events_mdc)',
            $this->indexerConfigurationKey,
            ExtensionManagementUtility::siteRelPath('bra_projectfiles_mdc_corporate') . 'ext_icon.gif'
        );
        $params['items'][] = $customIndexer;
    }

    /**
     * Custom indexer for ke_search
     *
     * @param   array $indexerConfig Configuration from TYPO3 Backend
     * @param   \tx_kesearch_indexer $indexerObject Reference to indexer class.
     * @return  string Message containing indexed elements
     */
    public function customIndexer(&$indexerConfig, &$indexerObject)
    {
        if ($indexerConfig['type'] === $this->indexerConfigurationKey) {

            $entries = $this->getEntries('tx_braeventsmdc_domain_model_event', $this->fields, $indexerConfig['sysfolder']);

            foreach ($entries as $entry) {
                $data = $this->prepareContent($entry, $indexerConfig);
                $indexerObject->storeInIndex(
                    $indexerConfig['storagepid'],   // storage PID
                    $data['title'],                 // title
                    $this->indexerConfigurationKey, // content type
                    $data['targetPid'],             // target PID: where is the single view?
                    $data['fullcontent'],           // indexed content, includes the title (linebreak after title)
                    $data['tags'],                  // tags for faceted search
                    $data['params'],                // typolink params for singleview
                    $data['abstract'],              // abstract; shown in result list if not empty
                    $entry['sys_language_uid'],     // language uid
                    $entry['starttime'],            // starttime
                    $data['end'],                   // endtime
                    $entry['fe_group'],             // fe_group
                    false,                // debug only?
                    $data['additionalFields']       // additionalFields
                );
            }

            //if entries is not empty, generate contenttext, otherwise return empty string
            return \count($entries) > 0 ? $this->getContentText(ucfirst($this->indexerConfigurationKey), $indexerConfig['title'], \count($entries)) : '';
        }
        return '';
    }

    /**
     * @inheritdoc
     */
    protected function prepareContent($entry, $indexerConfig): array
    {
        $title = strip_tags($entry['title']);
        $content = strip_tags($entry['description']);
        $moreInfos = strip_tags($entry['location']) . ' ' . strip_tags($entry['target_group']) . ' ' . strip_tags($entry['organizer']);

        $strdate = (string)$entry['startdate'];
        if ($entry['enddate'] !== null) {
            $strdate .= "-" . $entry['enddate'];
        }

        $start = (int)strtotime($entry['startdate']);
        $end = (int)strtotime($entry['enddate']);

        $targetPid = $indexerConfig['targetpid'];
        if (!empty($entry['clinicrelated'])) {
            $relatedClinic = $this->getRelatedClinic($entry['clinicrelated']);
            if (!empty($relatedClinic['event_detail_page'])) {
                $targetPid = $relatedClinic['event_detail_page'];
            }
        }


        // Link to detail view
        $params = [
            'tx_braeventsmdc' => [
                'event' => $entry['uid'],
                'controller' => 'event',
                'action' => 'detail'
            ]
        ];


        // Tags
        $tags = '#bra_events#';

        // Additional information
        $additionalFields = array(
            'sortdate' => ($start > $entry['crdate']) ? $start : $entry['crdate'],
            'orig_uid' => $entry['uid'],
            'orig_pid' => $entry['pid'],
        );

        return [
            'title' => $title,
            'abstract' => '',
            'content' => $content,
            'fullcontent' => $title . "\n" . $strdate . ' ' . $content . ' ' . $moreInfos,
            'params' => http_build_query($params),
            'tags' => $tags,
            'targetPid' => $targetPid,
            'additionalFields' => $additionalFields,
            'end' => $entry['endtime'] > $end ? $end : $entry['endtime'] //show events only till they end
        ];
    }
}