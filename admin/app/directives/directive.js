angular.module('myDirective', [])
    .directive('myDirective', function () {
        return {
            restrict: 'A',

            link: function (scope, element, attrs) {

                element.find('.map').click(function(e){

                    scope.clearMap();
                    scope.populateMap(scope.place);
                    scope.map.setView([scope.place.latitude, scope.place.longitude], 16);
                    var map = $('.map-box2');
                    var box = $(this).closest('.box');
                    var instance = $(this);

                    if( map.is(':visible') ) {

                        if( box.find('.map-box2').size() > 0 ) {

                            if ( !map.is(':animated')) {
                                map.hide('slide', {direction: 'right'}, function() { instance.removeClass('active'); });
                            }
                        }
                        else {
                            if ( !map.is(':animated')) {
                                map.hide('slide', { direction: 'right'}, function() { map.parent().find('.map').removeClass('active'); box.prepend(map); instance.addClass('active'); map.show('slide', {direction: 'right'}); });
                            }
                        }

                    }
                    else {
                        box.prepend(map);
                        map.show('slide', {direction: 'right'}, function() { instance.addClass('active'); } );
                    }

                    e.preventDefault();
                });

            }
        };
    });


angular.module('addPlaceDirective', [])
    .directive('addPlaceDirective', function () {
        return {
            restrict: 'A',

            link: function (scope, element, attrs) {

                scope.form.category = 1;

                element.find('.name-box').click(function(e) {

                    $('.category').bind('click', function() {

                        var element = $('.name-box');

                        element.attr('class', '')
                            .addClass('name-box')
                            .addClass($(this).data('category'))
                            .attr('data-category', $(this).data('category'));

                        fadeLO($('.category'), 0, $('.category').length);

                        scope.form.category = $(this).data('category-id');
                        scope.editPlace.selectedCategory = $(this).data('category-id');
                    });


                    if (e.target !== this) {
                        e.stopPropagation();
                    }
                    else {
                        var category = $(this).attr('data-category');

                        var selected = $('.category.'+category);
                        $('.category-picker').prepend(selected);

                        fadeLI($('.category'), 0, $('.category').length);
                    }



                });

                function fadeLI(elem, i, length) {
                    if( i < length ) {
                        elem.eq(i).fadeIn(100, function() { fadeLI(elem, i+1, length); });
                    }
                    else return false;

                }

                function fadeLO(elem, i, length) {
                    if( i < length ) {
                        elem.eq(length-1).fadeOut(100, function() { fadeLO(elem, 0, length-1); });
                    }
                    else return false;

                }



            }
        };
    });

angular.module('inputCondition', [])
    .directive('inputCondition', function () {
        return {
            restrict: 'A',

            link: function (scope, element, attrs) {

                element.find('textarea').keyup(function(){
                    var max = 255;
                    var len = $(this).val().length;
                    $('.char-remaining').text(len + '/' + max);
                });
            }
        };
    });