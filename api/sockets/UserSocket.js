const md5 = require('md5');
const { ModelSocket } = require(__dirname + '/../utils/mongooseSocket');
const Folder = require(__dirname + '/../models/Folder.js');

class UserSocket extends ModelSocket {
  constructor(model) {
    super(model);
  }

  create(data) {
    let docs = this._getDocs(data);

    docs = docs.map((doc) => {
      const { password, passwordConfirmation } = doc;
      const validPassword = password && passwordConfirmation && password === passwordConfirmation;
      if (validPassword) {
        const passwordHash = md5(password);
        Object.assign(doc, { passwordHash });
        return doc;
      }
    });

    return super.create({ docs })
      .then((result) => {
        const docs = this._getDocs(result);
        let promise;
        for (const user of docs) {
          if (promise) {
            promise.then(() => {
              this._createInitialFolders(user);
            });
          }
          else {
            promise = this._createInitialFolders(user);
          }
        }
        return promise.then(() => { return data });
      });
  }

  _createInitialFolders(user) {
    const { _id: userId } = user;
    const folder = {
      name: userId,
      owner: userId,
      members: [userId],
      created: new Date(), createdBy: userId,
      modified: new Date(), modifiedBy: userId
    };
    const arr = [folder, folder];
    const promise = Folder.create(arr)
      .then((folders) => {
        this.updateOne({
          query: { _id: userId },
          doc: {
            myNotes: folders[0]._id,
            sharedNotes: folders[1]._id
          }
        });
      });

    return promise;
  }
}

module.exports = UserSocket;