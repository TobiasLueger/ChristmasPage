<?php
/**
 * Created 10.09.18 16:37
 * @author Mediengstalt Heimbach - Johannes Heimbach
 */

namespace Cobra3\BraProjectfilesMdcCorporate\Controller;


use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;
use TYPO3\CMS\Extbase\Mvc\View\JsonView;

class JsonBaseController extends ActionController
{

    /**
     * @var JsonView
     */
    protected $view;


    /**
     * @var string
     */
    protected $defaultViewObjectName = JsonView::class;




    /**
     * @param $output
     */
    protected function setJsonOutput($output): void
    {
        $this->view->setVariablesToRender(['json']);
        $this->view->assign('json', $output);
    }




    /**
     * Returns array with success => false and message => given message
     * @param string $message
     * @return array
     */
    protected function createErrorOutput(string $message): array
    {
        return [
            'success' => false,
            'message' => $message
        ];
    }

}