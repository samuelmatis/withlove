'use strict';

angular.module('withloveApp')
    .directive('appMap', function($rootScope, $interval, $compile, $filter, Map, mapTypes) {
        return {
            template: '<div id="map"></div>',
            replace: true,
            controller: 'MapCtrl',
            link: function(scope, element) {
                scope.filters = [];

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
                var map = Map.mapbox.map(element[0], mapboxStyle, { minZoom: 8 }).setView([48.6805720,19.9428910], 8);

                scope.markers = Map.markerClusterGroup({
                    maxClusterRadius: 20,
                    iconCreateFunction: function (cluster) {
                        return Map.divIcon({
                            html: cluster.getChildCount(),
                            className: 'mycluster',
                            iconSize: Map.point(42, 53),
                            iconAnchor: [21, 53]
                        });
                    },
                    spiderfyOnMaxZoom: true,
                    showCoverageOnHover: false,
                    zoomToBoundsOnClick: false
                });

                // Handle if user clicks on a group of markers
                scope.markers.on('clusterclick', function(cluster) {
                    cluster.layer.zoomToBounds();
                });

                var lastOpenPopupName;

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

                            var popupScope = scope.$new();
                            popupScope.item = scope.places[popupPlaceId];

                            var placeDetailTemplate = '<div ng-include=\'"views/place_popup.tpl.html"\'></div>';
                            angular.element('#angularWrapperId-' + popupPlaceId).after($compile(placeDetailTemplate)(popupScope));
                        }
                    } else {
                        // No popup is open.
                        lastOpenPopupName = '';
                    }
                }, 100);

                scope.clearMap = function() {
                    lastOpenPopupName = '';
                    scope.markers.clearLayers();
                };

                scope.populateMap = function() {
                    // First of all, apply any active search query.
                    var allPlaces = $filter('placesFuseSearch')(scope.places, scope.query);

                    // Now cycle through all qualifying places...
                    angular.forEach(allPlaces, function(item) {
                        var itemIndex = scope.places.indexOf(item);
                        var categoryIndex = scope.filters.indexOf(item.category.name);
                        var iconPin = item.category['icon_pin'];

                        if (categoryIndex < 0) {
                            var marker = Map.marker(new Map.LatLng(item.latitude, item.longitude), {
                                'title': item.name,
                                'marker-symbol':'symbol',
                                'marker-color': '#09AA05',
                                icon: Map.icon({
                                    iconUrl: iconPin,
                                    iconSize: [42, 53],
                                    iconAnchor: [21, 53],
                                    popupAnchor: [0, -22]
                                })
                            });

                            marker.bindPopup('<div class="angularWrapper" id="angularWrapperId-' + itemIndex + '" data-id="' + itemIndex + '"></div>', {
                                closeButton: false,
                                minWidth: 300
                            });

                            scope.markers.addLayer(marker);
                        }
                    });
                };

                scope.search = function(){
                    // Clear and repopulate the map with the current set of markes.
                    scope.clearMap();
                    scope.populateMap();
                };

                scope.resetSearchQuery = function(){
                    // Reset the search query.
                    scope.query = '';
                    scope.search();
                };

                scope.showPlace = function(latitude, longitude) {
                    // Set the map view right on a particular location, with a lot of zoom:
                    map.setView(new Map.LatLng(latitude, longitude), 17);
                };

                scope.$on('populateMap', function() {
                    // Populate the map with markers based on the data from the scope
                    scope.populateMap();
                    map.addLayer(scope.markers);
                });

                // Filter category events
                $rootScope.$on('filterAllCategories', function(event, elements) {
                    scope.filters = [];

                    angular.forEach(elements, function(element) {
                        var element = angular.element(element);
                        element.removeClass('inactive');
                        element.addClass('active');
                    });

                    scope.search();
                });

                $rootScope.$on('filterCategory', function(event, elements, selectedElement) {
                    var excludeElements = _.without(elements, selectedElement);
                    scope.filters = [];

                    angular.forEach(excludeElements, function(excludedElement) {
                        var element = angular.element(excludedElement);

                        element.removeClass('active');
                        element.addClass('inactive');

                        scope.filters.push(element.context.text);
                    });

                    var selectedElement = angular.element(selectedElement);
                    var index = scope.filters.indexOf(selectedElement.context.text);
                    if (index > -1) {
                        scope.filters.splice(index, 1);
                    }
                    selectedElement.removeClass('inactive');
                    selectedElement.addClass('active');

                    scope.search();
                });
            }
        };
    });
