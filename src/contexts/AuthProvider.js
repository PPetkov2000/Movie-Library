import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getUser } from "../services/users";
import Loader from "../components/Loader";

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
        setLoading(false);
        setAuthUser(currentUser);
        setError(null);
        setLoggedIn(true);
      } catch (error) {
        setLoading(false);
        setAuthUser(null);
        setError(error.message);
        setLoggedIn(false);
      }
    };
    sendRequest(userFromLocalStorage?._id);
  }, [userFromLocalStorage, authUser]);

  const register = async (user) => {
    const { data } = await axios.post("/register", user);
    setLoading(false);
    setAuthUser(data);
    setLoggedIn(true);
    localStorage.setItem("authUser", JSON.stringify(data));
  };

  const login = async (user) => {
    const { data } = await axios.post("/login", user);
    setLoading(false);
    setAuthUser(data);
    setLoggedIn(true);
    localStorage.setItem("authUser", JSON.stringify(data));
  };

  const logout = () => {
    setLoading(false);
    setAuthUser(null);
    setLoggedIn(false);
    localStorage.removeItem("authUser");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
