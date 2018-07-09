const keystone = require('keystone');

module.exports = (req, res) => {
	const view = new keystone.View(req, res);
  res.locals.section = 'gallery';
	view.query('galleries', keystone.list('Gallery').model.find().sort('-publishedDate'));
	view.render('gallery');
};
