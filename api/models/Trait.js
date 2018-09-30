const mongoose = require('mongoose');

const traitSchema = new mongoose.Schema({
  name: String
});

const Trait = mongoose.model('Trait', traitSchema);

module.exports = Trait;
