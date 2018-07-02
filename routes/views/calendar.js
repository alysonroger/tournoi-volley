const keystone = require('keystone');

module.exports = (req, res) => {
  const view = new keystone.View(req, res);

  // Set locals
  res.locals.section = 'calendar';

  // Load the galleries by sortOrder
  view.query('matches',
    keystone
      .list('Match')
      .model
      .find()
      .populate('team1 team2'),
  );

  // Render the view
  view.render('calendar');
};
