import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Navbar, Spinner } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const [decoded, setDecoded] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decode = jwtDecode(token);

      setDecoded(decode);
      setRole(decode.role);
    } catch (error) {
      console.error("Token tidak valid:", error);
      localStorage.removeItem("token");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!role) {
    return null;
  }

  const menuAdmin = [
    { to: "/dashboard/products", label: "Produk" },
    { to: "/dashboard/users", label: "User" },
  ];

  const menuUser = [
    { to: "/dashboard/user/products", label: "Produk" },
    { to: `/dashboard/user/${decoded?.id}/history`, label: "History" },
    { to: `/dashboard/user/${decoded?.id}/profile`, label: "Profile" },
  ];

  const menuList = role === "admin" ? menuAdmin : menuUser;

  return (
    <Container fluid className="p-0">
      <Navbar bg="primary" variant="dark" className="px-3">
        <Navbar.Brand className="d-flex align-items-center gap-2">
          <HiShoppingBag style={{ fontSize: 20 }} />
          Beni Shop
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link
            className="d-flex align-items-center gap-2"
            onClick={handleLogout}
          >
            <FiLogOut style={{ fontSize: 20 }} />
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>

      <Row>
        <Col md={2} className="bg-light vh-100 p-3">
          <Nav className="flex-column">
            {menuList.map((menu) => (
              <Nav.Link
                key={menu.to}
                as={NavLink}
                to={menu.to}
                end
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#1c86ff" : "",
                  color: isActive ? "white" : "black",
                  borderRadius: "6px",
                  padding: "8px",
                  marginBottom: "5px",
                })}
              >
                {menu.label}
              </Nav.Link>
            ))}
          </Nav>
        </Col>

        <Col md={10} className="p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
