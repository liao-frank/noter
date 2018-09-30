const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  characteristics: Map
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
