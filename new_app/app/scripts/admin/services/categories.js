'use strict';

angular.module('withlove.admin')
    .service('categoriesService', function(Restangular) {
        return Restangular.all('categories');
    });
