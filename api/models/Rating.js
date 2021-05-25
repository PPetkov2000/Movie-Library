const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: [true, "Rating is required"] },
    movieId: { type: Number, required: [true, "Movie id is required"] },
    user: {
      type: "ObjectId",
      ref: "User",
      required: [true, "Please provide an user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
