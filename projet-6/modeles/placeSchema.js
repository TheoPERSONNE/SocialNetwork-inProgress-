const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  admin: { type: Boolean, require: true},
});

module.exports = mongoose.model('Place', placeSchema);
