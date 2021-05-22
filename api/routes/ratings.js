const express = require("express");
const router = express.Router();
const {
  getRating,
  addRating,
  removeRating,
} = require("../controllers/ratings");

router.route("/").get(getRating).post(addRating).delete(removeRating);

module.exports = router;
