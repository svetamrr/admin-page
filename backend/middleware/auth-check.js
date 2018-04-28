const jwt = require('jsonwebtoken');
const Admin = require('mongoose').model('Admin');
const config = require('./../config/config');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) { return res.status(401).end(); }

    const adminId = decoded.sub;

    return Admin.findById(adminId, (adminErr, admin) => {
      if (adminErr || !admin) {
        return res.status(401).end();
      }

      return next();
    });
  });
}
