import axios from "axios";

const baseUrl = "https://api.tvmaze.com";

const getMovies = async (keyword = "") => {
  let movies;
  if (keyword) {
    movies = await axios.get(`${baseUrl}/search/shows?q=${keyword}`);
  } else {
    movies = await axios.get(`${baseUrl}/shows`);
  }
  return movies || [];
};

const getMovieById = async (id) => {
  const movie = await axios.get(`${baseUrl}/shows/${id}`);
  return movie || null;
};

export { getMovies, getMovieById };
