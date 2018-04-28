const express = require('express');
const router = express.Router();
const AuthService = require('./../service/AuthService');

router.post('/signup', function(req, res, next) {
  AuthService.signup(req, res, next);
});

router.post('/login', function(req, res, next) {
  AuthService.login(req, res, next);
});

router.get('/logout', function(req, res, next) {
  AuthService.logout(req, res, next);
});

module.exports = router;
