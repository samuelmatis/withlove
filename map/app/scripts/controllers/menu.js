'use strict';

angular.module('withloveApp')
    .controller('MenuCtrl', function($scope, $rootScope, categoriesService) {
        $scope.categories = [];

        var categoriesPromise = categoriesService.getList();
        categoriesPromise.then(function(categories) {
            $scope.categories = categories;
        });
    });
