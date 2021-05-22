import axios from "axios";
import addInterceptors from "../utils/interceptors";

const api = axios.create({
  baseUrl: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

addInterceptors(api);

const getUsers = async () => {
  const users = await api.get("/users");
  return users;
};

const getUser = async (id) => {
  const user = await api.get(`/users/${id}`);
  return user;
};

const updateUser = async (id, data) => {
  const user = await api.put(`/users/${id}`, data);
  return user;
};

const deleteUser = async (id) => {
  const user = await api.delete(`/users/${id}`);
  return user;
};

export { getUsers, getUser, updateUser, deleteUser };
