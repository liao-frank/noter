const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const folderSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: ObjectId, required: true },
  members: [ObjectId],
  created: { type: Date, required: true },
  createdBy: { type: ObjectId, required: true },
  modified: { type: Date, required: true },
  modifiedBy: { type: ObjectId, required: true},
  folders: [ObjectId],
  notes: [ObjectId]
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
