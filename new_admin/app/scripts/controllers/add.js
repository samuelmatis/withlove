'use strict';

angular.module('withlove.admin')
    .controller('AddCtrl', function($scope, $location, categories) {

        $scope.categories = categories;
        $scope.selectedCategory = $scope.categories[0];

        $scope.redirectHome = function() {
            $location.path('/');
        };

        $scope.addNewForm = function() {
            if($scope.form.category !== '') {

                placesService.insertPlace($scope.form).then(function() {
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
