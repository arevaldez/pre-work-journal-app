const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const JournalSchema = new Schema({
  title: {
    type: String,
    required: [true, "The journal title field is required."]
  },
  entry: {
    type: String,
    required: [true, "The journal entry field is required."]
  }
});

//create model for todo
const Journal = mongoose.model("journal", JournalSchema);

module.exports = Journal;
