const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.userId = decoded.userId;
        req.body.user = decoded.user;
        next();
      }
      else{
        res.send("UnAuthorized")
      }
    });
  } else {
    res.send("Login First!");
  }
};

module.exports = {
  auth,
};
