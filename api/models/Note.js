const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    notes: [{ type: String, required: [true, "Note is required"] }],
    movie: { type: Object, required: [true, "Movie object is required"] },
    user: {
      type: "ObjectId",
      ref: "User",
      required: [true, "Please provide an user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
