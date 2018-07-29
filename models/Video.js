const keystone = require('keystone');
const Types = keystone.Field.Types;

const Video = new keystone.List('Video', {
  autokey: { from: 'url', path: 'key', unique: true },
});

Video.add({
  gallery: { type: Types.Relationship, ref: 'Gallery', required: true, initial: true },
  publishedDate: { type: Date, default: Date.now },
  thumbnailUrl: { type: Types.Url, required: true, initial: true },
  url: { type: Types.Url, required: true, initial: true },
});

Video.register();
