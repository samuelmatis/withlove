'use strict';

angular.module('withloveApp')
    .directive('appMap', function($rootScope) {
        return {
            template: '<div id="map"></div>',
            replace: true,
            controller: 'MapCtrl',
            link: function(scope, element, attrs) {
                $rootScope.$on('filterAllCategories', function(event, elements) {
                    scope.filters = [];

                    angular.forEach(elements, function(element) {
                        var element = angular.element(element);
                        element.removeClass('inactive');
                        element.addClass('active');
                    });

                    scope.search();
                });

                $rootScope.$on('filterCategory', function(event, elements, selectedElement) {
                    var excludeElements = _.without(elements, selectedElement);
                    scope.filters = [];

                    angular.forEach(excludeElements, function(excludedElement) {
                        var element = angular.element(excludedElement);

                        element.removeClass('active');
                        element.addClass('inactive');

                        console.log(element);
                        scope.filters.push(element.context.text);
                    });

                    var selectedElement = angular.element(selectedElement);
                    var index = scope.filters.indexOf(selectedElement.context.text);
                    if (index > -1) {
                        scope.filters.splice(index, 1);
                    }
                    selectedElement.removeClass('inactive');
                    selectedElement.addClass('active');

                    scope.search();
                });
            }
        };
    });
