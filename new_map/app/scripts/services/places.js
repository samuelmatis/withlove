'use strict';

angular.module('withloveApp')
    .factory('placesService', function($http, baseUrl) {
        var placesFactory = {};

        placesFactory.getPlaces = function(){
            return $http.get(baseUrl + 'place');
        };

        placesFactory.getPlace = function(id){
            return $http.get(baseUrl + 'place/' + id);
        };

        placesFactory.insertPlace = function(place){
            return $http.post(baseUrl + 'place', place);
        };

        return placesFactory;
    });
