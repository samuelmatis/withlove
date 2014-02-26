withloveApp.service('placesService',['$http', function ($http) {
    this.getPlaces = function () {
        $http.defaults.headers.common.Authorization = api_key;

        return $http({method: 'GET', url: base_url + 'place'});
    };

    this.insertPlace = function (place) {

        $http.defaults.headers.common.Authorization = api_key;

        return $http({method: 'POST', url: base_url + 'place', data: place});
    };

    this.editPlace = function (place) {

        $http.defaults.headers.common.Authorization = api_key;

        return $http({method: 'PUT', url: base_url + 'place/' + place.id, data: place});
    };

    this.getPlace = function (id) {

        $http.defaults.headers.common.Authorization = api_key;

        return $http({method: 'GET', url: base_url + 'place/' + id});
    };
}]);
