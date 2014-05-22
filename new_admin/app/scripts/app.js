'use strict';

angular.module('withlove.admin', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
.constant('apiKey', '')
.constant('baseUrl', 'api/')
.constant('mapTypes', {
    'defaultMap': 'chiwo.geid1fd8',
    'morningMap': 'chiwo.h78l0k1o',
    'dayMap': 'chiwo.geid1fd8',
    'eveningMap': 'chiwo.h78k8i58',
    'nightMap': 'chiwo.geg7cd6d'
})
.config(function ($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            authenticate: false
        })
        .otherwise({
            redirectTo: '/login'
        })

});
