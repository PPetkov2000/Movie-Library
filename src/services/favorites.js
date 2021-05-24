import api from "../utils/api-instance";

const getFavorites = async () => {
  const favorites = await api.get("/favorites");
  return favorites;
};

const getFavorite = async (id) => {
  const favorite = await api.get(`/favorites/${id}`);
  return favorite;
};

const addToFavorites = async (movie) => {
  const favorite = await api.post("/favorites", { movie });
  return favorite;
};

const removeFromFavorites = async (id) => {
  const favorite = await api.delete(`/favorites/${id}`);
  return favorite;
};

export { getFavorites, getFavorite, addToFavorites, removeFromFavorites };
