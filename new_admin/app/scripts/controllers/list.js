'use strict';

angular.module('withlove.admin')
    .controller('ListCtrl', function($scope, placesService) {

        $scope.places = [];
        $scope.nameFilter = '';

        placesService.getPlaces().then(function(places) {
            $scope.places = places.data;
        });

    });
