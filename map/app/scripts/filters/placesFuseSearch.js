'use strict';

angular.module('withloveApp')
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
