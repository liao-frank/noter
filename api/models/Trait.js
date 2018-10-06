const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const traitSchema = new Schema({
  name: String
});

const Trait = mongoose.model('Trait', traitSchema);

module.exports = Trait;
