'use strict';

angular.module('withlove.admin')
    .directive('selectStairs', function () {
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
