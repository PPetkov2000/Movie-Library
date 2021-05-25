const Rating = require("../models/Rating");

const getRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find({});
    res.json(ratings);
  } catch (error) {
    next(error);
  }
};

const getRating = async (req, res, next) => {
  try {
    const rating = await Rating.findOne({
      movieId: req.params.movieId,
      user: req.user._id,
    });
    res.json(rating);
  } catch (error) {
    next(error);
  }
};

const addRating = async (req, res, next) => {
  const rating = req.body.rating;
  try {
    if (!rating || typeof rating !== "object" || Array.isArray(rating)) {
      res.status(400);
      throw new Error("Please provide a valid rating");
    }
    const createdRating = await Rating.create({
      ...rating,
      user: req.user._id,
    });
    res.status(201).json({ rating: createdRating });
  } catch (error) {
    next(error);
  }
};

const updateRating = async (req, res, next) => {
  const movieId = req.params.movieId;
  try {
    if (!movieId) {
      res.status(400);
      throw new Error("Please provide movie id");
    }
    const rating = await Rating.findOne({ movieId, user: req.user._id });
    if (rating) {
      rating.rating = req.body.rating;
      const updatedRating = await rating.save();
      res.json(updatedRating);
    } else {
      res.status(404);
      throw new Error("Rating not Found");
    }
  } catch (error) {
    next(error);
  }
};

const removeRating = async (req, res, next) => {
  const movieId = req.params.movieId;
  try {
    if (!movieId) {
      res.status(400);
      throw new Error("Please provide movie id");
    }
    const rating = await Rating.findOne({ movieId, user: req.user._id });
    if (rating) {
      await rating.remove();
      res.json({ message: "Rating removed" });
    } else {
      res.status(404);
      throw new Error("Rating not Found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRatings,
  getRating,
  addRating,
  updateRating,
  removeRating,
};
