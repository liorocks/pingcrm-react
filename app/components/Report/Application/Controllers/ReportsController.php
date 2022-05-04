<?php

namespace App\components\Report\Application\Controllers;

use App\components\Report\Application\Repositories\UserRepository;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function __construct(protected UserRepository $userRepository)
    {

    }

    public function __invoke()
    {
        $auth_user_reports = $this->userRepository->getReportsOf(Auth::user());

        return Inertia::render('Reports/Index', [
            'filters' => Request::all('search', 'trashed'),
            'reports' => $auth_user_reports
        ]);
    }
}
