'use strict';

angular.module('withloveApp')
    .controller('SearchCtrl', function($scope, $modal, $log, $filter, placesService, categoriesService) {
        $scope.form = {};
        $scope.defaultCategory = {name: 'Select category', color: '#C4C4C4', slug: 'select-category'};
        $scope.selectedCategory = $scope.defaultCategory;
        $scope.categories = [];

        var categoriesPromise = categoriesService.getCategories();
        categoriesPromise.then(function(categories) {
            $scope.categories = categories.data;
            console.log($scope.categories);
        });

        $scope.showAddPlaceForm = function(){
            $scope.form.name = $scope.query;
            $scope.addPlaceFormVisible = true;
        };

        $scope.cancelAddPlaceForm = function(){
            $scope.form = {};
            $scope.selectedCategory = $scope.defaultCategory;
            $scope.addPlaceFormVisible = false;
            $scope.clearForm();
            $scope.query = '';
            $scope.search();
        };

        $scope.saveNewPlace = function(){

            if($scope.form.category !== '') {

                if($scope.form.web.indexOf('http') < 0) {
                    $scope.form.web = 'http://' + $scope.form.web;
                }

                angular.element('.addplaceform-addbutton').attr('disabled', 'disabled');
                angular.element('.addplaceform-addbutton img').attr('display', 'block');
                angular.element('.addplaceform-addbutton span').attr('display', 'none');

                var addPlacePromise = placesService.insertPlace($scope.form);
                addPlacePromise.then(function() {
                    $modal.open({
                        templateUrl: 'views/successModalMessage.tpl.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function(){
                                return {
                                    title: 'ADD NEW PLACE',
                                    text: 'Place was successfully added and now is awaiting approval from the administrators.'
                                };
                            }

                        }
                    });

                    $scope.clearForm();
                    $scope.addPlaceFormVisible = false;
                    $scope.query = '';
                    $scope.search();

                    angular.element('.addplaceform-addbutton').removeAttr('disabled');
                    angular.element('.addplaceform-addbutton img').attr('display', 'none');
                    angular.element('.addplaceform-addbutton span').attr('display', 'inline-block');

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

                    angular.element('.addplaceform-addbutton').removeAttr('disabled');
                    angular.element('.addplaceform-addbutton img').attr('display', 'none');
                    angular.element('.addplaceform-addbutton span').attr('display', 'inline-block');
                });
            } else {
                console.log($scope.form);
            }
        };

        $scope.saveEditData = function(){

            angular.element('.addplaceform-editbutton').attr('disabled', 'disabled');
            angular.element('.addplaceform-editbutton img').attr('display', 'block');
            angular.element('.addplaceform-editbutton span').attr('display', 'none');


            if($scope.form.web.indexOf('http') < 0) {
                $scope.form.web = 'http://' + $scope.form.web;
            }

            var editPlacePromise = placesService.editPlace($scope.form);

            editPlacePromise.then(function() {
                    $modal.open({
                        templateUrl: 'views/errorModalMessage.tpl.html',
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

                    $scope.clearForm();
                    $scope.addPlaceFormVisible = false;
                    $scope.query = '';
                    $scope.search();

                    angular.element('.addplaceform-editbutton').removeAttr('disabled');
                    angular.element('.addplaceform-editbutton img').attr('display', 'none');
                    angular.element('.addplaceform-editbutton span').attr('display', 'inline-block');

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

                    angular.element('.addplaceform-editbutton').removeAttr('disabled');
                    angular.element('.addplaceform-editbutton img').attr('display', 'none');
                    angular.element('.addplaceform-editbutton span').attr('display', 'inline-block');
                });
        };

        $scope.editItem = function(current){
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
