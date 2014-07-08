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
        .get(suggestPlaces.all)
        .post(suggestPlaces.create);
    app.route('/api/placesuggest/:id')
        .get(suggestPlaces.one)
        .put(suggestPlaces.edit)
        .delete(suggestPlaces.remove);

    // Categories
    app.route('/api/categories')
        .get(categories.all)
        .post(categories.create);
    app.route('/api/categories/:id')
        .get(categories.one)
        .put(categories.edit)
        .delete(categories.remove);

    // Users
    app.route('/api/users')
        .post(users.create)
        .put(users.changePassword);
    app.route('/api/users/me')
        .get(users.me);
    app.route('/api/users/:id')
        .get(users.show);

    // Session
    app.post('/login', session.login);
    app.get('/logout', session.logout);

    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function(req, res) {
            res.send(404);
        });

    app.route('/*')
        .get(middleware.setUserCookie, index.index);
};
