'use strict';

angular.module('withloveApp')
    .factory('categoriesService', function($http, base_url) {
        var categoriesFactory = {};

        categoriesFactory.getCategories = function() {
            return $http.get(base_url + 'category');
        };

        return categoriesFactory;
    });
