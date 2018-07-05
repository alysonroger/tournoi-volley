const _ = require('lodash');
const keystone = require('keystone');

module.exports = (req, res) => {
  const view = new keystone.View(req, res);

  res.locals.section = 'ranking';

  view.on('init', next => {
    let pools = {};

    keystone
      .list('Team')
      .model
      .find()
      .exec(async (error, teams) => {

        for (const team of teams) {
          const pool = team.pool;

          if (pools[pool] === undefined) {
            pools[pool] = [];
          }

          const teamResults = {
            team: team.name,
            matchesPlayed: 0,
            matchesWon: 0,
            matchesLost: 0,
            points: 0,
          };

          await keystone
            .list('Match')
            .model
            .find()
            .populate('team1 team2 winner')
            .exec((error, matches) => {

              matches = matches.filter(match => match.winner !== undefined);

              for (const match of matches) {
                const isTeam1 = match.team1.name === team.name;
                const isTeam2 = match.team2.name === team.name;

                if (isTeam1 || isTeam2) {
                  teamResults.matchesPlayed++;

                  if (match.winner.name === team.name) {
                    teamResults.matchesWon++;

                    if (isTeam1 && match.setsWonTeam2 === 0 || isTeam2 && match.setsWonTeam1 === 0) {
                      teamResults.points += 3;
                    } else {
                      teamResults.points += 2;
                    }
                  } else {
                    teamResults.matchesLost++;

                    if (isTeam1 && match.setsWonTeam1 > 0 || isTeam2 && match.setsWonTeam2 > 0) {
                      teamResults.points++;
                    }
                  }
                }
              }
            });

          pools[pool].push(teamResults);
        }

        pools = _.map(pools, (teams, name) => {
          return {
            name,
            teams: teams
              .sort((a, b) => b.points - a.points)
              .map((team, i) => {
                team.rank = i + 1;
                return team;
              }),
          };
        }).sort((a, b) => a.name.localeCompare(b.name));

        res.locals.pools = pools;
        next();
      });
  });

  view.render('ranking');
};
