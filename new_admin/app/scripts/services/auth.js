'use strict';

angular.module('withlove.admin')
    .service('authService', function($cookieStore, $http, $q, $location, baseUrl) {

        var userApiKey = $cookieStore.get('user') || '';
        var user = {
            isLogged: false,
            apiKey: userApiKey
        };

        this.loginUser = function(email, password) {

            var key;
            if(userApiKey !== '') {
                key = userApiKey;
            }

            return $http.post(baseUrl + 'user/login', {email: email, password: password})
                .then(function(result) {

                    var apiKey = result.data.api_token;

                    user.isLogged = true;
                    user.apiKey = apiKey;

                    $http.defaults.headers.common.Authorization = apiKey;

                    $cookieStore.put('user', apiKey);
                    $location.path('/');

                    return true;

                }, function() {
                    userApiKey = '';
                    return false;
                });

        };

        this.isAuthenticated = function() {

            var deffered = $q.defer();

            if(user.apiKey !== '') {
                deffered.resolve();
            } else {
                this.loginUser();
                deffered.reject();
            }

            return deffered.promise;

        };

    });
