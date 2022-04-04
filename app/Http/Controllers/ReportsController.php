<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ReportCollection;
use App\Http\Resources\ReportResource;
use Inertia\Inertia;
use App\Models\Report;

class ReportsController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index', [
            'filters' => Request::all('search', 'trashed'),
            'reports' => new ReportCollection(
                Report::orderBy('title')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }
}
