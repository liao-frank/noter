const configureModel = (io, model) => {
  const { modelName } = model;
  const nsp = io.of('/' + modelName);

  nsp.on('model', (data) => {
    const { action } = data;
    action(nsp, model);
  });
};

module.exports = configureModel;
