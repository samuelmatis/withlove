'use strict';

angular.module('withlove.shared', [
    'ngCookies',
    'restangular',
    'ngRoute',
    'ui.bootstrap'
])

.run(function($rootScope, $location) {

    $rootScope.is = function(route) {
        if (route === '') return $location.path() === '';
        var routeRegExp = new RegExp(route, 'g');
        return routeRegExp.test($location.path());
    };

});
