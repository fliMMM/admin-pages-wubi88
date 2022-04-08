import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Home(){
  return(
    <div>
      <Link to='add'>Thêm sản phẩm</Link>
       <Link to='products'>Xem toàn bộ sản phẩm</Link>
      <Outlet/>
    </div>
  )
}

export default Home;