const _ = require('lodash');
const keystone = require('keystone');
const moment = require('moment');

module.exports = (req, res) => {
  const view = new keystone.View(req, res);

  res.locals.section = 'calendar';

  view.on('init', next => {
    keystone
      .list('Match')
      .model
      .find()
      .populate('referee team1 team2')
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
            return {
              day: moment(date).locale('fr').format('dddd Do MMMM'),
              slots,
            };
          },
        );
        next();
      });
  });

  view.render('calendar');
};
