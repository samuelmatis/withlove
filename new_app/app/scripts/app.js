'use strict';

angular.module('withloveApp', [
    'ngCookies',
    'restangular',
    'ui.bootstrap'
])
.constant('apiKey', 'eyJpdiI6IlpRYm14OUllSUU2ZDVZdVwvZUZWQ2szcHFzRm85RWpOQ0F1M2JQVGZsdjhZPSIsInZhbHVlIjoiV2VqY0crSTRqZVltVlVLUTB6aTNMZWlDQlh3S2ZwVWxEXC8xOFdYZjFpbUtXUVwvb09DZnl1MFJraHpQZVoxc0lTNGZpdkFXeHdKYWFOSXBoYXBcL09IbVE9PSIsIm1hYyI6IjY5NzY3NWZiMWY5MjUxMGYxYzBjN2QyYzA0MWIwYjRhOTgyMzQwNjNlMThlNTc4ZDM3OTc0NmZhNDZhNzBkZjcifQ==')
.constant('baseUrl', '/api')
.constant('mapTypes', {
    'defaultMap': 'chiwo.geid1fd8',
    'morningMap': 'chiwo.h78l0k1o',
    'dayMap': 'chiwo.geid1fd8',
    'eveningMap': 'chiwo.h78k8i58',
    'nightMap': 'chiwo.geg7cd6d'
})
.config(function(RestangularProvider, baseUrl) {
    RestangularProvider.setBaseUrl(baseUrl);
})
.run(function($http, baseUrl, apiKey) {
    $http.defaults.headers.common.Authorization = apiKey;
});
