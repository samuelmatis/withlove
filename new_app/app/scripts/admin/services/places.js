'use strict';

angular.module('withlove.admin')
    .factory('placesService', function(Restangular) {
        return Restangular.service('places');
    });
