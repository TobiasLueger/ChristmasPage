<?php
/**
 * Created 07.09.18 10:57
 * @author Mediengstalt Heimbach - Johannes Heimbach
 */

namespace Cobra3\BraProjectfilesMdcCorporate\Controller;


use Cobra3\BraFacilityMdc\Domain\Model\Facility;
use Cobra3\BraFacilityMdc\Domain\Repository\FacilityRepository;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;
use TYPO3\CMS\Extbase\Mvc\Exception\NoSuchArgumentException;

class MapController extends ActionController
{

    /**
     * @var FacilityRepository
     */
    private $facilityRepository;

    public function injectFacilityRepository(FacilityRepository $facilityRepository)
    {
        $this->facilityRepository = $facilityRepository;
    }

    /**
     * generates Google Maps contentmodule
     */
    public function mapAction()
    {
        $clinics = $this->facilityRepository->findByUids(
            GeneralUtility::intExplode(',', $this->settings['clinics'], true)
        );

        $this->view->assignMultiple([
            'headline' => $this->settings['headline'],
            'subheadline' => $this->settings['subheadline'],
            'clinics' => $clinics,
            'clinicIds' => $this->settings['clinics'],
            'contactPid' => $this->settings['contactPid']
        ]);
    }
}