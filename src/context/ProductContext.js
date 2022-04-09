import { createContext } from "react";
import { apiUrl } from "./constants";
import axios from "axios";
export const ProductContext = createContext(null);


const ProductContextProvider = ({children}) =>{
  
  const Add = async (data)=>{
    try{
      const res = await axios.post(`${apiUrl}/products/create`, data);
      return res.data;
    }catch(error){
      console.log(error);
      return { success: false, message: error.response.data.message };
    }
  }

  const getAll = async () =>{
    try{
      const res = await axios.get(`${apiUrl}/products`);
      return res.data;
    }catch(error){
      console.log(error);
      return { success: false, message: error.response.data.message };
    }
  }
  const value = {Add, getAll}
  return(
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider;

