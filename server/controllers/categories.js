'use strict';

var mongoose = require('mongoose'),
    Category = mongoose.model('Category');

/**
 * Get all categories
 */
exports.all = function(req, res) {
    return Category.find(function (err, categories) {
        if (err) return res.send(err);

        return res.json(categories);
    });
};

/**
 * Create new category
 */
exports.create = function(req, res) {
    var newCategory = new Category(req.body);

    return newCategory.save(function(err) {
        if (err)  res.send(err);

        return res.json(newCategory);
    });
};

/**
 * Get one category
 */
exports.one = function(req, res) {
    var categoryId = req.params.id;

    return Category.findById(categoryId, function(err, category) {
        if (err) return res.send(err);

        return res.json(category);
    });
};

/**
 * Edit category
 */
exports.edit = function(req, res) {
    var newCategory = req.body;

    Category.findById(req.params.id, function(err, category) {
        category = newCategory;

        return category.save(function(err) {
            if (err) return res.send(err);

            return res.json(category);
        });
    });
};

/**
 * Remove category
 */
exports.remove = function(req, res) {
    var categoryId = req.params.id;

    return Category.findById(categoryId, function(err, category) {
        if (err) res.send(err);

        return category.remove(function(err) {
            if (err) return res.send(err);

            return res.send('removed');
        });
    });
};
