'use strict';

angular.module('withlove.admin')
    .factory('suggestPlacesService', function(Restangular) {
        return Restangular.all('placesuggest');
    });

// this.approveSuggestPlace = function(place) {
//     return $http.put(baseUrl + 'place/' + place.original, place);
// };
