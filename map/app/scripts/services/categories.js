'use strict';

angular.module('withloveApp')
    .factory('categoriesService', function($http, baseUrl) {
        var categoriesFactory = {};

        categoriesFactory.getCategories = function() {
            return $http.get(baseUrl + 'category');
        };

        return categoriesFactory;
    });
