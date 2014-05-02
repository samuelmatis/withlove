'use strict';

angular.module('withloveApp')
    .directive('appMap', function($rootScope) {
        return {
            template: '<div id="map"></div>',
            replace: true,
            controller: 'MapCtrl',
            link: function(scope, element, attrs) {
                $rootScope.$on('filterCategory', function(ev, name, event) {
                    // Toggle navigation filter button state
                    var myElement = angular.element(event.target);

                    if(myElement.hasClass('active')) {
                        // Setting a filter
                        scope.filters.push(name);
                        myElement.removeClass('active');
                        myElement.addClass('inactive');
                    } else {
                        // Unsetting the filter
                        var index = scope.filters.indexOf(name);
                        if (index > -1) {
                            scope.filters.splice(index, 1);
                        }
                        myElement.removeClass('inactive');
                        myElement.addClass('active');
                    }

                    scope.search();

                });
            }
        };
    });
