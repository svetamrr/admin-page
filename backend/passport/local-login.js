const jwt = require('jsonwebtoken');
const Admin = require('mongoose').model('Admin');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('./../config/config');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const adminData = {
    email: email.trim(),
    password: password.trim(),
  };

  return Admin.findOne({ email: adminData.email }, (err, admin) => {
    if (err) { return done(err); }

    if (!admin) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(err);
    }

    return admin.comparePassword(adminData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = { sub: admin._id };
      const token = jwt.sign(payload, config.jwtSecret);
      const data = { name: admin.name };

      return done(null, token, data);
    });
  });
});
