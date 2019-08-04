const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const JournalSchema = new Schema({
  action: {
    type: String,
    required: [true, "The todo text field is required"]
  }
});

//create model for todo
const Journal = mongoose.model("todo", JournalSchema);

module.exports = Journal;
