import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './style.module.css'

const navBar = [
  {to:'add', title: "Thêm sản phẩm"},
  {to:'products', title: "Xem toàn bộ sản phẩm"},
  {to:'/', title: "Đăng xuất"}
]
function Home(){

  const navigate = useNavigate();
  const {authState:{isAuthenticated}} = useContext(AuthContext);

  useEffect(()=>{
    if(isAuthenticated ===false){
    navigate('/');
  }
  },[isAuthenticated])

  const Logout = async ()=>{
    localStorage.removeItem('accessToken');
  }
  return(
    <div className={styles.container}>
      <div className={styles.sideBar}>
        {navBar.map((item)=>{
        return(
          <Link onClick={item.to === '/' ? Logout : ""} key={item.to} to={item.to}>{item.title}</Link>
        )
      })}
      </div>
      <Outlet/>
    </div>
  )
}

export default Home;