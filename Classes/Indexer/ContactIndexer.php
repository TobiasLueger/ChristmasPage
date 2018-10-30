<?php
/**
 * Created by 8/30/18 1:02 PM.
 * @author Mediengstalt Heimbach - Johannes Heimbach
 */

namespace Cobra3\BraProjectfilesMdcCorporate\Indexer;

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

/**
 * Class ContactIndexer
 * Indexes all elements from bra_contact_mdc
 *
 * @package Cobra3\BraProjectfilesMdcCorporate\Indexer
 */
class ContactIndexer extends AbstractIndexer
{

    protected $indexerConfigurationKey = 'contactindexer';

    protected $fields = [
        'title',
        'firstname',
        'lastname',
        'email',
        'tel',
        'fax'
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
            '[BRA] Contact-Indexer (ext:bra_contact_mdc)',
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

            $entries = $this->getEntries('tx_bracontactmdc_domain_model_person', $this->fields, $indexerConfig['sysfolder']);

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
                    $entry['endtime'],              // endtime
                    '',                     // fe_group
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
     * Prepare Content to put into indexer
     * @param $entry
     * @return array
     */
    protected function prepareContent($entry, $indexerConfig):array
    {
        // Title Firstname Lastname e.g. Prof. Thomas Mueller
        $title = strip_tags($entry['title']) . ' ' . strip_tags($entry['firstname']) . ' ' . strip_tags($entry['lastname']);

        // Email: email \n Tel: tel \n Fax: fax
        $content = 'Email: ' . strip_tags($entry['email']) . "\n Tel: " . strip_tags($entry['tel']) . "\n Fax: " .  strip_tags($entry['fax']);

        $targetPid = $indexerConfig['targetpid'];
        if (!empty($entry['clinicrelated'])) {
            $relatedClinic = $this->getRelatedClinic($entry['clinicrelated']);
            if (!empty($relatedClinic['contact_detail_page'])) {
                $targetPid = $relatedClinic['contact_detail_page'];
            }
        }

        // Link to detail view
        $params = [
            'tx_bracontactmdc' => [
                'contact' => $entry['uid'],
                'controller' => 'contact',
                'action' => 'detail'
            ]
        ];
        // Tags
        $tags = '#bra_contact#';

        // Additional information
        $additionalFields = array(
            'sortdate' => $entry['crdate'],
            'orig_uid' => $entry['uid'],
            'orig_pid' => $entry['pid'],
        );

        return [
            'title' => $title,
            'abstract' => '',
            'content' => $content,
            'fullcontent' => $title . "\n" . $content,
            'params' => http_build_query($params),
            'tags' => $tags,
            'targetPid' => $targetPid,
            'additionalFields' => $additionalFields
        ];
    }
}