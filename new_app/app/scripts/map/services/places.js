angular.module('withlove.map')
    .factory('placesService', function(Restangular, $q) {
        return Restangular.service('places');
    });
