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
.config(function($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
        .when('/', {

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
.run(function($rootScope, $location, authService) {
    $rootScope.$on('$routeChangeStart', function(event, currentRoute, previousRoute) {
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
