import React, { createContext,useState,useEffect  } from "react";
import axios from "axios";
import { config } from "../utils/config.js"
const URL = config.API_URL;

// const URL = "https://lostandfound-backend-mrbb.onrender.com"


const Notecontext = createContext();

const AppContext = ({ children }) => {
  const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(true);




  //Fetching Dashboard Content
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/products`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = res.data.data || res.data;
      setproducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setproducts([]);
      // Remove automatic retry - let user manually refresh if needed
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData(); // function to fetch normal item data
  }, []);
  // End Fetching Dashboard Content



//Loged In Loged Out
const logedIn = (emailData)=>{
  localStorage.setItem("email",emailData);
}
const logedOut = ()=>{
   localStorage.removeItem('email');
    localStorage.removeItem('Image');
    localStorage.removeItem('username');
}
//End Loged In Loged Out





  return (
    <Notecontext.Provider value={{logedIn,logedOut,products,getData,loading }}>
      {children}
    </Notecontext.Provider>
  );
};

export { Notecontext };
export default AppContext;