'use strict';

var mongoose = require('mongoose'),
    Place = mongoose.model('Place'),
    PlaceSuggest = mongoose.model('PlaceSuggest'),
    Category = mongoose.model('Category'),
    geocoder = require('geocoder'),
    _ = require('lodash');

/**
 * Get all places
 */
exports.all = function(req, res) {
    return PlaceSuggest.find(function(err, placeSuggest) {
        if (err) return res.send(err);

        return Category.find(function(err, categories) {
            if (err) return res.send(err);

            var returnPlaces = [];
            placeSuggest.forEach(function(place) {
                place = JSON.parse(JSON.stringify(place));
                place.category = _.where(categories, {'id': place.categoryId})[0];

                returnPlaces.push(place);
            });

            return Place.find(function(err, places) {
                if (err) return res.send(err);

                var finalPlaces = [];
                returnPlaces.forEach(function(returnPlace) {
                    returnPlace = JSON.parse(JSON.stringify(returnPlace));
                    returnPlace.original = _.where(places, {'id': returnPlace.originalId})[0];

                    returnPlace.original = JSON.parse(JSON.stringify(returnPlace.original));
                    returnPlace.original.category = _.where(categories, {'id': returnPlace.original.categoryId})[0];

                    finalPlaces.push(returnPlace);
                });

                return res.send(finalPlaces);
            });
        });
    });
};

/**
 * Get one place
 */
exports.one = function(req, res) {
    var placeId = req.params.id;

    return Place.findOne({'id': placeId}, function(err, place) {
        if (err) return res.send(err);

        // return res.json(place);

        Category.find({'id': place.categoryId}, {'id': place.original.categoryId}, function(err, category) {
            if (err) return res.send(err);

            // place = JSON.parse(JSON.stringify(place));
            // place.category = category;

            // return res.json(place);

            return res.json(category);
        });
    });
};

/**
 * Create new place
 */
exports.create = function(req, res) {
    var newPlace = new Place(req.body);

    return geocoder.geocode(req.body.street + ', ' + req.body.town + ', Slovakia', function (err, data) {
        if (err) return res.send(err);

        newPlace.latitude = data.results[0].geometry.location.lat;
        newPlace.longitude = data.results[0].geometry.location.lng;

        return newPlace.save(function(err) {
            if (err) return res.send(err);

            return res.json(newPlace);
        });
    });
};

/**
 * Edit place
 */
exports.edit = function(req, res) {
    var newPlace = req.body;
    var placeId = req.params.id;

    return Place.findOne({'id': placeId}, function(err, place) {
        if (err) return res.send(err);

        _.extend(place, newPlace);
        place.updatedAt = Date.now();

        return geocoder.geocode(newPlace.street + ', ' + newPlace.town + ', Slovakia', function (err, data) {
            if (err) return res.send(err);

            place.latitude = data.results[0].geometry.location.lat;
            place.longitude = data.results[0].geometry.location.lng;

            return place.save(function(err) {
                if (err) res.send(err);

                return res.send(place);
            });
        });
    });
};

/**
 * Remove place
 */
exports.remove = function(req, res) {
    var placeId = req.params.id;

    return Place.findOne({'id': placeId}, function(err, place) {
        if (err) res.send(err);

        return place.remove(function(err) {
            if (!err) {
                return res.send('removed');
            } else {
                return res.send(err);
            }
        });
    });
};
