'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var PlaceSuggestSchema = new Schema({
    id: String,
    originalId: String,
    categoryId: String,
    name: String,
    description: String,
    latitude: String,
    longitude: String,
    email: String,
    country: String,
    parent: String,
    phone: String,
    zip: String,
    street: String,
    tags: [{ type: String }],
    town: String,
    web: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

mongoose.model('PlaceSuggest', PlaceSuggestSchema);
