const { ModelSocket } = require(__dirname + '/../utils/ModelSocket');
const User = require(__dirname + '/../models/User.js');
const Folder = require(__dirname + '/../models/Folder.js');

class FolderSocket extends ModelSocket {
  constructor(model) {
    super(model);
  }

  create(data) {
    let docs = this._getDocs(data);
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
        const promise = Promise.resolve();
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

              promise.then(() => { this.updateOne(data) }); // don't return intermediate promises
            }
          }
        }

        return promise.then(() => { return result });
      });
  }

  breadcrumbs(data) {
    const { user, folder } = data;
    let currFolderDoc;

    const stack = [];
    let topLevelFolders = [];

    if (!user || !folder) {
      return Promise.reject(new Error('Please specify both user and folder ids.'));
    }

    let traverse;
    const promise = User.findOne({ _id: data.user })
      .then((result) => {
        topLevelFolders = [ result.myNotes, result.sharedNotes, result.trash ];
        const query = { _id: folder };
        return this.findOne(query);
      })
      .then((result) => {
        const { doc } = result;
        currFolderDoc = doc;
        stack.push({ breadcrumbs: [doc], folder: doc });
        return traverse();
      })
      .then((breadcrumbs) => {
        return { breadcrumbs };
      });

    traverse = () => {
      if (!stack.length) {
        return [ currFolderDoc ];
      }
      const toProcess = stack.pop();
      const { breadcrumbs, folder } = toProcess;

      if (topLevelFolders.find(id => id.equals(folder._id))) {
        return breadcrumbs.reverse();
      }
      else {
        const query = { folders: folder._id };
        return this.find({ query })
          .then((result) => {
            for (const doc of result.docs) {
              stack.push({ breadcrumbs: [...breadcrumbs, doc], folder: doc });
            }
            return traverse();
          });
      }
    };

    return promise;
  }

  deleteOne(data) {
    const { query } = data;

    const pullParentPromise = Folder.findOneAndUpdate(
      { folders: query._id },
      { $pull: { folders: query._id } }
    );

    const getOwnerPromise = this
      .findOne({ _id: query._id })
      .then((result) => {
        const { doc } = result;
        return User.findOne({ _id: doc.owner });
      });

    return Promise
      .all([pullParentPromise, getOwnerPromise])
      .then((result) => {
        const [ parent, owner ] = result;
        console.log(typeof parent, typeof owner);
        if (parent && owner) {
          console.log('parent && owner');
          if (parent._id.equals(owner.trash)) {
            console.log(query);
            return super.deleteOne(query);
          }
          else {
            console.log('Adding to trash');
            return Folder
              .findOneAndUpdate(
                { _id: owner.trash },
                { $push: { folders: query._id } }
              )
              .then((result) => {
                console.log(result);
                return result;
              })
              .catch((yes) => {
                console.log(yes);
              });
          }
        }
      });
  }
}

module.exports = FolderSocket;
