'use strict';

angular.module('withlove', [
    'withlove.shared',
    'withlove.map',
    'withlove.admin'
])
.config(function(RestangularProvider, baseUrl) {
    RestangularProvider.setBaseUrl(baseUrl);
})
.run(function($http, baseUrl, apiKey) {
    $http.defaults.headers.common.Authorization = apiKey;
});
