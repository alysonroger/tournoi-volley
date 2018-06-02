const keystone = require('keystone');

module.exports = (req, res) => {
  const view = new keystone.View(req, res);
  res.locals.section = 'home';
  view.render('home');
};
