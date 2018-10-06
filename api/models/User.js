const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  projects: [ObjectId],
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
