'use strict';

angular.module('withloveApp')
    .controller('SearchCtrl', function($scope, $modal, $log, $filter, placesService, categoriesService) {
        $scope.form = {};
        $scope.defaultCategory = {name: 'Select category', color: '#C4C4C4', slug: 'select-category'};
        $scope.selectedCategory = $scope.defaultCategory;
        $scope.categories = [];

        var categoriesPromise = categoriesService.getList();
        categoriesPromise.then(function(categories) {
            $scope.categories = categories;
        });

        $scope.showAddPlaceForm = function(){
            $scope.form.name = $scope.query;
            $scope.addPlaceFormVisible = true;
            $scope.editAction = false;
        };

        $scope.cancelAddPlaceForm = function(){
            $scope.form = {};
            $scope.selectedCategory = $scope.defaultCategory;
            $scope.addPlaceFormVisible = false;
            $scope.clearForm();
            $scope.query = '';
            $scope.search();
        };

        function clearFormAfterSave() {
            $scope.clearForm();
            $scope.addPlaceFormVisible = false;
            $scope.query = '';
            $scope.search();
            $scope.addPlaceFormBlock();
        }

        $scope.saveNewPlace = function(){

            if($scope.form.category !== '') {

                if(typeof $scope.form.web !== 'undefined') {
                    if($scope.form.web.indexOf('http') < 0) {
                        $scope.form.web = 'http://' + $scope.form.web;
                    }
                }

                $scope.addPlaceFormDisable();
                $scope.form.category = $scope.selectedCategory.id;

                var addPlacePromise = placesService.post($scope.form)
                addPlacePromise.then(function() {
                    $modal.open({
                        templateUrl: 'views/successModalMessage.tpl.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function() {
                                return {
                                    title: 'ADD NEW PLACE',
                                    text: 'Place was successfully added and now is awaiting approval from the administrators.'
                                };
                            }

                        }
                    });
                    clearFormAfterSave();
                }, function() {
                    $modal.open({
                        templateUrl: 'views/errorModalMessage.tpl.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function() {
                                return {
                                    title: 'ADD NEW PLACE',
                                    text: 'Adding the place failed. Please try again or contact the administrators.'
                                };
                            }
                        }
                    });
                    $scope.addPlaceFormBlock();
                });
            } else {
                $scope.selectedCategory = $scope.defaultCategory;

            }
        };

        $scope.saveEditData = function(){

            if($scope.form.web.indexOf('http') < 0) {
                $scope.form.web = 'http://' + $scope.form.web;
            }


            placesService.one($scope.form.id).get().then(function(place) {
                $scope.addPlaceFormDisable();

                $scope.form = place;
                place.category = $scope.selectedCategory.id;

                var placePutPromise = place.put();
                placePutPromise.then(function() {
                    $modal.open({
                        templateUrl: 'views/successModalMessage.tpl.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function(){
                                return {
                                    title: 'EDIT PLACE',
                                    text: 'Your suggestion was added and is now awaiting approval from the administrators.'
                                };
                            }

                        }
                    });
                    clearFormAfterSave();
                }, function() {
                    $modal.open({
                        templateUrl: 'views/errorModalMessage.tpl.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function(){
                                return {
                                    title: 'EDIT PLACE',
                                    text: 'Adding suggestion failed. Please try again or contact the administrators.'
                                };
                            }

                        }
                    });

                    $scope.addPlaceFormBlock();
                });
            });
        };

        $scope.editItem = function(current) {
            $scope.selectedCategory = current.category;
            $scope.form.id = current.id;
            $scope.form.name = current.name;
            $scope.form.town = current.town;
            $scope.form.street = current.street;
            $scope.form.web = current.web;
            $scope.form.email = current.email;
            $scope.form.phone = current.phone;
            $scope.form.description = current.description;
            $scope.form.category = current.category.id;

            $scope.editAction = true;
            $scope.addPlaceFormVisible = true;
        };

        $scope.clearForm = function(){
            $scope.form = {};
        };
    });
