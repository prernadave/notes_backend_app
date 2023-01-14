const mongoose = require("mongoose");


const notes = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  userID: {

    type: String,
    required: true,

  }


})

const Notes = mongoose.model("mynotes", notes)

module.exports = {
  Notes
}