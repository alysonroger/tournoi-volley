const keystone = require('keystone');
const Types = keystone.Field.Types;

const Match = new keystone.List('Match', {
  autokey: { from: 'date team1 team2', path: 'key', unique: true },
});

// noinspection JSUnusedGlobalSymbols
Match.add({
  date: { type: Types.Date, required: true, initial: true },
  team1: { type: Types.Relationship, ref: 'Team', required: true, initial: true },
  team2: { type: Types.Relationship, ref: 'Team', required: true, initial: true },
  terrain: { type: Types.Select, options: '1, 2', required: true, initial: true },
  setsWonTeam1: { type: Types.Number },
  setsWonTeam2: { type: Types.Number },
  time: { type: Types.Select, options: '12h, 13h', required: true, initial: true },
  type: { type: Types.Select, options: 'Poule, Huitième, Quart, Demi, Finale', required: true, initial: true },
  winner: {
    type: Types.Relationship,
    ref: 'Team',
    noedit: true,
    watch: 'setsWonTeam1 setsWonTeam2',
    value: function () {
      if (this.setsWonTeam1 > 0 && this.setsWonTeam2 > 0) {
        return this.setsWonTeam1 > this.setsWonTeam2 ? this.team1 : this.team2;
      }
      return undefined;
    },
  },
});

Match.register();
