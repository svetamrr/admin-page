const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = mongoose.model('User');
const UserService = require('./../service/UserService');

router.post('/', function (req, res, next) {
  UserService.createUser(req, res, next);
});

router.get('/', function (req, res, next) {
  UserService.getAllUsers(res, next);
});

router.get('/:username', function (req, res, next) {
  UserService.getUserByUsername(req, res, next);
});

router.put('/:id', function (req, res, next) {
  UserService.updateUserById(req, res, next);
});

router.delete('/:id', function (req, res, next) {
  UserService.deleteUserById(req, res, next);
});

router.post('/:id/addGroup', function (req, res, next) {
  UserService.addGroupToUser(req, res, next);
});

router.post('/:id/removeGroup', function (req, res, next) {
  UserService.removeGroupFromUser(req, res, next);
});

module.exports = router;
