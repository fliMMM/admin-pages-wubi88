import { createContext, useReducer, useState, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../reducer/authReducer";
import { apiUrl } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext(null);


const AuthContextProvider = ({children}) =>{
  const [authState, dispatch] = useReducer(authReducer,{
    authLoading: true,
    isAuthenticated: false,
    user: null,
  })
  useEffect(()=>{
    loadUser();
  },[])

  const login = async (userForm) =>{
    try{
      const res = await axios.post(`${apiUrl}/auth/loggin`, userForm);
      if(res.data.success){
        localStorage.setItem('accessToken', res.data.accessToken)
      }
      await loadUser();
      return res.data
    }catch(err){
      return { success: false, message: err.response.data.message };
    }
  }

  //authenticate user
  const loadUser = async () =>{
    if(localStorage.getItem('accessToken')){
      setAuthToken(localStorage.getItem('accessToken'))
    }

    try{
      const res = await axios.get(`${apiUrl}/auth`);
      if(res.data.success){
        dispatch({type:'SET_AUTH',payload:{isAuthenticated:true, user:res.data.data } })
      }
    }catch(err){
      localStorage.removeItem('accessToken')
      setAuthToken(null);
      dispatch({type:'SET_AUTH', payload: {isAuthenticated:false, user:null}})
    }
  }

  
  
  const value = {login, authState}
  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;

