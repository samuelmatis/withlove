'use strict';

var api_key = '';
var base_url = 'http://api.withlove.sk/api/';

var fuseSearcher;

// Declare app level module which depends on filters, and services
var withloveAdmin = angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.filters',
  'withloveAdmin.services',
  'myApp.directives',
  'withloveAdminControllers'
]);

withloveAdmin.config(['$locationProvider', '$routeProvider', '$httpProvider',
    function($locationProvider, $routeProvider, $httpProvider) {
        //$locationProvider.html5Mode(true);
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];


        $routeProvider.
            when('/', {
                templateUrl: 'partials/list.html',
                controller: 'PlacesController',
                authenticate: true
            }).
            when('/suggest', {
                templateUrl: 'partials/suggest.html',
                controller: 'PlacesController',
                authenticate: true
            }).
            when('/add', {
                templateUrl: 'partials/add.html',
                controller: 'PlacesController',
                authenticate: true
            }).
            when('/edit/:placeId', {
                templateUrl: 'partials/edit.html',
                controller: 'PlacesController',
                authenticate: true
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginController',
                authenticate: false
            }).
            otherwise({
                redirectTo: '/login'
            });
    }
  ]
).run(function ($rootScope, $location, authService) {
    $rootScope.$on("$routeChangeStart", function(event, currRoute, prevRoute){

        var page_authenticate;

        if(typeof currRoute.authenticate === "undefined"){
            page_authenticate = true;
        } else {
            page_authenticate = currRoute.authenticate;
        }

        var userAuthenticated;
        var isAuthenticatedPromise = authService.isAuthenticated();

            isAuthenticatedPromise.then(function() {
                console.log('access allowed');
            }, function() {
                if(page_authenticate){
                    $location.path( "/login" );
                }
                console.log('access denied');
                //authService.loginUser();
            });
    });
 });

withloveAdmin.filter('placesFuseSearch', function () {
    return function(places, query) {
        if (query) {
            return fuseSearcher.search(query);
        } else {
            return places;
        }
    }
});

withloveAdmin.filter('placesFuseSearchStrict', function () {
    return function(places, query) {
        if (query) {
            return fuseSearcher.search(query);
        } else {
            return [];
        }
    }
});