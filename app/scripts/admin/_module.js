'use strict';

angular.module('withlove.admin', [
])

.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'scripts/admin/views/login.html',
            controller: 'LoginCtrl',
            authenticate: false
        })
        .when('/admin', {
            templateUrl: 'scripts/admin/views/list.html',
            controller: 'ListCtrl',
            authenticate: true,
            resolve: {
                places: function(placesService) {
                    return placesService.getList();
                }
            }
        })
        .when('/admin/edit/:placeId', {
            templateUrl: 'scripts/admin/views/edit.html',
            controller: 'EditCtrl',
            authenticate: true,
            resolve: {
                place: function(placesService, $route) {
                    return placesService.one($route.current.params.placeId).get();
                },
                categories: function(categoriesService) {
                    return categoriesService.getList();
                }
            }
        })
        .when('/admin/add', {
            templateUrl: 'scripts/admin/views/add.html',
            controller: 'AddCtrl',
            authenticate: true,
            resolve: {
                categories: function(categoriesService) {
                    return categoriesService.getList();
                }
            }
        })
        .when('/admin/suggest', {
            templateUrl: 'scripts/admin/views/suggest.html',
            controller: 'SuggestCtrl',
            authenticate: true,
            resolve: {
                suggestPlaces: function(suggestPlacesService) {
                    return suggestPlacesService.getList();
                },
                categories: function(categoriesService) {
                    return categoriesService.getList();
                }
            }
        });
})

.run(function($rootScope, $location, $http, $cookieStore, authService) {

    $rootScope.$on('$routeChangeStart', function(event, currentRoute) {
            $http.defaults.headers.common.Authorization = $cookieStore.get('user');
            var pageAuthenticate;

            if (typeof currentRoute.authenticate === 'undefined') {
                pageAuthenticate = true;
            } else {
                pageAuthenticate = currentRoute.authenticate;
            }

            authService.isAuthenticated().then(function() {}, function() {
                if (pageAuthenticate) {
                    $location.path('/login');
                }
            });
    });
});
