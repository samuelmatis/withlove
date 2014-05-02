'use strict';

angular.module('withloveApp')
    .directive('appMenu', function() {
        return {
            templateUrl: 'views/navigation.tpl.html',
            replace: true,
            controller: 'MenuCtrl',
            link: function(scope, element) {
                // Menu animation on hover
                element.bind('mouseenter', function() {
                    angular.element(element).stop().animate({
                        width: '280px'
                    }, 200);
                });
                element.bind('mouseleave', function() {
                    angular.element(element).stop().animate({
                        width: '116px'
                    }, 200);
                });
            }
        };
    });
