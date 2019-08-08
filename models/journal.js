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

JournalSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    entry: this.entry,
    createdAt: this.createdAt
  };
};

//create model for todo
const Journal = mongoose.model("journal", JournalSchema);

module.exports = Journal;
