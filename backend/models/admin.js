const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = mongoose.Schema({
  email: {
    type: String,
    required:[true,"email address is required"],
    maxlength:[30,"tooLong"],
    minlength:[3,"tooShort"],
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "email is not valid"],
    unique: true,
  },
  password: String,
  name: String,
});

AdminSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

AdminSchema.pre('save', function saveHook(next) {
  const user = this;

  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      user.password = hash;

      return next();
    });
  });
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
