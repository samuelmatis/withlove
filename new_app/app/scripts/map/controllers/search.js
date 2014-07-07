'use strict';

angular.module('withlove.map')
    .controller('SearchCtrl', function($scope, categoriesService) {
        $scope.form = {};
        $scope.defaultCategory = {
            name: 'Select category',
            color: '#C4C4C4',
            slug: 'select-category'
        };
        $scope.selectedCategory = $scope.defaultCategory;
        $scope.categories = [];

        categoriesService.getList().then(function(categories) {
            $scope.categories = categories;
        });

        $scope.showAddPlaceForm = function() {
            $scope.form.name = $scope.query;
            $scope.addPlaceFormVisible = true;
            $scope.editAction = false;
        };

        $scope.cancelAddPlaceForm = function() {
            $scope.closeForm();
            $scope.selectedCategory = $scope.defaultCategory;
            $scope.query = '';
            $scope.search();
        };

        $scope.clearFormAfterSave = function() {
            $scope.closeForm();
            $scope.query = '';
            $scope.search();
            $scope.addPlaceFormBlock();
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

            console.log($scope.form);

            $scope.$watch('form', function(prevValue, newValue) {
                console.log('prevValue', prevValue);
                console.log('nextValue', newValue);
            }, true);

            $scope.editAction = true;
            $scope.addPlaceFormVisible = true;
        };

        $scope.closeForm = function(){
            $scope.form = {};
            $scope.addPlaceFormVisible = false;
        };
    });
