<?php

namespace App\components\Organization\Application\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class OrganizationRouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'App\components\Organization\Application\Controllers';

    public function boot()
    {
        parent::boot();
    }

    public function map()
    {
        $this->mapOrganization();
    }

    public function mapOrganization()
    {
        Route::middleware(['web', 'auth'])
            ->namespace($this->namespace)
            ->group(function () {
                $base = "organizations";

                Route::get("{$base}/create", [
                    'uses' => 'OrganizationsController@create',
                    'as' => 'organizations.create'
                ]);

                Route::get("{$base}", [
                    'uses' => 'OrganizationsController@index',
                    'as' => 'organizations'
                ])->middleware('remember');

                Route::post("{$base}", [
                    'uses' => 'OrganizationsController@store',
                    'as' => 'organizations.store'
                ]);

                Route::get("{$base}/{organization}/edit", [
                    'uses' => 'OrganizationsController@edit',
                    'as' => 'organizations.edit'
                ]);

                Route::put("{$base}/{organization}", [
                    'uses' => 'OrganizationsController@update',
                    'as' => 'organizations.update'
                ]);

                Route::delete("{$base}/{organization}", [
                    'uses' => 'OrganizationsController@destroy',
                    'as' => 'organizations.destroy'
                ]);

                Route::put("{$base}/{organization}/restore", [
                    'uses' => 'OrganizationsController@restore',
                    'as' => 'organizations.restore'
                ]);
            });
    }
}
