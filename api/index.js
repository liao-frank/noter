require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MLAB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  
});
