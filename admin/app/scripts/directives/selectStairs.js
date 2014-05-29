'use strict';

angular.module('withlove.admin')
    .directive('selectStairs', function () {
        return function (scope, element) {
                scope.form.category = 1;

                element.find('.name-box').click(function(e) {
                    angular.element('.category').bind('click', function() {
                        var element = angular.element('.name-box');
                        element.attr('class', '')
                            .addClass('name-box')
                            .addClass($(this).data('category'))
                            .attr('data-category', $(this).data('category'));

                        fadeLO(angular.element('.category'), 0, angular.element('.category').length);

                        scope.form.category = $(this).data('category-id');
                        scope.editPlace.selectedCategory = $(this).data('category-id');
                    });

                    if (e.target !== this) {
                        e.stopPropagation();
                    } else {
                        var category = $(this).attr('data-category');
                        var selected = angular.element('.category.'+category);
                        angular.element('.category-picker').prepend(selected);

                        fadeLI(angular.element('.category'), 0, angular.element('.category').length);
                    }
                });

                function fadeLI(elem, i, length) {
                    if (i < length) elem.eq(i).fadeIn(100, function() { fadeLI(elem, i + 1, length); });
                    else return false;
                }

                function fadeLO(elem, i, length) {
                    if (i < length) elem.eq(length - 1).fadeOut(100, function() { fadeLO(elem, 0, length - 1); });
                    else return false;
                }

        };
    });
