<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
Route::post('user/login', 'Phirational\\Withlove\\Controllers\\UserController@login');
// Route group for API versioning
Route::group(array('before' => 'token_auth'), function () {
    Route::post('place/{id}/assign', 'Phirational\\Withlove\\Controllers\\PlaceController@assign');
    Route::post('people/{id}/assign', 'Phirational\\Withlove\\Controllers\\PeopleController@assign');

    Route::resource('place', 'Phirational\\Withlove\\Controllers\\PlaceController');
    Route::resource('placesuggest', 'Phirational\\Withlove\\Controllers\\PlaceSuggestController');
    Route::resource('category', 'Phirational\\Withlove\\Controllers\\CategoryController');
    Route::resource('people', 'Phirational\\Withlove\\Controllers\\PeopleController');
    Route::resource('user', 'Phirational\\Withlove\\Controllers\\UserController');

});

Route::get('/', function () {
    return View::make('hello');
});
