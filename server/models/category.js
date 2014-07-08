'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var CategorySchema = new Schema({
    id: String,
    name: String,
    canHasChildren: String,
    color: String,
    iconNormal: String,
    iconPin: String,
    slug: String,
    order: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

mongoose.model('Category', CategorySchema);
