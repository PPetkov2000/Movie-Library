const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    movies: { type: Array, default: [] },
    user: {
      type: "ObjectId",
      ref: "User",
      required: [true, "Please provide an user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
