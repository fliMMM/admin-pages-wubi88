import { createContext } from "react";

export const ProductContext = createContext(null);


const ProductContextProvider = ({children}) =>{
  
  const value = [];
  
  return(
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider;

