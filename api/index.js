/* CONSTANTS */
const PORT = '3001';
/* INIT */
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const { configureModel } = require(__dirname + '/utils/mongooseSocket');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
/* HELPERS */
const getModels = () => {
  const path = __dirname + '/models';
  const files = fs.readdirSync(path);
  const models = files.map(file => require(`${path}/${file}`));
  return models.filter(m => Object.keys(m).length);
};

/* CONNECT */
mongoose.connect(process.env.MLAB_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  for (let model of getModels()) {
    configureModel(io, model);
  }

  http.listen(PORT, function(){
    console.log(`API listening to port ${PORT}`);
  });
});
