import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { config } from "../utils/config.js";

const URL = config.API_URL;

export const AppContext = createContext();
export const Notecontext = createContext();

const AppState = ({ children }) => {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchkey, setSearchkey] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [notification, setnotification] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/products`);
      const data = res.data.data || res.data;
      setproducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setproducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const logedIn = (emailData) => {
    localStorage.setItem("email", emailData);
  };

  const logedOut = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('Image');
    localStorage.removeItem('username');
    localStorage.removeItem('usernamebeforeedit');
  };

  const value = {
    logedIn,
    logedOut,
    products,
    setproducts,
    getData,
    loading,
    searchkey,
    setSearchkey,
    isSearchMode,
    setIsSearchMode,
    notification,
    setnotification
  };

  return (
    <AppContext.Provider value={value}>
      <Notecontext.Provider value={value}>
        {children}
      </Notecontext.Provider>
    </AppContext.Provider>
  );
};

export default AppState;
