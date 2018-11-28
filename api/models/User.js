const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  myNotes: { type: ObjectId },
  sharedNotes: { type: ObjectId },
  trash: { type: ObjectId },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
