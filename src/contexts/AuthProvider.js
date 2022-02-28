import React, { useState, useEffect, useContext } from "react";
import { getUser } from "../services/users";
import Loader from "../components/Loader";
import api from "../utils/api-instance";
import errorHandler from "../utils/errorHandler";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem("authUser"));
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(userFromLocalStorage || null);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (authUser || !userFromLocalStorage) {
      setLoading(false);
      return;
    }
    const sendRequest = async (userId) => {
      try {
        const currentUser = await getUser(userId);
        successAction(currentUser);
      } catch (error) {
        failureAction(error);
      }
    };
    sendRequest(userFromLocalStorage?._id);
  }, [userFromLocalStorage, authUser]);

  const register = async (user) => {
    const response = await api.post("/users", user);
    if (response) {
      successAction(response.data);
      localStorage.setItem("authUser", JSON.stringify(response.data));
    }
    return response;
  };

  const login = async (user) => {
    const response = await api.post("/users/login", user);
    if (response) {
      successAction(response.data);
      localStorage.setItem("authUser", JSON.stringify(response.data));
    }
    return response;
  };

  const logout = () => {
    setLoading(false);
    setAuthUser(null);
    setError(null);
    setLoggedIn(false);
    localStorage.removeItem("authUser");
    window.location = "/login";
  };

  const updateAuthUser = async (user) => {
    if (!authUser) return;
    const updatedUser = {
      _id: user._id,
      username: user.username,
      favoriteMovies: user.favoriteMovies,
      token: authUser.token,
    };
    setAuthUser(updatedUser);
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
  };

  const successAction = (data) => {
    setLoading(false);
    setAuthUser(data);
    setError(null);
    setLoggedIn(true);
  };

  const failureAction = (error) => {
    setLoading(false);
    setAuthUser(null);
    setError(errorHandler(error));
    setLoggedIn(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <AuthContext.Provider
      value={{
        loading,
        authUser,
        error,
        loggedIn,
        register,
        login,
        logout,
        updateAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
