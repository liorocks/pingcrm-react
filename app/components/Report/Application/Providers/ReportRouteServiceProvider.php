<?php

namespace App\components\Report\Application\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class ReportRouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'App\components\Report\Application\Controllers';

    public function boot()
    {
        parent::boot();
    }

    public function map()
    {
        $this->mapReport();
    }

    public function mapReport()
    {
        Route::get('reports')->name('reports')
            ->uses('App\components\Report\Application\Controllers\ReportsController')->middleware(['web', 'auth']);
    }
}
