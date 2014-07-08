'use strict';

angular.module('withlove.admin')
    .controller('SuggestCtrl', function($scope, $routeParams, $modal, $http, mapTypes, baseUrl, suggestPlaces, categories) {

        $scope.suggestPlaces = suggestPlaces;
        $scope.categories = categories;

        var mapboxStyle = mapTypes.nightMap;
        var lastOpenPopupName;

        $scope.map = L.mapbox.map('map-small', mapboxStyle, {zoomControl: false}).setView([48.3774, 17.5887], 16);
        new L.Control.Zoom({ position: 'bottomright' }).addTo($scope.map);

        var markers = L.markerClusterGroup({
            maxClusterRadius: 20,
            iconCreateFunction: function (cluster) {
                return L.divIcon({ html: cluster.getChildCount(), className: 'mycluster', iconSize: L.point(42, 53), iconAnchor: [21, 53] });
            },
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false
        });


        $scope.map.addLayer(markers);

        $scope.clearMap = function() {
            lastOpenPopupName = '';
            markers.clearLayers();
        };

        $scope.populateMap = function(place) {

            var item = place;
            var index, iconPin;
            if (place.category.length > 0) {
                index = $scope.filters.indexOf(place.category[0].name);
                iconPin = place.category[0].iconPin;
            } else {
                index = -1;
                iconPin = 'http://api.withlove.sk/images/pins/startup.png';
            }

            if (index < 0) {

                var marker = L.marker(new L.latLng(item.latitude, item.longitude), {
                    'title': item.name,
                    'marker-symbol': 'rocket',
                    'marker-color': '#09AA05',
                    icon: L.icon({
                        'iconUrl': iconPin,
                        'iconSize': [42, 53],
                        'iconAnchor': [21, 53],
                        'popupAnchor': [0, -22]
                    })
                });

                var dataId = $scope.suggestPlaces.indexOf(item);
                var popupTemplate = '<div class="angularWrapper" id="angularWrapperId-' + dataId + '" data-id="' + dataId + '"></div>';
                marker.bindPopup(popupTemplate, {
                    closeButton: false,
                    minWidth: 300
                });

                markers.addLayer(marker);

            }

        };

        $scope.showDeleteSuggestionModal = function (place) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/admin/views/deleteModal.html',
                controller: 'DialogInstanceCtrl',
                resolve: {
                    data: function() {
                        return {
                            place: place,
                            text: 'suggestion for '
                        };
                    }
                }
            });

            modalInstance.result.then(function(place) {
                place.remove(place.id).then(function(result) {
                    if(result.status === 200) {
                        var index = $scope.suggestPlaces.indexOf(place);

                        if (index > -1) {
                            $scope.suggestPlaces.splice(index, 1);
                        }
                    }
                });
            });
        };

        $scope.removeSuggestion = function (place) {
            place.remove(place.id).then(function(result) {
                if(result.status === 200) {
                    angular.forEach($scope.suggestPlaces, function(value, key){
                        if( value.id === place.id) {
                            $scope.suggestPlaces.splice(key, 1);
                        }
                    });
                }
            });
        };

        $scope.approveSuggestion = function (place) {
            var suggest_approve;

            if (place.original !== null) {
                place.category = place.category.id;
                // TODO - change to restangular
                suggest_approve = $http.put(baseUrl + '/place/' + place.original.id, place);
            } else {
                suggest_approve = place.post(place);
            }

            suggest_approve.then(function(response) {
                if(response.status === 200) {
                    $scope.removeSuggestion(place);
                }
            });
        };

    });
