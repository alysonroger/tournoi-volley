const keystone = require('keystone');

const Referee = new keystone.List('Referee', {
  autokey: { from: 'name', path: 'key', unique: true },
});

Referee.add({
  name: { type: String, required: true, initial: true },
});

Referee.register();
