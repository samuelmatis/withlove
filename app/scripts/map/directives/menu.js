'use strict';

angular.module('withlove.map')
    .directive('appMenu', function($rootScope) {
        return {
            templateUrl: 'scripts/map/views/navigation.tpl.html',
            replace: true,
            controller: 'MenuCtrl',
            link: function(scope, element) {
                // Menu animation on hover
                element.bind('mouseenter', function() {
                    angular.element(element).stop().animate({
                        width: '280px'
                    }, 200);
                });
                element.bind('mouseleave', function() {
                    angular.element(element).stop().animate({
                        width: '116px'
                    }, 200);
                });

                scope.filterCategory = function(event) {
                    var elements = angular.element('.category-marker');
                    var selectedElement = event.target;
                    $rootScope.$emit('filterCategory', elements, selectedElement);
                };

                scope.filterAllCategories = function() {
                    var elements = angular.element('.category-marker');
                    $rootScope.$emit('filterAllCategories', elements);
                };
            }
        };
    });
