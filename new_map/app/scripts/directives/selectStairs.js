'use strict';

angular.module('withloveApp')
    .directive('selectStairs', function () {
        return {
            restrict: 'A',
            link: function ($scope, element) {
                element.bind('click', function(){
                    var categoryId = element.attr('data-category-id');

                    $scope.form.category = categoryId;
                });
            }
        };
    });
