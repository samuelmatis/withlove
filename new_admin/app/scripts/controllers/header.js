'use strict';

angular.module('withlove.admin')
    .controller('HeaderCtrl', function($scope, placesService, $cookieStore, $location) {

        $scope.loginPage = function() {
            return $location.path() === '/login';
        };

        $scope.$watch(function() {
            return $cookieStore.get('user');
        }, function(newValue) {

            // Get places after user login
            placesService.getPlaces()
                .then(function(result) {
                    $scope.places = result.data;
                });

            placesService.getSuggestPlaces()
                .then(function(result) {
                    $scope.suggestPlaces = result.data;
                });
        });



    });
