'use strict';

angular.module('withlove.admin')
    .controller('EditCtrl', function($scope, $location, $modal, placesService, place, categories) {

        $scope.editPlace = [];
        $scope.categories = [];
        $scope.form = {};

        $scope.editPlace = place.data;
        $scope.editPlace.selectedCategory = $scope.editPlace.category.id;

        $scope.categories = categories;
        $scope.selectedCategory = $scope.categories[0];


        $scope.redirectHome = function() {
            $location.path('/');
        };

        $scope.doEditPlace = function(place) {

            place.category = place.selectedCategory;

            if(place.category !== '') {

                placesService.editPlace(place).then(function() {
                    $modal.open({
                        templateUrl: 'views/successModal.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function() {
                                return {
                                    title: 'ÚPRAVA MIESTA',
                                    text: 'Úprava miesta prebehla úspešne.'
                                };
                            }
                        }
                    });
                }, function(response) {

                    var modalResponse = '';
                    angular.forEach(response.data.errors, function(error) {
                        modalResponse += ' ' + error;
                    });

                    $modal.open({
                        templateUrl: 'views/errorModal.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function(){
                                return {
                                    title: 'ÚPRAVA MIESTA',
                                    text: 'Úprava miesta neprebehla úspešne. ' + modalResponse
                                };
                            }
                        }
                    });

                });

            }
        };

    });
