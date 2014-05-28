'use strict';

angular.module('withloveApp')
    .directive('appSearch', function() {
        return {
            templateUrl: 'views/search.tpl.html',
            replace: true,
            controller: 'SearchCtrl',
            link: function(scope, element, attrs) {

                angular.element('.addplaceform-textarea').keyup(function() {
                    var maxLength = angular.element(this).attr('data-maxlength');

                    var numOfCharacters = angular.element(this).val().length;

                    if (angular.element(this).val().length > maxLength) {
                        angular.element(this).val(angular.element(this).val().substring(0, maxLength));
                        numOfCharacters = angular.element(this).val().length;
                    }
                    angular.element('.characters-remaining').text(numOfCharacters + '/' + maxLength);
                });

                scope.addPlaceFormDisable = function() {
                    angular.element('.addplaceform-addbutton, .addplaceform-editbutton, .addplaceform-cancelbutton').attr({
                        'disabled': 'disabled',
                        'display': 'none'
                    });
                }

                scope.addPlaceFormBlock = function() {
                    angular.element('.addplaceform-addbutton, .addplaceform-editbutton, .addplaceform-cancelbutton').removeAttr('disabled');
                    angular.element('.addplaceform-addbutton, .addplaceform-editbutton, .addplaceform-cancelbutton img').attr({
                        'display': 'inline-block'
                    });
                }
            }
        };
    });
