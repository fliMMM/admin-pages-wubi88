import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Home from './pages/Home/Home'
import AuthContextProvider from "./context/AuthContext";
import ProductContextProvider from "./context/ProductContext";
import AddProduct from './pages/addProduct/AddProduct';
import Products from './pages/productList/Products';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="home" element={<Home />}>
            <Route path="add" element={<AddProduct/>}/>
            <Route path="products" element={<Products/>}/>
          </Route>
        </Routes>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
