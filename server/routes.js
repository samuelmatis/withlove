'use strict';

var places = require('./controllers/places'),
    suggestPlaces = require('./controllers/placeSuggest'),
    categories = require('./controllers/categories'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    index = require('./controllers/index'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

    app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type");
        next();
    });

    // Places
    app.route('/api/places')
        .get(places.all)
        .post(places.create);
    app.route('/api/places/:id')
        .get(places.one)
        .put(places.edit)
        .delete(places.remove);

    // Suggest Places
    app.route('/api/placesuggest')
        .get(middleware.auth, suggestPlaces.all)
        .post(middleware.auth, suggestPlaces.create);
    app.route('/api/placesuggest/:id')
        .get(middleware.auth, suggestPlaces.one)
        .put(middleware.auth, suggestPlaces.edit)
        .delete(middleware.auth, suggestPlaces.remove);

    // Categories
    app.route('/api/categories')
        .get(categories.all)
        .post(middleware.auth, categories.create);
    app.route('/api/categories/:id')
        .get(categories.one)
        .put(middleware.auth, categories.edit)
        .delete(middleware.auth, categories.remove);

    // Users
    app.route('/api/users')
        .post(middleware.auth, users.create)
        .put(middleware.auth, users.changePassword);
    app.route('/api/users/me')
        .get(middleware.auth, users.me);
    app.route('/api/users/:id')
        .get(middleware.auth, users.show);

    // Session
    app.post('/login', session.login);
    app.get('/logout', session.logout);

    // Download data
    app.get('/api/download', middleware.auth, places.download);

    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function(req, res) {
            res.send(404);
        });

    app.route('/*')
        .get(middleware.setUserCookie, index.index);
};
