'use strict';

angular.module('withloveApp')
    .directive('appMap', function() {
        return {
            template: '<div id="map"></div>',
            replace: true,
            controller: 'MapCtrl',
            link: function(scope, element, attrs) {
            }
        };
    });
