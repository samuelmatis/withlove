var api_key = 'eyJpdiI6IlpRYm14OUllSUU2ZDVZdVwvZUZWQ2szcHFzRm85RWpOQ0F1M2JQVGZsdjhZPSIsInZhbHVlIjoiV2VqY0crSTRqZVltVlVLUTB6aTNMZWlDQlh3S2ZwVWxEXC8xOFdYZjFpbUtXUVwvb09DZnl1MFJraHpQZVoxc0lTNGZpdkFXeHdKYWFOSXBoYXBcL09IbVE9PSIsIm1hYyI6IjY5NzY3NWZiMWY5MjUxMGYxYzBjN2QyYzA0MWIwYjRhOTgyMzQwNjNlMThlNTc4ZDM3OTc0NmZhNDZhNzBkZjcifQ==';
var base_url = 'http://api.withlove.sk/api/';
var default_map = 'chiwo.geid1fd8';
var morning_map = 'chiwo.h78l0k1o';
var day_map = 'chiwo.geid1fd8';
var evening_map = 'chiwo.h78k8i58';
var night_map = 'chiwo.geg7cd6d';

var fuseSearcher;

var withloveApp = angular.module('withloveApp', [
    'ngRoute',
    'ngResource',
    'withloveControllers'
]);

withloveApp.config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/places', {
                controller: 'PlacesController'
            }).
            when('/people/:personId', {
                templateUrl: 'app/partials/people.html',
                controller: 'PeopleController'
            }).
            otherwise({
                redirectTo: '/places'
            });
    }]);

withloveApp.filter('placesFuseSearch', function () {
    return function(places, query) {
        if (query) {
            return fuseSearcher.search(query);
        } else {
            return places;
        }
    }
});

withloveApp.filter('placesFuseSearchStrict', function () {
    return function(places, query) {
        if (query) {
            return fuseSearcher.search(query);
        } else {
            return [];
        }
    }
});
