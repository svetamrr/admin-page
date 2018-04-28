const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required:[true,"username is required"],
    maxlength:[20,"tooLong"],
    minlength:[4,"tooShort"],
    match:[/[A-Za-z0-9]+$/,"usernameIncorrect"],
    unique: true,
  },
  firstName: {
    type: String,
    required:[true,"firstName is required"],
    maxlength:[20,"tooLong"],
    minlength:[2,"tooShort"],
    match: [/[A-Za-z]/],
  },
  lastName: {
    type: String,
    required:[true,"lastName is required"],
    maxlength:[20,"tooLong"],
    minlength:[2,"tooShort"],
    match: [/[A-Za-z]/],
  },
  email: {
    type: String,
    required:[true,"email address is required"],
    maxlength:[30,"tooLong"],
    minlength:[3,"tooShort"],
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "email is not valid"],
    unique: true
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  }]
}, {
  usePushEach: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
