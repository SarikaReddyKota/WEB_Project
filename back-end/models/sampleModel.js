const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;