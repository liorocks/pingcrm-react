<?php

namespace App\components\User\Application\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class UserRouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'App\components\User\Application\Controllers';

    public function boot()
    {
        parent::boot();
    }

    public function map()
    {
        $this->mapUser();
    }

    public function mapUser()
    {
        Route::middleware(['web', 'auth'])
            ->namespace($this->namespace)
            ->group(function () {
                $base = "users";

                Route::get("{$base}/create", [
                    'uses' => 'UsersController@create',
                    'as' => 'users.create'
                ]);

                Route::get("{$base}", [
                    'uses' => 'UsersController@index',
                    'as' => 'users'
                ]);

                Route::post("{$base}", [
                    'uses' => 'UsersController@store',
                    'as' => 'users.store'
                ]);

                Route::get("{$base}/{user}/edit", [
                    'uses' => 'UsersController@edit',
                    'as' => 'users.edit'
                ]);

                Route::put("{$base}/{user}", [
                    'uses' => 'UsersController@update',
                    'as' => 'users.update'
                ]);

                Route::delete("{$base}/{users}", [
                    'uses' => 'UsersController@destroy',
                    'as' => 'users.destroy'
                ]);

                Route::put("{$base}/{user}/restore", [
                    'uses' => 'UsersController@restore',
                    'as' => 'users.restore'
                ]);
            });
    }
}
