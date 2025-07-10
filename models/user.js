const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mini1");

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

module.exports = mongoose.model("user", userSchema);
