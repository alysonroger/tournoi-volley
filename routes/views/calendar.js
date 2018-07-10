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
      .sort('date')
      .populate('referee team1 team2')
      .exec((error, matches) => {
        res.locals.quarterFinalDates = formatFinalStages(matches.filter(match => match.type === 'Quart'));
        res.locals.semiFinalDates = formatFinalStages(matches.filter(match => match.type === 'Demi'));
        res.locals.finalDate = (formatFinalStages(matches.filter(match => match.type === 'Finale')) || [])[0];
        res.locals.dateBlocks = [
          {
            name: 'Huitèmes de finale',
            dates: formatDates(matches.filter(match => match.type === 'Huitième')),
          },
          {
            name: 'Poules',
            dates: formatDates(matches.filter(match => match.type === 'Poule')),
          },
        ];
        next();
      });
  });

  view.render('calendar');
};

function formatFinalStages(matches) {
  matches.forEach(match => match.date = moment(match.date).locale('fr').format('dddd Do MMMM'));
  return matches;
}

function formatDates(matches) {
  return _.map(
    _.groupBy(matches, match => match.date),
    (dayMatches, date) => {
      const slots = _.map(
        _.groupBy(dayMatches, match => match.time),
        (timeMatches, time) => {
          return { time, matches: timeMatches };
        },
      ).sort((a, b) =>  parseInt(a.time, 10) - parseInt(b.time, 10));
      return {
        day: moment(date).locale('fr').format('dddd Do MMMM'),
        slots,
      };
    },
  );
}
