const keystone = require('keystone');
const Types = keystone.Field.Types;

const Team = new keystone.List('Team', {
  autokey: { from: 'name', path: 'key', unique: true },
});

Team.add({
  name: { type: String, required: true },
  pool: { type: Types.Select, options: '1, 2, 3, 4, 5, 6, 7, 8', required: true, initial: true },
});

Team.register();
