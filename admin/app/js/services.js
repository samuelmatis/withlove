'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('withloveAdmin.services', []).
  value('version', '0.1');


withloveAdmin.service('placesService',['$http', function ($http) {

    this.getPlaces = function () {
        $http.defaults.headers.common.Authorization = api_key;
        return $http({method: 'GET', url: base_url + 'place'}).then(function(result) {
            return result.data;
        });
    };

    this.getSuggestPlaces = function () {
        $http.defaults.headers.common.Authorization = api_key;
        return $http({method: 'GET', url: base_url + 'placesuggest'}).then(function(result) {
            return result.data;
        });
    };

    this.insertPlace = function (place) {

        $http.defaults.headers.common.Authorization = api_key;
        return $http({method: 'POST', url: base_url + 'place', data: place});

    };

    this.editPlace = function (place) {

        $http.defaults.headers.common.Authorization = api_key;
        return $http({method: 'PUT', url: base_url + 'place/' + place.id, data: place});

    };

    this.deletePlace = function (id) {

        $http.defaults.headers.common.Authorization = api_key;
        return $http({method: 'DELETE', url: base_url + 'place/' + id}).success(function(){
            console.log('uspesne zmazane');
        });
    };

    this.deleteSuggestPlace = function (id) {

        $http.defaults.headers.common.Authorization = api_key;

        return $http({method: 'DELETE', url: base_url + 'placesuggest/' + id}).success(function(){
            console.log('uspesne zmazane');
        });
    };

    this.approveSuggestPlace = function (place) {

        $http.defaults.headers.common.Authorization = api_key;

        return $http({method: 'PUT', url: base_url + 'place/' + place.original, data: place});

    };

    this.addSuggestPlace = function (place) {

        place.category = place.category.id;
        $http.defaults.headers.common.Authorization = api_key;

        return $http({method: 'POST', url: base_url + 'place', data: place}).success(function(){
            console.log('vykonane');
        });
    };

    this.getPlace = function (id) {

        $http.defaults.headers.common.Authorization = api_key;
        return $http({method: 'GET', url: base_url + 'place/' + id});

    };

}]);

withloveAdmin.service('categoryService',['$http', function ($http) {

    this.getCategory = function () {
        $http.defaults.headers.common.Authorization = api_key;
        return $http({method: 'GET', url: base_url + 'category'}).then(function(result) {
            return result.data;
        });
    };

}]);

withloveAdmin.service('authService',['$http' , '$cookieStore', '$location', '$q', function ($http, $cookieStore, $location, $q) {

    var userApiKey = $cookieStore.get('user') || '';
    console.log(userApiKey);
    var user = {
        isLogged: false,
        apiKey: userApiKey
    };

    //$cookieStore.remove('user');

    this.loginUser = function (email, password) {

        var key;
        if(userApiKey != ''){
            key = userApiKey;
        } else {
            //key = Base64.encode(email + ':' + password);
        }

        //$http.defaults.headers.common.Authorization = key;
        return $http({method: 'POST', url: base_url + 'user/login', data: {email: email, password: password}}).then(function(result) {

            var api_token = result.data.api_token;

            user.isLogged = true;
            user.apiKey = api_token;
            api_key = api_token;

            $cookieStore.put('user', api_token);
            $location.path( "/" );

            return true;

        }, function(result){
            console.log('zadal som zle prihlasovacie veci a preto sa to nepodarilo');
            console.log(result);
            userApiKey = '';

            return false;
        });
    };

    this.isAuthenticated = function () {

        var deferred = $q.defer();

        if(user.apiKey != ''){
            api_key = user.apiKey;
            deferred.resolve();
        } else {
            this.loginUser();
            deferred.reject();
        }

        return deferred.promise;
    };
}]);
