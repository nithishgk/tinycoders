const mongoose = require('mongoose')
const scoreSchema = new mongoose.Schema({
    category: {
      type:String,
      required:true,
    },
    level: {
      type: String,
      required: true,
    },
    pass: {
      type: Number,
      required:true,
    },
  });

module.exports = mongoose.model("Scores", scoreSchema);