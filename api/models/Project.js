const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  subjects: [ObjectId],
  plans: [ObjectId]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
