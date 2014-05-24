'use strict';

angular.module('withlove.admin')
    .service('categoriesService', function($http, baseUrl) {
        this.getCategories = function () {
            return $http.get(baseUrl + 'category');
        };
    });
