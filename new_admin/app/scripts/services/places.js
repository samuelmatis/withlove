'use strict';

angular.module('withlove.admin')
    .service('placesService', function($http, baseUrl) {

        this.getPlaces = function() {
            return $http.get(baseUrl + 'place');
        };

        this.getPlace = function(id) {
            return $http.get(baseUrl + 'place/' + id);
        };

        this.addPlace = function(place) {
            return $http.post(baseUrl + 'place', place);
        };

        this.editPlace = function(place) {
            return $http.put(baseUrl + 'place/' + place.id, place);
        };

        this.deletePlace = function(id) {
            return $http.delete(baseUrl + 'place/' + id);
        };

        // Suggested places
        this.getSuggestPlaces = function() {
            return $http.get(baseUrl + 'placesuggest');
        };

        this.addSuggestPlace = function() {
            return $http.post(baseUrl + 'placesuggest');
        };

        this.approveSuggestPlace = function(place) {
            return $http.put(baseUrl + 'place/' + place.original, place);
        };

        this.deleteSuggestPlace = function(id) {
            return $http.delete(baseUrl + 'placesuggest/' + id);
        };

    });
