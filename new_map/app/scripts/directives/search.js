'use strict';

angular.module('withloveApp')
    .directive('appSearch', function() {
        return {
            templateUrl: 'views/search.tpl.html',
            replace: true,
            controller: 'SearchCtrl',
            link: function() {

                angular.element('.selected-category').click(function() {
                    var category = angular.element(this).attr('data-category');
                    var selected = angular.element('.category.' + category);

                    angular.element('.category-picker').prepend(selected);

                    fadeLI(angular.element('.category'), 0, angular.element('.category').length);

                    angular.element('.category').bind('click', function() {
                        var element = angular.element('.selected-category');
                        var text = angular.element(this).text();
                        var elementStyle = angular.element(this).attr('style');

                        element.attr('class', '')
                            .addClass('selected-category')
                            .addClass(angular.element(this).attr('data-category'))
                            .attr('data-category', angular.element(this).attr('data-category'))
                            .attr('style', elementStyle);
                        angular.element('.category-inside', element).text(text);

                        fadeLO(angular.element('.category'), 0, angular.element('.category').length);
                    });
                });

                function fadeLI(elem, i, length) {
                    if( i < length ) {
                        elem.eq(i).fadeIn(100, function() { fadeLI(elem, i+1, length); });
                    } else {
                        return false;
                    }
                }

                function fadeLO(elem, i, length) {
                    if( i < length ) {
                        elem.eq(length-1).fadeOut(100, function() { fadeLO(elem, 0, length-1); });
                    } else {
                        return false;
                    }
                }

                angular.element('.addplaceform-textarea').keyup(function(){
                    var maxLength = angular.element(this).attr('data-maxlength');

                    var numOfCharacters = angular.element(this).val().length;

                    if (angular.element(this).val().length > maxLength) {
                        angular.element(this).val(angular.element(this).val().substring(0, maxLength));
                        numOfCharacters = angular.element(this).val().length;
                    }
                    angular.element('.characters-remaining').text(numOfCharacters + '/' + maxLength);
                });
            }
        };
    });
