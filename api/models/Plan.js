const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const planSchema = new Schema({
  traits: Map,
  questions: Map,
  interviews: [ObjectId]
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
