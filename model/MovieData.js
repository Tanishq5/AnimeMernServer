const mongoose = require("mongoose");

var conn = require("../db/conn");
const MovieDataSchema = mongoose.Schema({
  Name: {
    type: String,
  },
  Img: {
    type: String,
  },
  Trailer: {
    type: String,
  },
  Wood: {
    type: String,
  },
  TimeStamp: {
    type: String,
  },
});

module.exports = mongoose.model("MovieData", MovieDataSchema);
