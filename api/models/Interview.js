const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  subjectId: ObjectId,
  answers: Map,
  audio: String,
  categories: [ObjectId],
  tags: [ObjectId]
});

const Interview = mongoose.model('Interview', schema);

module.exports = Interview;
