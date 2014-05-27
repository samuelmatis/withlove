'use strict';

angular.module('withlove.admin')
    .controller('EditCtrl', function($scope, $location, $modal, place, categories) {

        $scope.form = {};

        $scope.editPlace = place;
        $scope.editPlace.selectedCategory = $scope.editPlace.category.id;

        $scope.categories = categories;
        $scope.selectedCategory = $scope.categories[0];

        $scope.redirectHome = function() {
            $location.path('/');
        };

        $scope.doEditPlace = function(place) {

            place.category = place.selectedCategory;

            if(place.category !== '') {

                $scope.editPlace.put().then(function() {
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
