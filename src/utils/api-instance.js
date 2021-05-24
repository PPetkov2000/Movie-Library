import axios from "axios";
import addInterceptors from "./api-interceptors";

const instance = axios.create({
  baseUrl: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

addInterceptors(instance);

export default instance;
