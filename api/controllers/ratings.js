const Rating = require("../models/Rating");

const getRating = async (req, res, next) => {
  try {
    const ratings = await Rating.find({});
    res.json(ratings);
  } catch (error) {
    next(error);
  }
};

const addRating = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const removeRating = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { getRating, addRating, removeRating };
