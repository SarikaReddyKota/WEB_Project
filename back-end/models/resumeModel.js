const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ResumeSchema = new mongoose.Schema({
  userid: {
    type: Schema.Types.ObjectId, 
    ref: 'user-register',
    unique: true
  },
  technologies: {
    type: Array,
    required: true,
    trim: true,
    lowercase: true
  }
});

const Technologies = mongoose.model("resume-technologies", ResumeSchema);
module.exports = Technologies;