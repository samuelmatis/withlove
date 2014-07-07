'use strict';

angular.module('withlove.shared', [
    'ngCookies',
    'restangular',
    'ngRoute',
    'ui.bootstrap'
])

.run(function($rootScope, $location) {
    $rootScope.is = function(route) {
        return $location.path() === '/' + route;
    };
});
