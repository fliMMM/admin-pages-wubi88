import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './style.module.css'

const navBar = [
  {to:'add', title: "Thêm sản phẩm"},
  {to:'products', title: "Xem toàn bộ sản phẩm"}
]
function Home(){

  const navigate = useNavigate();
  const {authState:{isAuthenticated}} = useContext(AuthContext);

  useEffect(()=>{
    if(isAuthenticated ===false){
    navigate('/');
  }
  })

  return(
    <div className={styles.container}>
      <div className={styles.sideBar}>
        {navBar.map((item)=>{
        return(
          <Link key={item.to} to={item.to}>{item.title}</Link>
        )
      })}
      </div>
      <Outlet/>
    </div>
  )
}

export default Home;