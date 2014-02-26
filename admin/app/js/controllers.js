
var withloveAdminControllers = angular.module('withloveAdminControllers', ['ui.bootstrap', 'myDirective', 'addPlaceDirective', 'inputCondition']);

withloveAdminControllers.controller('PlacesController', function ($scope, $rootScope, $routeParams, $location, $modal, $log, $compile, $filter, placesService, categoryService, authService) {

    $scope.suggest_places = [];
    $scope.categories = [];
    $scope.form = {};
    $scope.editForm = {};
    $scope.map;
    $scope.editPlace = {};
    $scope.editPlaceObject = {};

    var markers;
    var map;

    init();

    function init() {

        var placesPromise = placesService.getPlaces();
        var placesSuggestPromise = placesService.getSuggestPlaces();
        var categoryPromise = categoryService.getCategory();

        if ($routeParams.placeId != undefined) {
            var editPlacePromise = placesService.getPlace($routeParams.placeId);

            editPlacePromise.then(function(e){
                $scope.editPlace = e.data;
                $scope.editPlace.selectedCategory = $scope.editPlace.category.id;

            });
        }


        $scope.map = L.mapbox.map('map-small', 'blackthorn42.go2l0d2c', {zoomControl: false}).setView([48.3774, 17.5887], 16);
        new L.Control.Zoom({ position: 'bottomright' }).addTo($scope.map);

        markers = L.markerClusterGroup({
            maxClusterRadius: 20,
            iconCreateFunction: function (cluster) {
                return L.divIcon({ html: cluster.getChildCount(), className: 'mycluster', iconSize: L.point(42, 53), iconAnchor: [21, 53] })
            },
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false
        });

        placesPromise.then(function(p) {

            $scope.places = p;

            // Initialize the Fuse searcher object for the list of places
            var options = {
                keys: ['name'],
                distance: 50,
                threshold: 0.5
            }
            fuseSearcher = new Fuse($scope.places, options);

            $scope.map.addLayer(markers);

        });

        placesSuggestPromise.then(function(p) {
            $scope.suggest_places = p;
            $scope.map.addLayer(markers);
        });

        categoryPromise.then(function(c) {
            $scope.categories = c;
        });

    }

    $scope.showDeleteModal = function (place) {

        var modalInstance = $modal.open({
            templateUrl: 'deleteModalWindow',
            controller: 'DialogInstanceCtrl',
            resolve: {
                data: function(){
                    return {
                        place: place,
                        text: ''
                    }
                }

            }
        });

        modalInstance.result.then(function (place) {

            var placeDeletePromise = placesService.deletePlace(place.id);

            placeDeletePromise.then(function(p){
                console.log('vbehlo do nej!!!', p);
                if(p.status == 200) {

                    var index = $scope.places.indexOf(place);

                    if (index > -1) {
                        $scope.places.splice(index, 1);
                    }
                }
            });

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.showDeleteSuggestionModal = function (place) {

        var modalInstance = $modal.open({
            templateUrl: 'deleteModalWindow',
            controller: 'DialogInstanceCtrl',
            resolve: {
                data: function(){
                    return {
                        place: place,
                        text: 'suggestion for '
                    }
                }

            }
        });

        modalInstance.result.then(function (place) {

            var placeDeleteSuggestionPromise = placesService.deleteSuggestPlace(place.id);

            placeDeleteSuggestionPromise.then(function(p){
                console.log('vbehlo do nej', p);
                if(p.status == 200) {

                    var index = $scope.suggest_places.indexOf(place);

                    if (index > -1) {
                        $scope.suggest_places.splice(index, 1);
                    }
                }
            });

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.removeSuggestion = function (place) {

        $suggest_remove = placesService.deleteSuggestPlace(place.id);

        $suggest_remove.then(function(p) {
            if(p.status == 200) {
                angular.forEach($scope.suggest_places, function(value, key){
                    if( value.id == place.id) {
                        $scope.suggest_places.splice(key, 1);
                    }

                });
            }
        });
    }

    $scope.approveSuggestion = function (place) {

        if (place.original != null) {
            place.category = place.category.id;
            $suggest_approve = placesService.approveSuggestPlace(place);
        }
        else {
            $suggest_approve = placesService.addSuggestPlace(place);
        }

        $suggest_approve.then(function(p) {
            if(p.status == 200) {
                $scope.removeSuggestion(place);
            }
        });

    }

    $scope.clearMap = function () {
        lastOpenPopupName = "";
        markers.clearLayers();
    }

    $scope.populateMap = function (place) {

        allPlaces = place;

        var item = allPlaces;
        var marker_style = "icon-type1";
        var title = item.name;
        var symbol = 'rocket';
        var color = '#09AA05';
        var latitude = item.latitude;
        var longitude = item.longitude;
        var category = item.category;

        // ... and check if they should be displayed (category is active)
        var index, icon_pin;

        if(category.length > 0){
            index = $scope.filters.indexOf(category[0].name);
            icon_pin = category[0].icon_pin;
        } else {
            index = -1;
            icon_pin = "http://api.withlove.sk/images/pins/startup.png";
        }
        if (index < 0) {

            // If yes, then build a new marker object...
            var marker = L.marker(new L.LatLng(latitude, longitude), { "title": title, "marker-symbol": "symbol", "marker-color": color, icon: L.icon({
                iconUrl: icon_pin,
                iconSize: [42, 53],
                iconAnchor: [21, 53],
                popupAnchor: [0, -22]
            }) });


            // ... bind a corresponding wrapper to the popup ...
            marker.bindPopup("<div class='angularWrapper' id='angularWrapperId-" + $scope.places.indexOf(item) + "' data-id='" + $scope.places.indexOf(item) + "'></div>",{
                closeButton: false,
                minWidth: 300
            });

            // ... and finally add the marker to the map.
            markers.addLayer(marker);
        }
    }

    $scope.editItem = function(myItem){
        $scope.selected_category = myItem.category;
        $scope.form.id = myItem.id;
        $scope.form.name = myItem.name;
        $scope.form.town = myItem.town;
        $scope.form.street = myItem.street;
        $scope.form.web = myItem.web;
        $scope.form.email = myItem.email;
        $scope.form.phone = myItem.phone;

        $scope.form.category = myItem.category.id;

        $scope.editAction = true;
        $scope.addPlaceFormVisible = true;
    }

    $scope.clearForm = function(){
        $scope.form.id = '';
        $scope.form.name = '';
        $scope.form.town = '';
        $scope.form.street ='';
        $scope.form.web = '';
        $scope.form.email = '';
        $scope.form.phone = '';
        $scope.form.category = '';
    }

    $scope.addNewForm = function() {

        $('.submit-place').attr('disabled', 'disabled');
        $('.submit-place img').attr('display', 'block');
        $('.submit-place span').attr('display', 'none');

        if($scope.form.category != ''){

            var addPlacePromise = placesService.insertPlace($scope.form);
            addPlacePromise.then(function(c){
                var modalInstance = $modal.open({
                    templateUrl: 'successModalMessage',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        data: function(){
                            return {
                                title: 'PRIDANIE MIESTA',
                                text: 'Pridanie miesta prebehlo úspešne.'
                            }
                        }

                    }
                });

                $scope.form.name = '';
                $scope.form.street = '';
                $scope.form.town = '';
                $scope.form.web = '';
                $scope.form.email = '';
                $scope.form.phone = '';
                $scope.form.description = '';

                $('.submit-place').removeAttr('disabled');
                $('.submit-place img').attr('display', 'none');
                $('.submit-place span').attr('display', 'inline-block');

            }, function(c) {
                var modalInstance = $modal.open({
                    templateUrl: 'errorModalMessage',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        data: function(){
                            return {
                                title: 'PRIDANIE MIESTA',
                                text: 'Pridanie miesta sa nepodarilo.'
                            }
                        }

                    }
                });

                $('.submit-place').removeAttr('disabled');
                $('.submit-place img').attr('display', 'none');
                $('.submit-place span').attr('display', 'inline-block');
            });

        } else {
            console.log($scope.form);
        }
    }

    $scope.doEditPlace = function(place) {

        $('.submit-place').attr('disabled', 'disabled');
        $('.submit-place img').attr('display', 'block');
        $('.submit-place span').attr('display', 'none');

        var editObject = {};
        editObject.id = place.id;
        editObject.category = place.selectedCategory;
        editObject.name = place.name;
        editObject.street = place.street;
        editObject.town = place.town;
        editObject.zip = place.zip;
        editObject.web = place.web;
        editObject.email = place.email;
        editObject.phone = place.phone;
        editObject.description = place.description;

        if(editObject.category != ''){

            var editPlacePromise = placesService.editPlace(editObject);
            editPlacePromise.then(function(c){
                var modalInstance = $modal.open({
                    templateUrl: 'successModalMessage',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        data: function(){
                            return {
                                title: 'ÚPRAVA MIESTA',
                                text: 'Úprava miesta prebehla úspešne.'
                            }
                        }

                    }
                });

                $('.submit-place').removeAttr('disabled');
                $('.submit-place img').attr('display', 'none');
                $('.submit-place span').attr('display', 'inline-block');
            }, function(c) {

                var response = '';
                angular.forEach(c.data.errors, function(d) {
                    response += ' '+d;
                });

                var modalInstance = $modal.open({
                    templateUrl: 'errorModalMessage',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        data: function(){
                            return {
                                title: 'ÚPRAVA MIESTA',
                                text: 'Úprava miesta neprebehla úspešne.'+response
                            }
                        }

                    }
                });

                $('.submit-place').removeAttr('disabled');
                $('.submit-place img').attr('display', 'none');
                $('.submit-place span').attr('display', 'inline-block');
            });

        } else {
            console.log($scope.form);
        }
    }

    $scope.redirectHome = function() {
        $location.path('/');
    }

    $scope.clearPlaceSuggest = function() {
        $('.suggest-new-place').hide();
    }

    $scope.showPlaceSuggest = function() {
        $('.suggest-new-place').show();
    }
});

withloveAdminControllers.controller('LoginController', function($scope, $location, authService){
    $scope.loginForm = {};

    $scope.login = function() {

        var email = $scope.loginForm.email,
            password = $scope.loginForm.password;

        console.log('user email and password', $scope.loginForm);
        console.log(authService);

        authService.loginUser(email, password);
    }
});

/* ************************************************************************* */
/* ModalInstanceCtrl */

withloveAdminControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, data) {

    $scope.modal_data = data;

    $scope.ok = function () {
        $modalInstance.close();
    };
});

/* ************************************************************************* */
/* DialogInstanceCtrl */

withloveAdminControllers.controller('DialogInstanceCtrl', function ($scope, $modalInstance, data) {

    $scope.modal_data = data;

    $scope.ok = function () {
        $modalInstance.close(data.place);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});