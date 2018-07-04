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
  // Views
  app.get('/', routes.views.home);
  app.get('/calendar', routes.views.calendar);
  app.get('/ranking', routes.views.ranking);

  // app.get('/gallery', routes.views.gallery);
  // app.get('/blog/:category?', routes.views.blog);
  // app.get('/blog/post/:post', routes.views.post);

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);
};
