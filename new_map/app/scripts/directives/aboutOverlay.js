'use strict';

angular.module('withloveApp')
    .directive('appAboutOverlay', function($cookies, $cookieStore) {
        return {
            templateUrl: 'views/about_overlay.tpl.html',
            replace: true,
            link: function(scope, element, attrs) {
                var close_button = element.find('#about-close-button');

                if($cookies.intro_about !== undefined) {
                    element.hide();
                } else {
                    element.show();
                    $cookieStore.put('intro_about', 1);
                }

                close_button.bind('click', function() {
                    element.hide();
                });
            }
        };
    });
