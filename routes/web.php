<?php

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth
Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::post('logout')->name('logout')->uses('Auth\LoginController@logout');

Route::get('password/reset', [
    'uses' => 'Auth\ResetPasswordController@showResetForm',
    'as' => 'password.reset'
])->middleware('guest');

Route::post('password/reset/send-email', [
    'uses' => 'Auth\ResetPasswordController@sendPasswordRestEmail',
    'as' => 'password.reset.send_email'
])->middleware('guest');

// Dashboard
Route::get('/')->name('dashboard')->uses('DashboardController')->middleware('auth');

// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');

// 500 error
Route::get('500', function () {
    echo $fail;
});
