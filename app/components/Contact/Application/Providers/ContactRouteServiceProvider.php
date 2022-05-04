<?php

namespace App\components\Contact\Application\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class ContactRouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'App\components\Contact\Application\Controllers';

    public function boot()
    {
        parent::boot();
    }

    public function map()
    {
        $this->mapContact();
    }

    public function mapContact()
    {
        Route::middleware(['web', 'auth'])
            ->namespace($this->namespace)
            ->group(function () {
                $base = "contacts";

                Route::get("{$base}/create", [
                    'uses' => 'ContactsController@create',
                    'as' => 'contacts.create'
                ]);

                Route::get("{$base}", [
                    'uses' => 'ContactsController@index',
                    'as' => 'contacts'
                ])->middleware('remember');

                Route::post("{$base}", [
                    'uses' => 'ContactsController@store',
                    'as' => 'contacts.store'
                ]);

                Route::get("{$base}/{contact}/edit", [
                    'uses' => 'ContactsController@edit',
                    'as' => 'contacts.edit'
                ]);

                Route::put("{$base}/{contact}", [
                    'uses' => 'ContactsController@update',
                    'as' => 'contacts.update'
                ]);

                Route::delete("{$base}/{contact}", [
                    'uses' => 'ContactsController@destroy',
                    'as' => 'contacts.destroy'
                ]);

                Route::put("{$base}/{contact}/restore", [
                    'uses' => 'ContactsController@restore',
                    'as' => 'contacts.restore'
                ]);
            });
    }
}
