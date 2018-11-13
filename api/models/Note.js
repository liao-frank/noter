const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const noteSchema = new Schema({
  owner: ObjectId,
  members: [ObjectId],
  categories: [String],
  created: Date, createdBy: ObjectId,
  modified: Date, modifiedBy: ObjectId
  content: String,
  // TODO tags
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
