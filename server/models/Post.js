const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    index: true
  },

  content: {
    type: String,
    required: true
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  advisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Advisor",
    default: null
  },

  views: {
    type: Number,
    default: 0
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);