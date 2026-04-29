import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Beranda = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  if (user.role === "user") {
    navigate("/dashboard/user/products");
  }

  useEffect(() => {
    const getToken = localStorage.getItem("token");

    if (getToken) {
      const decode = jwtDecode(getToken);
      setUser(decode);
    } else {
      navigate("/");
    }
  }, []);
  return <div>beranda</div>;
};

export default Beranda;
