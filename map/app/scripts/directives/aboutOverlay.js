'use strict';

angular.module('withloveApp')
    .directive('appAboutOverlay', function($cookies, $cookieStore) {
        return {
            templateUrl: 'views/about_overlay.tpl.html',
            replace: true,
            link: function(scope, element) {
                var closeButton = element.find('#about-close-button');

                if($cookies.withloveIntro !== undefined) {
                    element.hide();
                } else {
                    element.show();
                    $cookieStore.put('withloveIntro', 1);
                }

                closeButton.bind('click', function() {
                    element.hide();
                });
            }
        };
    });
