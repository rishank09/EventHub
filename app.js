const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const postModel = require("./models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error } = require("console");
const multerconfig = require("./config/multerconfig")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.set("view engine", "ejs");    

app.get("/", (req,res)=>{
  res.render("overview")
})

app.post("/profilepic", isLoggedIn, multerconfig.single("profileImage"), async (req, res) => {
  const imagePath = "/images/uploads/" + req.file.filename;
  await userModel.findByIdAndUpdate(req.user.userid, { image: imagePath });
  res.redirect("/profile");
});


app.get("/index", function (req, res) {
  res.render("index");
});
app.get("/indexuser", function (req, res) {
  res.render("indexuser");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.post("/registeruser", function (req, res) {
  res.render("userprofile");
});


app.post("/register", async function (req, res) {
  let { username, name, age, password } = req.body;
  let user = await userModel.findOne({ username });
  if (user) return res.status(500).send("User already registered");

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let user = await userModel.create({
        username,
        name,
        age,
        password: hash,
      });
      let token = jwt.sign({ username: username, userid: user._id }, "shhh");
      res.cookie("token", token);
      res.redirect("/profile");
    });
  });
});



app.get("/profile",isLoggedIn, async function(req,res){
  let user = await userModel.findOne({username: req.user.username}).populate("posts");
res.render("profile", {user});
})
app.get("/like/:id",isLoggedIn, async function(req,res){
  let post = await postModel.findOne({_id: req.params.id}).populate("user");

if(post.likes.indexOf(req.user.userid) === -1){
 post.likes.push(req.user.userid)
}
else{
 post.likes.splice( post.likes.indexOf(req.user.userid),1)
}

 
   await post.save()
res.redirect("/profile");
})

app.get("/delete/:id", isLoggedIn, async function(req, res) {
  await postModel.findByIdAndDelete(req.params.id);
  let user = await userModel.findOne({ _id: req.user.userid });
  user.posts = user.posts.filter(p => p.toString() !== req.params.id);
  await user.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async function(req, res) {
  const post = await postModel.findById(req.params.id);
  res.render("editpost", { post });
});
app.post("/edit/:id", isLoggedIn, async function(req, res) {
  const { content } = req.body;
  await postModel.findByIdAndUpdate(req.params.id, { content });
  res.redirect("/profile");
});


app.post("/post",isLoggedIn, async function(req,res){
  let user = await userModel.findOne({username: req.user.username})
  let {eventname,content,imageurl} = req.body;
 let post = await postModel.create({
  user: user._id,
  content,
  eventname,
  imageurl
})
user.posts.push(post._id);
await user.save()
res.redirect("/profile");
})

app.post("/login", async function (req, res) {
  let { username, password } = req.body;
  let user = await userModel.findOne({ username });
  if (!user) return res.status(500).send("Something went wrong");

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ username: username, userid: user._id }, "shhh");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else {
      res.redirect("/login");
    }
  });
});


app.get("/logout", function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
});

app.get("/forget", function (req, res) {
  res.render("forgetpwd", { userFound: false });
});

app.post("/forget", async function (req, res) {
  const { username, age, newPassword } = req.body;

  const user = await userModel.findOne({ username, age });

  if (!user) {
    return res.render("forgetpwd", {
      userFound: false,
      username,
      age,
      error: "Invalid username or date of birth.",
    });
  }

  // If newPassword is present, update and confirm
  if (newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();

    return res.render("forgetpwd", {
      userFound: false,
      success: "Password reset successful! You can now log in.",
    });
  }

  // Show password reset input
  res.render("forgetpwd", {
    userFound: true,
    username,
    age,
  });
});




function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "shhh");
    req.user = data;
     next();
  }
 
}

app.listen(3000);
