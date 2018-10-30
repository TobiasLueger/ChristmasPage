<?php
/**
 * @author Mediengstalt Heimbach - Johannes Heimbach
 */

namespace Cobra3\BraProjectfilesMdcCorporate\Indexer;


use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Query\QueryBuilder;
use TYPO3\CMS\Core\Database\Query\Restriction\DeletedRestriction;
use TYPO3\CMS\Core\Database\Query\Restriction\HiddenRestriction;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Class AbstractIndexer
 *
 * combines a few methods that are used for all indexers
 *
 * @package Cobra3\BraProjectfilesMdcCorporate\Indexer
 */
abstract class AbstractIndexer
{

    /**
     * list of db-fields that are used for every indexer
     * @return array
     */
    protected function getStdFields()
    {
        return [
            'crdate',
            'uid',
            'pid',
            'sys_language_uid',
            'starttime',
            'endtime'
        ];
    }

    /**
     * generates message for the indexer view
     *
     * @param string $name
     * @param string $title
     * @param int $count
     * @return string
     */
    protected function getContentText($name,$title, $count) {

        return '<p><strong>"'.$name . ' ' . $title . '</strong>":<br>' . $count . ' Elements have been indexed.</p>';

    }

    /**
     * Create QueryBuilder, exclude all deleted and hidden entries
     *
     * @param string $tablename
     * @return QueryBuilder
     */
    protected function getQueryBuilder($tablename): QueryBuilder
    {
        // create querybuilder
        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)
            ->getQueryBuilderForTable($tablename);

        // select all without deleted or hidden elements
        $queryBuilder->getRestrictions()
            ->removeAll()
            ->add(GeneralUtility::makeInstance(DeletedRestriction::class))
            ->add(GeneralUtility::makeInstance(HiddenRestriction::class));

        return $queryBuilder;
    }

    /**
     * register indexer to ke_search
     *
     * @param $params
     * @param $pObj
     * @return mixed
     */
    abstract public function registerIndexerConfiguration(&$params, $pObj);

    /**
     * runs the actual indexer
     *
     * @param $indexerConfig
     * @param $indexerObject
     * @return mixed
     */
    abstract public function customIndexer(&$indexerConfig, &$indexerObject);

    /**
     * Prepare Content to put into indexer
     * @param array $entry
     * @param array $indexerConfig
     * @return array
     */
    abstract protected function prepareContent($entry, $indexerConfig): array;


    /**
     * get entries from database
     *
     * @param string $tableName
     * @param array $fields
     * @param mixed $sysfolder
     * @return array
     */
    protected function getEntries($tableName, $fields, $sysfolder)
    {
        $queryBuilder = $this->getQueryBuilder($tableName);

        // fetch all entries within specified sysfolder
        return $queryBuilder
            ->select(...$fields, ...$this->getStdFields())
            ->from($tableName)
            ->where(
                $queryBuilder->expr()->in('pid', $sysfolder)
            )
            ->execute()
            ->fetchAll();
    }


    /**
     * @param $clinicRelated
     * @return mixed
     */
    protected function getRelatedClinic(int $clinicRelated)
    {
        $tableName = 'tx_brarelationmdc_domain_model_clinicrelated';

        $qb = $this->getQueryBuilder($tableName);

        return $qb
            ->select('event_detail_page','contact_detail_page','news_detail_page','facility_detail_page')
            ->from($tableName)
            ->where(
                $qb->expr()->eq('uid', $clinicRelated)
            )
            ->execute()
            ->fetch();
    }
}