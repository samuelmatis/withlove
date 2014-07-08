'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var CategorySchema = new Schema({
    id: Number,
    name: String,
    canHasChildren: Number,
    color: String,
    iconNormal: String,
    iconPin: String,
    slug: String,
    order: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

mongoose.model('Category', CategorySchema);
