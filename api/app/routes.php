<?php

Route::post('user/login', 'Phirational\\Withlove\\Controllers\\UserController@login');

Route::group(array('before' => 'token_auth'), function () {
    Route::resource('category', 'Phirational\\Withlove\\Controllers\\CategoryController', array(
        'except' => array('create', 'edit')
    ));

    Route::post('person/{id}/assign', 'Phirational\\Withlove\\Controllers\\PersonController@assign');
    Route::resource('person', 'Phirational\\Withlove\\Controllers\\PersonController', array(
        'except' => array('create', 'edit')
    ));

    Route::post('place/{id}/assign', 'Phirational\\Withlove\\Controllers\\PlaceController@assign');
    Route::resource('place', 'Phirational\\Withlove\\Controllers\\PlaceController', array(
        'except' => array('create', 'edit')
    ));

    Route::resource('placesuggest', 'Phirational\\Withlove\\Controllers\\PlaceSuggestController', array(
        'except' => array('create', 'edit')
    ));

    Route::resource('user', 'Phirational\\Withlove\\Controllers\\UserController', array(
        'except' => array('create', 'edit')
    ));
});

Route::get('/', function () {
    return View::make('hello');
});
