import api from "../utils/api-instance";

const getRatings = async () => {
  const ratings = await api.get("/ratings");
  return ratings;
};

const getRating = async (movieId) => {
  const rating = await api.get(`/ratings/${movieId}`);
  return rating;
};

const addRating = async (data) => {
  const rating = await api.post(`/ratings`, { rating: data });
  return rating;
};

const updateRating = async (movieId, ratingScore) => {
  const rating = await api.put(`/ratings/${movieId}`, { rating: ratingScore });
  return rating;
};

const removeRating = async (movieId) => {
  const rating = await api.delete(`/ratings/${movieId}`);
  return rating;
};

export { getRatings, getRating, addRating, updateRating, removeRating };
