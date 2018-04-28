const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
  name: {
    type: String,
    required:[true,"name required"],
    maxlength: [20, "tooLong"],
    minlength: [4, "tooShort"],
    match:[/[A-Za-z0-9]+$/,"nameIncorrect"],
    unique: true,
  },
  title: {
    type: String,
    required:[true,"title required"],
    maxlength:[20, "tooLong"],
    minlength: [6, "tooShort"],
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
}, {
  usePushEach: true
});

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;
