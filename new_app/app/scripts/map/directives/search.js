'use strict';

angular.module('withlove.map')
    .directive('appSearch', function(placesService, $modal) {
        return {
            templateUrl: '/scripts/map/views/search.tpl.html',
            replace: true,
            controller: 'SearchCtrl',
            link: function(scope) {

                var modalMessages = {
                    add: {
                        title: 'ADD NEW PLACE',
                        success: 'Place was successfully added and now is awaiting approval from the administrators.',
                        error: 'Adding the place failed. Please try again or contact the administrators.'
                    },
                    edit: {
                        title: 'EDIT PLACE',
                        success: 'Your suggestion was added and is now awaiting approval from the administrators.',
                        error: 'Adding suggestion failed. Please try again or contact the administrators.'
                    }
                };

                scope.saveNewPlace = function(){
                    if(scope.form.category !== '') {

                        if(typeof scope.form.web !== 'undefined') {
                            if(scope.form.web.indexOf('http') < 0) {
                                scope.form.web = 'http://' + scope.form.web;
                            }
                        }

                        scope.addPlaceFormDisable();

                        placesService.post(scope.form).then(function() {
                            $modal.open({
                                templateUrl: 'scripts/map/views/successModalMessage.tpl.html',
                                controller: 'ModalInstanceCtrl',
                                resolve: {
                                    data: function() {
                                        return { title: modalMessages.add.title, text: modalMessages.add.success };
                                    }
                                }
                            });
                            scope.clearFormAfterSave();
                        }, function() {
                            $modal.open({
                                templateUrl: 'scripts/map/views/errorModalMessage.tpl.html',
                                controller: 'ModalInstanceCtrl',
                                resolve: {
                                    data: function() {
                                        return { title: modalMessages.add.title, text: modalMessages.add.error };
                                    }
                                }
                            });
                            scope.addPlaceFormBlock();
                        });
                    } else {
                        scope.selectedCategory = scope.defaultCategory;
                    }
                };

                scope.saveEditData = function(){

                    if(scope.form.web.indexOf('http') < 0) {
                        scope.form.web = 'http://' + scope.form.web;
                    }

                    placesService.one(scope.form.id).get().then(function(place) {
                        scope.addPlaceFormDisable();

                        _.extend(place, scope.form);

                        var placePutPromise = place.put();
                        placePutPromise.then(function() {
                            $modal.open({
                                templateUrl: 'scripts/map/views/successModalMessage.tpl.html',
                                controller: 'ModalInstanceCtrl',
                                resolve: {
                                    data: function(){
                                        return { title: modalMessages.edit.title, text: modalMessages.add.success };
                                    }

                                }
                            });
                            scope.clearFormAfterSave();
                        }, function() {
                            $modal.open({
                                templateUrl: 'scripts/map/views/errorModalMessage.tpl.html',
                                controller: 'ModalInstanceCtrl',
                                resolve: {
                                    data: function(){
                                        return { title: modalMessages.add.title, text: modalMessages.add.error };
                                    }

                                }
                            });
                            scope.addPlaceFormBlock();
                        });
                    });
                };

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
                };

                scope.addPlaceFormBlock = function() {
                    angular.element('.addplaceform-addbutton, .addplaceform-editbutton, .addplaceform-cancelbutton').removeAttr('disabled');
                    angular.element('.addplaceform-addbutton, .addplaceform-editbutton, .addplaceform-cancelbutton img').attr({
                        'display': 'inline-block'
                    });
                };
            }
        };
    });
