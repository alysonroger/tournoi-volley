const keystone = require('keystone');
const Types = keystone.Field.Types;

const Team = new keystone.List('Team', {
  autokey: { from: 'name', path: 'key', unique: true },
});

Team.add({
  name: { type: String, required: true },
  pool: { type: Types.Select, options: 'A, B, C, D, E, F, G, H', initial: true },
});

Team.register();
