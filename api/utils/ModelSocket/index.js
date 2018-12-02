const ModelSocket = require(__dirname + '/ModelSocket.js');

const attachSocketClass = (io, model, SocketClass) => {
  const { modelName } = model;
  const nsp = io.of('/api/' + modelName.toLowerCase());

  let actions = Object.getOwnPropertyNames(SocketClass.__proto__);
  let defaultActions = Object.getOwnPropertyNames(ModelSocket.prototype);
  actions = [...new Set(actions.concat(defaultActions))];

  actions = actions.filter((action) => {
    if (action === 'constructor') {
      return false;
    }
    if (action.startsWith('_')) {
      return false;
    }
    return true;
  });

  nsp.on('connection', (socket) => {
    for (const action of actions) {
      socket.on(action, (data) => {
        SocketClass[action](data)
          .then((result) => {
            nsp.emit(action, result);
          })
          .catch((error) => {
            const errorStr = error.toString();
            const result = {
              error: errorStr
            };
            error.stack && Object.assign(result, { trace: error.stack });
            nsp.emit(action, result);
          });
      });
    }
  });
};

module.exports = {
  ModelSocket,
  attachSocketClass
};
