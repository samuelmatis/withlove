'use strict';

angular.module('withlove.admin')
    .controller('EditCtrl', function($scope, $routeParams, $location, $modal, placesService, categoriesService) {

        $scope.editPlace = [];
        $scope.categories = [];
        $scope.form = {};

        if ($routeParams.placeId !== undefined) {
            var placeId = $routeParams.placeId
            placesService.getPlace(placeId)
                .then(function(result) {
                    $scope.editPlace = result.data;
                    $scope.editPlace.selectedCategory = $scope.editPlace.category.id;
                });
        } else {
            $location.path('/edit');
        }

        categoriesService.getCategories().then(function(categories) {
            $scope.categories = categories;
            $scope.selected_category = $scope.categories[0];
        });

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
                                }
                            }
                        }
                    });
                }, function(response) {

                    var response = '';
                    angular.forEach(response.data.errors, function(error) {
                        response += ' ' + error;
                    });

                    $modal.open({
                        templateUrl: 'views/errorModal.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function(){
                                return {
                                    title: 'ÚPRAVA MIESTA',
                                    text: 'Úprava miesta neprebehla úspešne. ' + response
                                }
                            }
                        }
                    });
                });

            }
        }

    });
