const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    rating: { type: Array, required: [true, "Rating is required"] },
    movie: { type: Object, required: [true, "Movie object is required"] },
    user: {
      type: "ObjectId",
      ref: "User",
      required: [true, "Please provide an user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
