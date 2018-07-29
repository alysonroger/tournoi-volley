const keystone = require('keystone');

module.exports = (req, res) => {
  const view = new keystone.View(req, res);
  res.locals.section = 'gallery';

  view.on('init', async next => {
    const galleries = await keystone
      .list('Gallery')
      .model
      .find()
      .sort('-publishedDate')
      .exec();

    for (const gallery of galleries) {
      gallery.videos = await keystone
        .list('Video')
        .model
        .find()
        .where('gallery', gallery.id)
        .sort('-publishedDate')
        .exec();
    }

    res.locals.galleries = galleries;
    next();
  });

  view.render('gallery');
};
