'use strict';

angular.module('withlove.admin')
    .directive('suggestMap', function() {
        return function(scope, element, attrs) {
            element.find('.map').click(function(e) {
                scope.clearMap();
                scope.populateMap(scope.place);
                scope.map.setView([scope.place.latitude, scope.place.longitude], 16);
                var map = $('.map-box2');
                var box = $(this).closest('.box');
                var instance = $(this);

                if( map.is(':visible') ) {
                    if(box.find('.map-box2').size() > 0) {
                        if (!map.is(':animated')) {
                            map.hide('slide', {direction: 'right'}, function() {
                                instance.removeClass('active');
                            });
                        }
                    } else {
                        if (!map.is(':animated')) {
                            map.hide('slide', {direction: 'right'}, function() {
                                map.parent().find('.map').removeClass('active');
                                box.prepend(map);
                                instance.addClass('active');
                                map.show('slide', {direction: 'right'});
                            });
                        }
                    }
                } else {
                    box.prepend(map);
                    map.show('slide', {direction: 'right'}, function() {
                        instance.addClass('active');
                    });
                }

                e.preventDefault();
            });
        };
    });
