'use strict';

angular.module('withlove.admin')
    .service('authService', function($cookieStore, $http, $q, $location, baseUrl, apiKey) {

        var userApiKey = $cookieStore.get('user') || '';
        var user = {
            isLogged: false,
            apiKey: userApiKey
        };

        this.loginUser = function(email, password) {

            var key;
            if(userApiKey != '') {
                key = userApiKey;
            }

            return $http.post(baseUrl + 'user/login', {email: email, password: password})
                .then(function(result) {

                    var apiToken = result.data.api_token;

                    user.isLogged = true;
                    user.apiKey = apiToken;
                    apiKey = apiToken;

                    $cookieStore.put('user', apiToken);
                    $location.path('/');

                    return true;

                }, function(result) {

                    userApiKey = '';
                    return false;

                });

        };

        this.isAuthenticated = function() {

            var deffered = $q.defer();

            if(user.apiKey != '') {
                apiKey = user.apiKey;
                deffered.resolve();
            } else {
                this.loginUser();
                deffered.reject();
            }

            return deffered.promise;

        };

    })
