'use strict';

angular.module('withloveApp')
    .factory('categoriesService', function(Restangular, $q) {
        return Restangular.all('categories');
    });
