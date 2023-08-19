const express = require("express");
const { UserModel } = require("../model/userModel");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PassCheck } = require("../middleware/validate");
const cookieParser = require("cookie-parser")
const UserRouter = express.Router();

UserRouter.use(cookieParser());

UserRouter.post("/register", PassCheck, async (req, res) => {
  const { pass, email } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    res.json("Already have Account");
  } else {
    try {
      bcrpyt.hash(pass, 5, async (err, hash) => {
        if (err) {
          res.send(err);
        } else {
          const NewUser = new UserModel({ ...req.body, pass: hash });
          await NewUser.save();
          res.send({ msg: "New User has been Registered", NewUser });
        }
      });
    } catch (error) {
      res.send(error);
    }
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrpyt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, user: user.username },
            "masai"
          );
          res.send({ msg: "Login Successfull", token });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials" });
    }
  } catch (error) {
    res.send(error);
  }
});

UserRouter.get("/logout", (req, res)=>{
  res.clearCookie("token")
  // res.cookie("token", "", { path: '/' });
  // res.redirect("/login");
 res.send("logout Successfully")

})

module.exports = {
  UserRouter,
};
