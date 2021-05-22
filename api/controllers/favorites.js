const Favorite = require("../models/Favorite");
const User = require("../models/User");

const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({});
    res.json(favorites);
  } catch (error) {
    next(error);
  }
};

const addToFavorites = async (req, res, next) => {
  const movie = req.body.movie;
  try {
    if (!movie || typeof movie !== "object" || Array.isArray(movie)) {
      res.status(400);
      throw new Error("Please provide a valid movie");
    }
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      const movieInFavorites = user.favoriteMovies.find(
        (x) => x.id === movie.id
      );
      if (movieInFavorites) {
        res.status(400);
        throw new Error("Movie is already in favourites");
      }
      user.favoriteMovies.push(movie);
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const removeFromFavorites = async (req, res, next) => {
  const movieId = req.params.id;
  try {
    if (!movieId) {
      res.status(400);
      throw new Error("Please provide movie id");
    }
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      const movie = user.favoriteMovies.find(
        (x) => Number(x.id) === Number(movieId)
      );
      if (!movie) {
        res.status(400);
        throw new Error("Movie not Found");
      }
      user.favoriteMovies = user.favoriteMovies.filter(
        (x) => Number(x.id) !== Number(movieId)
      );
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getFavorites, addToFavorites, removeFromFavorites };
