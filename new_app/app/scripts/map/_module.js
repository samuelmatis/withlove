'use strict';

angular.module('withlove.map', [
])

.config(function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/',
        templateUrl: 'scripts/map/views/index.html',
        authenticate: false,
        resolve: {
            place: function(placesService, $route) {
                return placesService.getList();
            },
            categories: function(categoriesService) {
                return categoriesService.getList();
            }
        }
    });
});
