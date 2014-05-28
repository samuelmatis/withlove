'use strict';

angular.module('withloveApp')
    .factory('categoriesService', function(Restangular) {
        return Restangular.all('category');
    });
