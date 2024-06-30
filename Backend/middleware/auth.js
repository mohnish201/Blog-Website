const jwt = require("jsonwebtoken");
const { BListModel } = require("../model/blackList");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Login First!");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token not found!");
  }

  jwt.verify(token, "masai", (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).send("UnAuthorized");
    }

    if (decoded) {
      req.body.userId = decoded.userId;
      req.body.user = decoded.user;
      next();
    } else {
      res.status(401).send("UnAuthorized");
    }
  });
};

module.exports = {
  auth,
};
