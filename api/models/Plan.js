const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  traits: Map,
  questions: Map,
  interviews: [ObjectId]
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
