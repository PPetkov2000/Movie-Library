const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const { getFavorites, addToFavorites, removeFromFavorites } = require("../controllers/favorites");

router.route("/").get(isAuth, getFavorites).post(isAuth, addToFavorites);
router.route("/:id").delete(isAuth, removeFromFavorites);

module.exports = router;
