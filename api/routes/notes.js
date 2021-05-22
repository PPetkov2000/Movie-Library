const express = require("express");
const router = express.Router();
const { getNotes, addNote, removeNote } = require("../controllers/notes");

router.route("/").get(getNotes).post(addNote).delete(removeNote);

module.exports = router;
