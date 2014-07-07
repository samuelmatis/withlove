'use strict';

angular.module('withlove.admin')
    .controller('LoginCtrl', function($scope, authService) {

        $scope.loginForm = {};

        $scope.login = function() {
            var email = $scope.loginForm.email,
                password = $scope.loginForm.password;

            authService.loginUser(email, password);
        };

    });
