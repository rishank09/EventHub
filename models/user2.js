const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: String,
  password: String,
  profilepic: {
    type: String,
    default: "default.png"

  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

module.exports = mongoose.model("user2", userSchema2);
