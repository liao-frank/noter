const { ModelSocket } = require(__dirname + '/../utils/ModelSocket');
const User = require(__dirname + '/../models/User.js');
const Folder = require(__dirname + '/../models/Folder.js');

class NoteSocket extends ModelSocket {
  // collaborate(data, socket) {
  //   let content;
  //
  //   socket.on('onChange', (data) => {
  //     content = data.content;
  //     socket.broadcast.emit('onChange', data);
  //   });
  //
  //   socket.on('receiveChange', (data) => {
  //     content = data.content;
  //   });
  //
  //   socket.on('disconnect', () => {
  //     console.log(content);
  //   });
  //
  //   return Promise.resolve(true);
  // }

  create(data) {
    let docs = this._getDocs(data);
    docs = docs.map((doc) => {
      const { owner } = doc;

      return {
        members: [owner],
        created: new Date(), createdBy: owner,
        modified: new Date(), modifiedBy: owner,
        ...doc,
      };
    });

    return super.create({ docs })
      .then((result) => {
        const notes = this._getDocs(result);

        if (docs.length === notes.length) {
          const promises = notes.map((note, index) => {
            const { parent } = docs[index];

            if (parent) {
              const { _id: childId } = note;

              return Folder.update(
                { _id: parent },
                { $push: { notes: childId } }
              );
            }
          });
          return Promise.all(promises).then(() => { return result });
        }
      });
  }

  updateOne_(data, socket) {
    return super
      .updateOne(data)
      .then((result) => {
        socket.broadcast.emit('updateOne_', result);
        return result.raw;
      });
  }

  editOne_(data, socket) {
    return super
      .updateOne(data)
      .then((result) => {
        socket.broadcast.emit('editOne_', result);
        return result.raw;
      });
  }

  deleteOne(data) {
    const { query } = data;

    const pullParentPromise = Folder.findOneAndUpdate(
      { _id: query.parent, notes: query._id },
      { $pull: { notes: query._id } }
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

        if (parent && owner) {
          if (parent._id.equals(owner.trash)) {
            return super.deleteOne(query);
          }
          else {
            return Folder.findOneAndUpdate(
              { _id: owner.trash },
              { $push: { notes: query._id } }
            );
          }
        }
      });
  }

}

module.exports = NoteSocket;
