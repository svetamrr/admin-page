const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const GroupService = require('./../service/GroupService');

router.post('/', function (req, res, next) {
  GroupService.createGroup(req, res, next);
});

router.get('/', function (req, res, next) {
  GroupService.getAllGroups(res, next);
});

router.get('/:name', function (req, res, next) {
  GroupService.getGroupByName(req, res, next);
});

router.put('/:id', function (req, res, next) {
  GroupService.updateGroupById(req, res, next);
});

router.delete('/:id', function (req, res, next) {
  GroupService.deleteGroupById(req, res, next);
});

router.post('/:id/addUser', function (req, res, next) {
  GroupService.addUserToGroup(req, res, next);
});

router.post('/:id/removeUser', function (req, res, next) {
  GroupService.removeUserFromGroup(req, res, next);
});

module.exports = router;
