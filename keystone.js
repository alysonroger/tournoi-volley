// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

const cloudinary = require('cloudinary');
const keystone = require('keystone');
const handlebars = require('express-handlebars');

const config = require('./config.json');
const Helpers = require('./templates/views/helpers');

console.log('Starts keystone');

keystone.init({
  'admin path': 'admin',
  'auth': true,
  'auto update': true,
  'brand': 'Tournoi de Volley GEMS',
  'cloudinary config': config.cloudinary,
  'cookie secret': config.cookieSecret,
  'custom engine': handlebars.create({
    layoutsDir: 'templates/views/layouts',
    partialsDir: 'templates/views/partials',
    defaultLayout: 'default',
    helpers: new Helpers(),
    extname: '.hbs',
  }).engine,
  'favicon': 'public/favicon.ico',
  'locals': {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable,
  },
  'mongo': config.mongo,
  'name': 'Tournoi de Volley GEMS',
  'routes': require('./routes'),
  'session': true,
  'static': 'public',
  'user model': 'User',
  'view engine': '.hbs',
  'views': 'templates/views',
});

cloudinary.config(config.cloudinary);

// Load your project's Models
keystone.import('models');

// Need to be done after models import
keystone.set('nav', {
  galleries: 'galleries',
  users: 'users',
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();
