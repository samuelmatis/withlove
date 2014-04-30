'use strict';

angular.module('withloveApp')
    .factory('placesService', function($http, base_url) {
        var placesFactory = {};

        placesFactory.getPlaces = function() {
            return $http.get(base_url + 'place');
        };

        placesFactory.getPlace = function(id) {
            return $http.get(base_url + 'place/' + id);
        };

        placesFactory.insertPlace = function(place) {
            return $http.post(base_url + 'place', place);
        };

        return placesFactory;
    });
