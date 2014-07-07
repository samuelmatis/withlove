'use strict';

angular.module('withlove.map')
    .controller('MenuCtrl', function($scope, $rootScope, categoriesService) {
        $scope.categories = [];

        categoriesService.getList().then(function(categories) {
            $scope.categories = categories;
        });
    });
