'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var PlaceSchema = new Schema({
    id: Number,
    categoryId: Number,
    name: String,
    description: String,
    latitude: Number,
    longitude: Number,
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

mongoose.model('Place', PlaceSchema);
