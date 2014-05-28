'use strict';

angular.module('withloveApp')
    .factory('placesService', function(Restangular) {
        return Restangular.service('place');
    });
