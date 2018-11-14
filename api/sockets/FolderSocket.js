const { ModelSocket } = require(__dirname + '/../utils/ModelSocket');

class FolderSocket extends ModelSocket {
  constructor(model) {
    super(model);
  }

  create(data) {
    let docs = this._getDocs(data);
    console.log(docs);
    docs = docs.map((doc) => {
      const { owner } = doc;

      return Object.assign({
        members: [owner],
        created: new Date(), createdBy: owner,
        modified: new Date(), modifiedBy: owner,
      }, doc);
    });

    return super.create({ docs })
      .then((result) => {
        let promise;
        const folders = this._getDocs(result);

        if (docs.length === folders.length) {
          for (let i = 0; i < docs.length; i++) {
            const { parent } = docs[i];
            if (parent) {
              const { _id: childId } = folders[i];
              const data = {
                query: { _id: parent },
                doc: { $push: { folders: childId } }
              };

              if (promise) {
                promise.then(() => { this.updateOne(data) });
              }
              else {
                promise = this.updateOne(data);
              }
            }
          }
        }

        return promise.then(() => { return result });
      });
  }

  // addNote(data) {
  //   const { parent, doc } = data;
  //
  // }
}

module.exports = FolderSocket;
