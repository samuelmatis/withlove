angular.module('withloveApp')
    .factory('placesService', function(Restangular, $q) {
        return Restangular.service('places');
    });
