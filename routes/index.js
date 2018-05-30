const express = require('express');
const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
const routes = {
  views: importRoutes('./views'),
};

// Setup Route Bindings
module.exports = app => {
  const router = express.Router();

  // Views
  router.get('/', routes.views.index);
  router.get('/blog/:category?', routes.views.blog);
  router.get('/blog/post/:post', routes.views.post);
  router.get('/gallery', routes.views.gallery);
  router.all('/contact', routes.views.contact);

  app.use('/tournoi-volley', router);

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);
};
