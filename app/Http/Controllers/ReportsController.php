<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function __invoke(Request $request)
    {
        return Inertia::render('Reports/Index', [
            'reports' => ReportResource::collection(
                Report::paginate()
                    ->appends($request->all())
            ),
        ]);
    }
}
