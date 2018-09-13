const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var quoteSchema = new Schema({
  likes: [],
  status: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
