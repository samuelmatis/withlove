'use strict';

angular.module('withlove.admin')
    .directive('header', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/admin/views/header.html',
            controller: 'HeaderCtrl'
        };
    });
