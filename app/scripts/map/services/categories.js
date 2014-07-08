'use strict';

angular.module('withlove.map')
    .factory('categoriesService', function(Restangular, $q) {
        return Restangular.all('categories');
    });
