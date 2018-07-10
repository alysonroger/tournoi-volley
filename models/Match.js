const keystone = require('keystone');
const Types = keystone.Field.Types;

const Match = new keystone.List('Match', {
  autokey: { from: 'date team1 team2', path: 'key', unique: true },
});

// noinspection JSUnusedGlobalSymbols
Match.add({
  date: { type: Types.Date, required: true, initial: true },
  time: { type: Types.Select, options: '12h, 13h', required: true, initial: true },
  court: { type: Types.Select, options: '1, 2', required: true, initial: true },
  team1: { type: Types.Relationship, ref: 'Team', initial: true },
  team2: { type: Types.Relationship, ref: 'Team', initial: true },
  referee: { type: Types.Relationship, ref: 'Referee', initial: true },
  setsWonTeam1: { type: Types.Number },
  setsWonTeam2: { type: Types.Number },
  type: {
    type: Types.Select,
    options: 'Poule, Huitième, Quart, Quart consolante, Demi, Demi consolante, Finale, Finale consolante',
    required: true,
    initial: true,
  },
  winner: {
    type: Types.Relationship,
    ref: 'Team',
    noedit: true,
    watch: 'setsWonTeam1 setsWonTeam2',
    value: function () {
      if (this.setsWonTeam1 >= 0 && this.setsWonTeam2 >= 0) {
        return this.setsWonTeam1 > this.setsWonTeam2 ? this.team1 : this.team2;
      }
      return undefined;
    },
  },
});

Match.defaultColumns = 'date, time, team1, team2, referee, type';
Match.register();
