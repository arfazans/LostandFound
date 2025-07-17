import React, { createContext,useState,useEffect  } from "react";
import axios from "axios";




const Notecontext = createContext();

const Notestate = ({ children }) => {
  const [products, setproducts] = useState([]);



  //Fetching Dashboard Content
  const getData = async () => {

    try {

      const res = await axios.get("http://localhost:9780/products");
      setproducts(res.data);
      // console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
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
    <Notecontext.Provider value={{logedIn,logedOut,products,getData }}>
      {children}
    </Notecontext.Provider>
  );
};

export { Notecontext };
export default Notestate;