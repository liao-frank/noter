class ModelSocket {
  constructor(model) {
    this.model = model;
  }

  find(data) {
    let { id, _id, query } = data;
    query = query || {};
    if (id || _id) {
      query._id = id || _id;
    }

    return new Promise((resolve, reject) => {
      this.model.find(query)
        .then((docs) => {
          resolve({ docs });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  findOne(data) {
    let { id, _id, query } = data;
    query = query || {};
    if (id || _id) {
      query._id = id || _id;
    }

    return new Promise((resolve, reject) => {
      this.model.findOne(query)
        .then((doc) => {
          resolve({ doc });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  create(data) {
    const docs = this._getDocs(data);

    return new Promise((resolve, reject) => {
      this.model.create(docs)
        .then((docs) => {
          if (docs.length === 1) {
            resolve({ doc: docs[0] });
          }
          else {
            resolve({ docs });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  update(data) {
    let { options } = data;
    options = options || {};
    options.multi = true;
    data.options = options;
    return this.updateOne(data);
  }

  updateOne(data) {
    const { query, doc, options } = data;

    return new Promise((resolve, reject) => {
      if (!query || !doc) {
        const missing = [query ? '' : 'query', doc ? '' : 'doc'];
        resolve({ err: 'Missing ' + missing.join(' and ') });
      }
      else {
        this.model.update(query, doc, options)
          .then((raw) => {
            resolve({ raw });
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  delete(data) {
    const { query, options } = data;

    return new Promise((resolve, reject) => {
      this.model.deleteMany(query, options)
        .then(() => {
          resolve({ success: true });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteOne(data) {
    const { query } = data;

    return new Promise((resolve, reject) => {
      this.model.deleteOne(query)
        .then(() => {
          resolve({ success: true });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  _getDocs(data) {
    let { doc, docs } = data;
    doc = doc || [];
    docs = docs || [];
    Array.isArray(docs) || (docs = [docs]);
    Array.isArray(doc) || (doc = [doc]);
    docs = docs.concat(doc);
    return docs.filter(doc => doc);
  }
}

module.exports = ModelSocket;
