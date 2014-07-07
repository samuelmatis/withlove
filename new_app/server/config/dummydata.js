'use strict';

var mongoose = require('mongoose'),
    Place = mongoose.model('Place'),
    PlaceSuggest = mongoose.model('PlaceSuggest'),
    Category = mongoose.model('Category'),
    User = mongoose.model('User');

/**
 * Populate database with demo application data
 */
var placesDataFile = require('../demo_data/places.json');
var placeSuggestDataFile = require('../demo_data/placeSuggest.json');
var categoriesDataFile = require('../demo_data/categories.json');
var usersDataFile = require('../demo_data/users.json');

var placesData = JSON.parse(JSON.stringify(placesDataFile));
var placeSuggestData = JSON.parse(JSON.stringify(placeSuggestDataFile));
var categoriesData = JSON.parse(JSON.stringify(categoriesDataFile));
var usersData = JSON.parse(JSON.stringify(categoriesDataFile));

Place.find({}).remove(function() {
    Place.create(placesData, function(err, result) {
        if (err) console.log('Cannot insert places demo data');
        else console.log('Finished populating places');
    });
});

PlaceSuggest.find({}).remove(function() {
    PlaceSuggest.create(placeSuggestData, function(err, result) {
        if (err) console.log('Cannot insert places demo data');
        else console.log('Finished populating places');
    });
});

Category.find({}).remove(function() {
    Category.create(categoriesData, function(err, result) {
        if (err) console.log('Cannot insert categories demo data');
        else console.log('Finished populating categories');
    });
});

// User.find({}).remove(function() {
//     User.create(usersData, function(err, result) {
//         if (err) console.log('Cannot insert users demo data', err);
//         else console.log('Finished populating users');
//     });
// });
