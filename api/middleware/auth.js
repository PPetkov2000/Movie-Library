const User = require("../models/User");
const { verifyToken } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = verifyToken(token);
      const user = await User.findById(decodedToken.userId).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token");
  }
};

module.exports = { isAuth };
