const mongoose = require('mongoose');
const User = mongoose.model('User');
const Group = mongoose.model('Group');
const Admin = mongoose.model('Admin');

const createUser = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  user.save((err, user) => {
    if (err) {
      return next(err);
    }
    getAllUsers(res, next);
  });
}

const getAllUsers = (res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.send(users);
  });
}

const getUserByUsername = (req, res, next) => {
  User.find({ username: req.params.username}, (err, user) => {
    if (err) {
      next(err);
    }
    if(!user) {
      res.status(404).send('Not found');
    }
    Group.find({}, (err, groups) => {
      if (err) {
        return next(err);
      }
      res.send({ user, groups });
    });
  });
}

const updateUserById = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {$set: {
    username: req.body.username,
    firstName: req.body. firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    
  }}, {new: true}, (err, user) => {
    if (err) {
      next(err);
    }
    if (!user) {
      res.status(404).send('Not found');
    }
    res.send(user);
  });
}

const deleteUserById = (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      next(err);
    }
    if (!user) {
      res.status(404).send('Not found');
    }
    getAllUsers(res, next);
  });
}

const addGroupToUser = (req, res, next) => {
  Group.update({ _id: req.body.groupId }, { $push: { users: req.params.id }}, (err) => {
    if (err) {
      return next(err);
    }
    User.update({ _id: req.params.id }, { $push: { groups: req.body.groupId }}, (err) => {
      if (err) {
        return next(err);
      }
      User.findById(req.params.id, (err, user) => {
        if (err) {
          next(err);
        }
        res.send(user);
      });
    });
  });
}

const removeGroupFromUser = (req, res, next) => {
  Group.update({ _id: req.body.groupId}, { $pull: { users: req.params.id }}, (err) => {
    if (err) {
      return next(err);
    }
    User.update({ _id: req.params.id}, { $pull: { groups: req.body.groupId}}, (err) => {
      if (err) {
        return  next(err);
      }
      User.findById(req.params.id, (err, user) => {
        if (err) {
          next(err);
        }
        res.send(user);
      });
    });
  });
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUserByUsername: getUserByUsername,
  updateUserById: updateUserById,
  deleteUserById: deleteUserById,
  addGroupToUser: addGroupToUser,
  removeGroupFromUser: removeGroupFromUser
}
