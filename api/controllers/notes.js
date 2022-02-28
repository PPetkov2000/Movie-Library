const Note = require("../models/Note");

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404);
      throw new Error("Note not Found");
    }
  } catch (error) {
    next(error);
  }
};

const addNote = async (req, res, next) => {
  const note = req.body.note;
  try {
    if (!note || typeof note !== "object" || Array.isArray(note)) {
      res.status(400);
      throw new Error("Please provide a valid note");
    }
    const createdNote = await Note.create({ ...note, user: req.user._id });
    res.status(201).json({ note: createdNote });
  } catch (error) {
    next(error);
  }
};

const removeNote = async (req, res, next) => {
  const noteId = req.params.id;
  try {
    if (!noteId) {
      res.status(400);
      throw new Error("Please provide note id");
    }
    const note = await Note.findById(noteId);
    if (note) {
      await note.remove();
      res.json({ message: "Note removed" });
    } else {
      res.status(404);
      throw new Error("Note not Found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotes, getNote, addNote, removeNote };
