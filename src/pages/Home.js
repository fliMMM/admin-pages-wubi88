import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home(){

  const navigate = useNavigate();
  const {authState:{isAuthenticated}} = useContext(AuthContext);

  useEffect(()=>{
    if(isAuthenticated ===false){
    navigate('/');
  }
  })

  return(
    <div>
      <Link to='add'>Thêm sản phẩm</Link>
       <Link to='products'>Xem toàn bộ sản phẩm</Link>
      <Outlet/>
    </div>
  )
}

export default Home;