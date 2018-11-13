const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const folderSchema = new Schema({
  owner: ObjectId,
  members: [ObjectId],
  created: Date, createdBy: ObjectId,
  modified: Date, modifiedBy: ObjectId
  folders: [ObjectId],
  notes: [ObjectId]
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
