const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const { getNotes, getNote, addNote, removeNote } = require("../controllers/notes");

router.route("/").get(isAuth, getNotes).post(isAuth, addNote);
router.route("/:id").get(isAuth, getNote).delete(isAuth, removeNote);

module.exports = router;
