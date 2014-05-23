'use strict';

angular.module('withlove.admin')
    .controller('HeaderCtrl', function($scope, $location) {

        $scope.isActive = function(path) {
            return $location.path() === path;
        }

    });
