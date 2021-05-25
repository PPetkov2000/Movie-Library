const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    text: { type: String, required: [true, "Note is required"] },
    movieId: { type: Number, required: [true, "Movie id is required"] },
    user: {
      type: "ObjectId",
      ref: "User",
      required: [true, "Please provide an user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
