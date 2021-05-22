const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
} = require("../controllers/users");

router.route("/").get(getUsers).post(createUser);
router
  .route("/:id")
  .get(getUser)
  .put(isAuth, updateUser)
  .delete(isAuth, deleteUser);
router.route("/login").post(authUser);

module.exports = router;
