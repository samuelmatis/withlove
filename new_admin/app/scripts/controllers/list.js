'use strict';

angular.module('withlove.admin')
    .controller('ListCtrl', function($scope, places) {

        $scope.places = [];
        $scope.nameFilter = '';

        $scope.places = places.data;

    });
