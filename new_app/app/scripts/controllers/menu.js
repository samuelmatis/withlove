'use strict';

angular.module('withloveApp')
    .controller('MenuCtrl', function($scope, $rootScope, categoriesService) {
        $scope.categories = [];

        categoriesService.getList().then(function(categories) {
            $scope.categories = categories;
        });
    });
