const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const subjectSchema = new Schema({
  characteristics: Map
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
