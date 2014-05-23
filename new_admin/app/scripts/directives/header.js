'use strict';

angular.module('withlove.admin')
    .directive('header', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/header.html',
            controller: 'HeaderCtrl'
        };
    });
