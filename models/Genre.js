const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: { type: String, required: true, unique: true },
    abbr: { type: String, required: true, unique: true },
    discription: { type: String },
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Genre', GenreSchema);