const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const noteSchema = new Schema({
  name: { type: String, required: true },
  owner: ObjectId,
  members: [ObjectId],
  categories: [String],
  tags: [String],
  created: Date, createdBy: ObjectId,
  modified: Date, modifiedBy: ObjectId,
  content: { type: String, default: '' }
  // TODO tags
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
