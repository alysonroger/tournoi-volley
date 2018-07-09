const _ = require('lodash');
const hbs = require('handlebars');
const keystone = require('keystone');
const cloudinary = require('cloudinary');

// Collection of templates to interpolate
const scriptTemplate = _.template('<script src="<%= src %>"></script>');
const cssLinkTemplate = _.template('<link href="<%= href %>" rel="stylesheet">');

module.exports = function () {

  const _helpers = {};

  /**
   * Generic HBS Helpers
   * ===================
   */

  // standard hbs equality check, pass in two values from template
  // {{#ifeq keyToCheck data.myKey}} [requires an else blockin template regardless]
  _helpers.ifeq = function (a, b, options) {
    if (a === b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  };

  /**
   * KeystoneJS specific helpers
   * ===========================
   */

  // block rendering for keystone admin css
  _helpers.isAdminEditorCSS = function (user) {
    let output = '';
    if (typeof (user) !== 'undefined' && user.isAdmin) {
      output = cssLinkTemplate({
        href: '/keystone/styles/content/editor.min.css',
      });
    }
    return new hbs.SafeString(output);
  };

  // block rendering for keystone admin js
  _helpers.isAdminEditorJS = function (user) {
    let output = '';
    if (typeof (user) !== 'undefined' && user.isAdmin) {
      output = scriptTemplate({
        src: '/keystone/js/content/editor.js',
      });
    }
    return new hbs.SafeString(output);
  };

  // ### CloudinaryUrl Helper
  // Direct support of the cloudinary.url method from Handlebars (see
  // cloudinary package documentation for more details).
  //
  // *Usage examples:*
  // `{{{cloudinaryUrl image width=640 height=480 crop='fill' gravity='north'}}}`
  // `{{#each images}} {{cloudinaryUrl width=640 height=480}} {{/each}}`
  //
  // Returns an src-string for a cloudinary image

  _helpers.cloudinaryUrl = function (context, options) {

    // if we don't pass in a context and just kwargs
    // then `this` refers to our default scope block and kwargs
    // are stored in context.hash
    if (!options && context.hasOwnProperty('hash')) {
      // strategy is to place context kwargs into options
      options = context;
      // bind our default inherited scope into context
      context = this;
    }

    // safe guard to ensure context is never null
    context = context === null ? undefined : context;

    if ((context) && (context.public_id)) {
      options.hash.secure = keystone.get('cloudinary secure') || false;
      const imageName = context.public_id.concat('.', context.format);
      return cloudinary.url(imageName, options.hash);
    }
    else {
      return null;
    }
  };

  return _helpers;
};
