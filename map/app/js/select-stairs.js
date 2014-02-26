angular.module('selectStairs', [])
    .directive('selectStairs', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                element.bind('click', function(){
                    var category_id = element.attr('data-category-id');

                    $scope.form.category = category_id;
                });
            }
        };
    });
