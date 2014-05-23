'use strict';

angular.module('withlove.admin', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
])
.constant('baseUrl', 'api/')
.constant('mapTypes', {
    'defaultMap': 'chiwo.geid1fd8',
    'morningMap': 'chiwo.h78l0k1o',
    'dayMap': 'chiwo.geid1fd8',
    'eveningMap': 'chiwo.h78k8i58',
    'nightMap': 'chiwo.geg7cd6d'
})
.config(function($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
        .when('/', {
            templateUrl: 'views/list.html',
            controller: 'ListCtrl',
            authenticate: true
        })
        .when('/edit/:placeId', {
            templateUrl: 'views/edit.html',
            controller: 'EditCtrl',
            authenticate: true
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            authenticate: false
        })
        .otherwise({
            redirectTo: '/login'
        });

})
.run(function($rootScope, $location, $http, $cookieStore, authService) {

    $rootScope.$on('$routeChangeStart', function(event, currentRoute, previousRoute) {

        $http.defaults.headers.common.Authorization = $cookieStore.get('user');

        var page_authenticate, userAuthenticated;

        if (typeof currentRoute.authenticate === 'undefined') {
            page_authenticate = true;
        } else {
            page_authenticate = currentRoute.authenticate;
        }

        authService.isAuthenticated().then(function() {}, function() {
            if (page_authenticate) {
                $location.path('/login');
            }
        });
    });
})
