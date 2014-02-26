<?php

namespace Phirational\Withlove\Controllers;

use Controller;
use Auth;

class BaseController extends Controller
{
    /**
     * User role
     *
     * @var null
     */
    protected $userRole = null;

    /**
     * Class constructor
     */
    public function __construct()
    {
        if(Auth::check())
        {
            $this->userRole = Auth::user()->getAttributes()['role'];
        }
        else
        {
            $this->userRole = 100;
        }

    }
}
