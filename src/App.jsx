import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import LoginForm from "./Page/Login/Login";
import RegisForm from "./Page/register/Register";
import DashboardLayout from "./Component/DashboardLayout/DashboardLayout";
import Beranda from "./Page/Beranda/Beranda";
import Produk from "./Page/Produk/Produk";
import User from "./Page/User/User";
import AddProduk from "./Page/Produk/AddProduk";
import EditProduct from "./Page/Produk/EditProduk";
import EditUser from "./Page/User/EditUser";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProdukUser from "./Page/Produk/ProdukUser";
import UserProfile from "./Page/Client/UserProfile";
import UserHistory from "./Page/Client/UserHistory";

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      const decode = jwtDecode(getToken);
      setUser(decode);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisForm />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Produk />} />

          <Route path="user" element={<ProdukUser />} />
          <Route path="user/products" element={<ProdukUser />} />
          <Route path="user/:id/history" element={<UserHistory />} />
          <Route path="user/:id/profile" element={<UserProfile />} />

          <Route path="products" element={<Produk />} />
          <Route path="products/add" element={<AddProduk />} />
          <Route path="products/edit/:id" element={<EditProduct />} />

          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="users" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
