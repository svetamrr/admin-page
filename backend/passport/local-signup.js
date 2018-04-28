const Admin = require('mongoose').model('Admin');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const adminData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim()
  };

  const newAdmin = new Admin(adminData);
  newAdmin.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});
