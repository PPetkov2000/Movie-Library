const Note = require("../models/Note");

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

const addNote = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const removeNote = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotes, addNote, removeNote };
