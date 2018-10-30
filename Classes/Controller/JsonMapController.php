<?php
/**
 * Created 10.09.18 16:36
 * @author Mediengstalt Heimbach - Johannes Heimbach
 */

namespace Cobra3\BraProjectfilesMdcCorporate\Controller;


use Cobra3\BraFacilityMdc\Domain\Model\Facility;
use Cobra3\BraFacilityMdc\Domain\Repository\FacilityRepository;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Mvc\Exception\NoSuchArgumentException;

class JsonMapController extends JsonBaseController
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
     * returns array with coordinates to facilities, given by argument ids
     */
    public function coordsAction() {
        try {
            $ids = $this->request->getArgument('ids');
        } catch (NoSuchArgumentException $e) {
            return;
        }

        if (!empty($ids)) {
            $clinics = $this->facilityRepository->findByUids(
                GeneralUtility::intExplode(',', $ids, true)
            );

            $this->setJsonOutput($this->getCoords($clinics));
        } else {
            $this->setJsonOutput([]);
        }
    }

    /**
     * @param Facility[] $clinics
     * @return array
     */
    private function getCoords(array $clinics)
    {
        $coords = [];
        foreach ($clinics as $clinic) {
            $coords[] = [
                'id' => $clinic->getUid(),
                'lat' => $clinic->getLatitude(),
                'lng' => $clinic->getLongitude(),
            ];
        }
        return $coords;
    }
}