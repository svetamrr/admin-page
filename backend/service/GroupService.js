const mongoose = require('mongoose');
const Group = mongoose.model('Group');
const User = mongoose.model('User');

const createGroup = (req, res, next) => {
  const group = new Group({
    name: req.body.name,
    title: req.body.title
  });
  group.save((err, group) => {
    if (err) {
      return next(err);
    }
    getAllGroups(res, next);
  });
}

const getAllGroups = (res, next) => {
  Group.find({}, (err, groups) => {
    if (err) return next(err);
    res.send(groups);
  });
}

const getGroupByName = (req, res, next) => {
  Group.find({name: req.params.name}, (err, group) => {
    if (err) {
      next(err);
    }
    if(!group) {
      res.status(404).send('Not found');
    }
    User.find({}, (err, users) => {
      if (err) return next(err);
      res.send({ group, users });
    });
  })
}

const updateGroupById = (req, res, next) => {
  Group.findByIdAndUpdate(req.params.id, {$set: {
    name: req.body.name,
    title: req.body.title
  }}, {new: true}, (err, group) => {
    if (err) {
      next(err);
    }
    if(!group) {
      res.status(404).send('Not found');
    }
    res.send(group);
  });
}

const deleteGroupById = (req, res, next) => {
  Group.findByIdAndRemove(req.params.id, (err, group) => {
    if (err) {
      next(err);
    }
    if(!group) {
      res.status(404).send('Not found');
    }
    getAllGroups(res, next);
  });
}

const addUserToGroup = (req, res, next) => {
  User.update({ _id: req.body.userId }, { $push: { groups: req.params.id}}, (err) => {
    if (err) {
      return next(err);
    }
    Group.update({ _id: req.params.id}, { $push: { users: req.body.userId}}, (err) => {
      if (err) {
        return next(err);
      }
      Group.findById(req.params.id, (err, group) => {
        if (err) {
          next(err);
        }
        res.send(group);
      });
    });
  });
}

const removeUserFromGroup = (req, res, next) => {
  User.update({ _id: req.body.userId}, { $pull: { groups: req.params.id}}, (err) => {
    if (err) {
      return next(err);
    }
    Group.update({ _id: req.params.id}, { $pull: { users: req.body.userId}}, (err) => {
      if (err) {
        return next(err);
      }
      Group.findById(req.params.id, (err, group) => {
        if (err) {
          next(err);
        }
        res.send(group);
      });
    });
  });
}

module.exports = {
  createGroup: createGroup,
  getAllGroups: getAllGroups,
  getGroupByName: getGroupByName,
  updateGroupById: updateGroupById,
  deleteGroupById: deleteGroupById,
  addUserToGroup: addUserToGroup,
  removeUserFromGroup: removeUserFromGroup
}
