var withloveControllers = angular.module('withloveControllers', ['ui.bootstrap', 'selectStairs']);

    withloveControllers.controller('PlacesController', function ($scope, $modal, $log, $compile, $filter, placesService, categoriesService) {
    $scope.places = [];
    $scope.categories = [];
    $scope.filters = [];
    $scope.form = {};
    $scope.default_category = {name: "Select category", color: "#C4C4C4", slug: "select-category"};
    $scope.selected_category = $scope.default_category;
    $scope.form.category = '';
    $scope.modal_title = '';
    $scope.modal_text = '';

    var markers;
    var map;
    var lastOpenPopupName = "";

    init();

    function init() {

        // Initialize the scope.

        var dateObject = new Date();
        var hours = dateObject.getHours();
        var mapbox_style = night_map;//default_map;

        /*
        if(hours >= 5 && hours < 9){
            mapbox_style = morning_map;
        } else if(hours >= 9 && hours < 16) {
            mapbox_style = day_map;
        } else if(hours >= 16 && hours < 20) {
            mapbox_style = evening_map;
        } else if(hours < 5 || hours >= 20) {
            mapbox_style = night_map;
        }
        */

        var placesPromise = placesService.getPlaces();
        var categoriesPromise = categoriesService.getCategories();

        categoriesPromise.then(function(categories) {
            return $scope.categories = categories.data;
        });

        $scope.add_new_place_form = false;

        $scope.$on("finished", function () {
            $scope.$destroy();
        });

        var placeDetailTemplate = "<div ng-include=\"'partials/place_popup.html'\"></div>";


        // Initialize the MapBox map
        map = L.mapbox.map('map', mapbox_style, {minZoom: 8}).setView([48.6805720,19.9428910], 8);

        markers = L.markerClusterGroup({
            maxClusterRadius: 20,
            iconCreateFunction: function (cluster) {
                return L.divIcon({ html: cluster.getChildCount(), className: 'mycluster', iconSize: L.point(42, 53), iconAnchor: [21, 53] })
            },
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false
        });

        placesPromise.then(function(places) {
            $scope.places = places.data;

            // Initialize the Fuse searcher object for the list of places
            var options = {
                keys: ['name'],
                distance: 50,
                threshold: 0.5
            }
            fuseSearcher = new Fuse($scope.places, options);

            // Populate the map with markers based on the data from the scope
            populateMap();

            // Handle if user clicks on a group of markers
            markers.on('clusterclick', function (a) {
                a.layer.zoomToBounds();
            });

            // Setup a timer to check if a popup opens, and once that happens
            // populate the popup with our partial view.
            var popupPlaceId;
            var popupScope;
            var popupTimer = setInterval( function() {
                popupElement = $(".angularWrapper");
                if (popupElement.length) {
                    // A popup is open.
                    if (popupElement.attr('id') != lastOpenPopupName) {
                        // This is a new popup, we need to populate it.
                        lastOpenPopupName = popupElement.attr('id');
                        popupPlaceId = popupElement.data('id');

                        // Prepare a specific scope for this popup.
                        var popupScope = $scope.$new();
                        popupScope.item = $scope.places[popupPlaceId];

                        // Render the template using the specific scope:
                        $("#angularWrapperId-" + popupPlaceId).after($compile(placeDetailTemplate)(popupScope));
                        $scope.$digest();
                    } else {
                        // This is the same popup as last time, it is still open.
                    }
                } else {
                    // No popup is open.
                    lastOpenPopupName = "";
                }
            }, 100);

            map.addLayer(markers);

        });
    }

    function clearMap() {
        lastOpenPopupName = "";
        markers.clearLayers();
    }

    function populateMap() {

        // First of all, apply any active search query.
        //allPlaces = $filter("placesMatchingSearch")($scope.places, $scope.query);
        allPlaces = $filter("placesFuseSearch")($scope.places, $scope.query);

        // Now cyclce through all qualifying places...
        for(var i = 0, l = allPlaces.length; i < l; i++) {
            var item = allPlaces[i];
            var title = item.name;
            var symbol = 'rocket';
            var color = '#09AA05';
            var latitude = item.latitude;
            var longitude = item.longitude;
            var category = item.category;

            // ... and check if they should be displayed (category is active)
            var index, icon_pin;

            index = $scope.filters.indexOf(category.name);
            icon_pin = category.icon_pin;

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
    }

    $scope.search = function(){
        // Clear and repopulate the map with the current set of markes.
        clearMap();
        populateMap();
    }

    $scope.resetSearchQuery = function(){
        // Reset the search query.
        $scope.query = "";
        $scope.search();
    }

    $scope.showPlace = function(latitude, longitude) {
        // Set the map view right on a particular location, with a lot of zoom:
        map.setView(new L.LatLng(latitude, longitude), 17);
    }

    $scope.showAddPlaceForm = function(){
        $scope.form.name = $scope.query;
        $scope.addPlaceFormVisible = true;
        //console.log($scope.addPlaceFormVisible);
    }

    $scope.cancelAddPlaceForm = function(){
        $scope.form = {};
        $scope.selected_category = $scope.default_category;
        $scope.addPlaceFormVisible = false;
        $scope.clearForm();
        $scope.query = '';
        $scope.search();
    }

    $scope.filterCategory = function(name, event){

        // Toggle navigation filter button state
        var myElement = $(event.target);

        if(myElement.hasClass('active')) {
            // Setting a filter
            $scope.filters.push(name);
            myElement.removeClass('active');
            myElement.addClass('inactive');
        } else {
            // Unsetting the filter
            var index = $scope.filters.indexOf(name);
            if (index > -1) {
                $scope.filters.splice(index, 1);
            }
            myElement.removeClass('inactive');
            myElement.addClass('active');
        }

        // Clear all map markers and repopulate the map with the new filter

        clearMap();
        populateMap();

    }

    $scope.saveNewPlace = function(){

        if($scope.form.category != ''){

            if($scope.form.web.indexOf('http') < 0) {
                $scope.form.web = 'http://' + $scope.form.web;
            }

            $('.addplaceform-addbutton').attr('disabled', 'disabled');
            $('.addplaceform-addbutton img').attr('display', 'block');
            $('.addplaceform-addbutton span').attr('display', 'none');

            var addPlacePromise = placesService.insertPlace($scope.form);
            addPlacePromise.then(function(c){
                var modalInstance = $modal.open({
                    templateUrl: 'successModalMessage',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        data: function(){
                            return {
                                title: 'ADD NEW PLACE',
                                text: 'Place was successfully added and now is awaiting approval from the administrators.'
                            }
                        }

                    }
                });

                $scope.clearForm();
                $scope.addPlaceFormVisible = false;
                $scope.query = '';
                $scope.search();

                $('.addplaceform-addbutton').removeAttr('disabled');
                $('.addplaceform-addbutton img').attr('display', 'none');
                $('.addplaceform-addbutton span').attr('display', 'inline-block');

            }, function(c) {
                var modalInstance = $modal.open({
                    templateUrl: 'errorModalMessage',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        data: function(){
                            return {
                                title: 'ADD NEW PLACE',
                                text: 'Adding the place failed. Please try again or contact the administrators.'
                            }
                        }

                    }
                });

                $('.addplaceform-addbutton').removeAttr('disabled');
                $('.addplaceform-addbutton img').attr('display', 'none');
                $('.addplaceform-addbutton span').attr('display', 'inline-block');
            });
        } else {
            console.log($scope.form);
        }
    }

    $scope.saveEditData = function(){

        $('.addplaceform-editbutton').attr('disabled', 'disabled');
        $('.addplaceform-editbutton img').attr('display', 'block');
        $('.addplaceform-editbutton span').attr('display', 'none');


        if($scope.form.web.indexOf('http') < 0) {
            $scope.form.web = 'http://' + $scope.form.web;
        }

        var editPlacePromise = placesService.editPlace($scope.form);

        editPlacePromise.then(function(c) {
                var modalInstance = $modal.open({
                    templateUrl: 'successModalMessage',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        data: function(){
                            return {
                                title: 'EDIT PLACE',
                                text: 'Your suggestion was added and is now awaiting approval from the administrators.'
                            }
                        }

                    }
                });

                $scope.clearForm();
                $scope.addPlaceFormVisible = false;
                $scope.query = '';
                $scope.search();

                $('.addplaceform-editbutton').removeAttr('disabled');
                $('.addplaceform-editbutton img').attr('display', 'none');
                $('.addplaceform-editbutton span').attr('display', 'inline-block');

            }, function(c) {
                var modalInstance = $modal.open({
                    templateUrl: 'errorModalMessage',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        data: function(){
                            return {
                                title: 'EDIT PLACE',
                                text: 'Adding suggestion failed. Please try again or contact the administrators.'
                            }
                        }

                    }
                });

                $('.addplaceform-editbutton').removeAttr('disabled');
                $('.addplaceform-editbutton img').attr('display', 'none');
                $('.addplaceform-editbutton span').attr('display', 'inline-block');
            });
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
        $scope.form.description = myItem.description;

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
        $scope.form.description = '';
    }
});


/* ************************************************************************* */
/* MyPopupContentsController */

withloveControllers.controller('MyPopupContentsController', function ($scope, $compile) {

    init();

    function init() {
        //some initializer
    }

});

/* ************************************************************************* */
/* ModalInstanceCtrl */

withloveControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, data) {

    $scope.modal_data = data;

    $scope.ok = function () {
        $modalInstance.close();
    };
});