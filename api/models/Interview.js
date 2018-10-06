const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const interviewSchema = new Schema({
  subjectId: ObjectId,
  answers: Map,
  audio: String,
  categories: [ObjectId],
  tags: [ObjectId]
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
