'use strict';

angular.module('withlove.map')
    .filter('placesFuseSearch', function($rootScope) {
        return function(places, query) {
            if (query) {
                return $rootScope.fuseSearcher.search(query);
            } else {
                return places;
            }
        };
    })
    .filter('placesFuseSearchStrict', function($rootScope) {
        return function(places, query) {
            if (query) {
                return $rootScope.fuseSearcher.search(query);
            } else {
                return [];
            }
        };
    });
