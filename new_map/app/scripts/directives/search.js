'use strict';

angular.module('withloveApp')
    .directive('appSearch', function() {
        return {
            templateUrl: 'views/search.tpl.html',
            replace: true
        };
    });
