const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("ratings", "notes");
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("Passwords do not match");
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400);
      throw new Error("The username is already taken");
    }
    const user = await User.create({ username, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      favoriteMovies: user.favoriteMovies,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("ratings", "notes");
    if (user) {
      user.username = req.body.username || user.username;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
      });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const authUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.passwordsMatch(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        favoriteMovies: user.favoriteMovies,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
};
