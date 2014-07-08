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

            _.extend($scope.form, current);

            // console.log('scope.form', $scope.form);

            $scope.editAction = true;
            $scope.addPlaceFormVisible = true;
        };

        $scope.closeForm = function(){
            $scope.form = {};
            $scope.addPlaceFormVisible = false;
        };
    });
