const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const { getRatings, getRating, addRating, updateRating, removeRating } = require("../controllers/ratings");

router.route("/").get(isAuth, getRatings).post(isAuth, addRating);
router.route("/:movieId").get(isAuth, getRating).put(isAuth, updateRating).delete(isAuth, removeRating);

module.exports = router;
