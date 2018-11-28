/* CONSTANTS */
const PORT = '3001';
/* INIT */
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const { ModelSocket, attachSocketClass } = require(__dirname + '/utils/ModelSocket');
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

/* HELPERS */
const getModels = () => {
  const path = __dirname + '/models';
  const files = fs.readdirSync(path);
  const models = files.map(file => require(`${path}/${file}`));
  return models.filter(m => Object.keys(m).length);
};

const getSocketClasses = () => {
  const path = __dirname + '/sockets';
  const files = fs.readdirSync(path);
  const socketClasses = files.map(file => require(`${path}/${file}`));
  return socketClasses;
};

const attachSocketClasses = () => {
  const models = getModels();
  const modelMap = models.reduce((accum, model) => {
    const { modelName } = model;
    accum[modelName.toLowerCase()] = model;
    return accum;
  }, {});
  const socketClasses = getSocketClasses();

  for (const SocketClass of socketClasses) {
    const socketClassName = SocketClass.name
      .replace(/Socket$/, '')
      .toLowerCase();

    const model = modelMap[socketClassName];
    if (model) {
      attachSocketClass(io, model, new SocketClass(model));
      modelMap[socketClassName] = undefined;
    }
  }

  for (const model of Object.values(modelMap)) {
    if (model) {
      attachSocketClass(io, model, new ModelSocket(model));
    }
  }
};

/* CONNECT */
const options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  reconnectTries: 30,
  reconnectInterval: 5000
};

mongoose.connect(process.env.MLAB_URL, options);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  attachSocketClasses();

  http.listen(PORT, function(){
    console.log(`API listening to port ${PORT}`);
  });
});
