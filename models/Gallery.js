const keystone = require('keystone');
const Types = keystone.Field.Types;

const Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	images: { type: Types.CloudinaryImages, autoCleanup : true },
});

Gallery.register();
