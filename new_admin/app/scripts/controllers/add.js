'use strict';

angular.module('withlove.admin')
    .controller('AddCtrl', function($scope, $location, $modal, placesService, categories) {

        $scope.categories = categories;
        $scope.selectedCategory = $scope.categories[0];

        $scope.form = {};

        $scope.redirectHome = function() {
            $location.path('/');
        };

        $scope.addNewForm = function() {
            if($scope.form.category !== '') {

                placesService.post($scope.form).then(function() {
                    $modal.open({
                        templateUrl: '/views/successModal.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function() {
                                return {
                                    title: 'PRIDANIE MIESTA',
                                    text: 'Pridanie miesta prebehlo úspešne.'
                                }
                            }

                        }
                    });

                    $scope.form = {};

                }, function() {
                    $modal.open({
                        templateUrl: '/views/errorModal.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function() {
                                return {
                                    title: 'PRIDANIE MIESTA',
                                    text: 'Pridanie miesta sa nepodarilo.'
                                }
                            }

                        }
                    });
                });

            }
        };

    });
