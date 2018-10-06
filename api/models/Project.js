const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const projectSchema = new Schema({
  subjects: [ObjectId],
  plans: [ObjectId]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
