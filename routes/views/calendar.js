const keystone = require('keystone');
const _ = require('lodash');

module.exports = (req, res) => {
  const view = new keystone.View(req, res);

  // Set locals
  res.locals.section = 'calendar';

  view.on('init', next => {
    // Load the galleries by sortOrder
    keystone
      .list('Match')
      .model
      .find()
      .populate('team1 team2')
      .exec((error, matches) => {
        res.locals.dates = _.map(
          _.groupBy(matches, match => match.date),
          (dayMatches, date) => {
            const slots = _.map(
              _.groupBy(dayMatches, match => match.time),
              (timeMatches, time) => {
                return { time, matches: timeMatches };
              },
            );
            return { date, slots };
          },
        );
        next();
      });
  });

  // Render the view
  view.render('calendar');
};
