'use strict';

angular.module('withloveApp')
    .controller('MapCtrl', function($scope, $rootScope, $compile, $filter, $interval, placesService, mapTypes) {

        $scope.places = [];
        $scope.filters = [];

        // Map style
        var mapboxStyle = mapTypes.nightMap;

        var dateObject = new Date();
        var hours = dateObject.getHours();

        if (hours >= 5 && hours < 9) {
            mapboxStyle = mapTypes.morningMap;
        } else if (hours >= 9 && hours < 18) {
            mapboxStyle = mapTypes.dayMap;
        } else if (hours >= 18 && hours < 20) {
            mapboxStyle = mapTypes.eveningMap;
        } else if (hours < 5 || hours >= 20) {
            mapboxStyle = mapTypes.nightMap;
        }

        // Main map instance
        var map = L.mapbox.map('map', mapboxStyle, { minZoom: 8 }).setView([48.6805720,19.9428910], 8);

        var markers = L.markerClusterGroup({
            maxClusterRadius: 20,
            iconCreateFunction: function (cluster) {
                return L.divIcon({ html: cluster.getChildCount(), className: 'mycluster', iconSize: L.point(42, 53), iconAnchor: [21, 53] });
            },
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false
        });
        var lastOpenPopupName;

        // Get places from API
        placesService.getPlaces().then(function(places) {
            $scope.places = places.data;

            // Create new instance of FuseSearcher
            var options = {
                keys: ['name'],
                distance: 50,
                threshold: 0.5
            };
            $rootScope.fuseSearcher = new Fuse($scope.places, options);

            // Populate the map with markers based on the data from the scope
            populateMap();

            // Handle if user clicks on a group of markers
            markers.on('clusterclick', function(cluster) {
                cluster.layer.zoomToBounds();
            });

            // Setup a timer to check if a popup opens, and once that happens
            // populate the popup with our partial view.
            var popupPlaceId;
            $interval(function() {
                var popupElement = angular.element('.angularWrapper');
                if (popupElement.length) {
                    // A popup is open.
                    if (popupElement.attr('id') !== lastOpenPopupName) {
                        // This is a new popup, we need to populate it.
                        lastOpenPopupName = popupElement.attr('id');
                        popupPlaceId = popupElement.data('id');

                        var popupScope = $scope.$new();
                        popupScope.item = $scope.places[popupPlaceId];

                        var placeDetailTemplate = '<div ng-include=\'"views/place_popup.tpl.html"\'></div>';
                        angular.element('#angularWrapperId-' + popupPlaceId).after($compile(placeDetailTemplate)(popupScope));
                    } else {
                        // This is the same popup as last time, it is still open.
                    }
                } else {
                    // No popup is open.
                    lastOpenPopupName = '';
                }
            }, 100);

            map.addLayer(markers);

        });

        function clearMap() {
            lastOpenPopupName = '';
            markers.clearLayers();
        }

        function populateMap() {
            // First of all, apply any active search query.
            // allPlaces = $filter('placesMatchingSearch')($scope.places, $scope.query);/
            var allPlaces = $filter('placesFuseSearch')($scope.places, $scope.query);

            // Now cyclce through all qualifying places...
            for(var i = 0, l = allPlaces.length; i < l; i++) {
                var item = allPlaces[i];

                // ... and check if they should be displayed (category is active)
                var index, iconPin;

                index = $scope.filters.indexOf(item.category.name);
                iconPin = item.category['icon_pin'];

                if (index < 0) {
                    // If yes, then build a new marker object...
                    var marker = L.marker(new L.LatLng(item.latitude, item.longitude), { 'title': item.name, 'marker-symbol':'symbol', 'marker-color': '#09AA05', icon: L.icon({
                        iconUrl: iconPin,
                        iconSize: [42, 53],
                        iconAnchor: [21, 53],
                        popupAnchor: [0, -22]
                    }) });

                    // ... bind a corresponding wrapper to the popup ...
                    marker.bindPopup('<div class="angularWrapper" id="angularWrapperId-' + $scope.places.indexOf(item) + '" data-id="' + $scope.places.indexOf(item) + '"></div>', {
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
        };

        $scope.resetSearchQuery = function(){
            // Reset the search query.
            $scope.query = '';
            $scope.search();
        };

        $scope.showPlace = function(latitude, longitude) {
            // Set the map view right on a particular location, with a lot of zoom:
            map.setView(new L.LatLng(latitude, longitude), 17);
        };

    });
