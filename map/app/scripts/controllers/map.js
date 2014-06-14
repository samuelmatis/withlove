'use strict';

angular.module('withloveApp')
    .controller('MapCtrl', function($scope, $rootScope, placesService) {
        $scope.places = [];

        // Get places from API
        placesService.getList().then(function(places) {
            $scope.places = places;

            // Create new instance of FuseSearcher
            var options = {
                keys: ['name'],
                distance: 50,
                threshold: 0.5
            };
            $rootScope.fuseSearcher = new Fuse($scope.places, options);

            // Populate map
            $scope.$broadcast('populateMap');
        });

    });
