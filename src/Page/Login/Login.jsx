import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { HiShoppingBag } from "react-icons/hi2";

import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_FRONTEND}/auth/login`,
        {
          username,
          password,
        },
      );

      const token = response.data.token.token;
      localStorage.setItem("token", token);
      localStorage.setItem("password", password);

      const decode = jwtDecode(token);

      if (decode.role === "user") {
        navigate("/dashboard/user/products");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4 mt-3">
                <HiShoppingBag style={{ fontSize: 20 }} />
                Beni Shop
              </Card.Title>{" "}
              <Card.Title className="text-center mb-4">Login</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Ingat saya" />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button disabled={loading} variant="primary" type="submit">
                    Masuk
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <p className="text-center mt-3 small">
            Belum punya akun? <NavLink to="/register">Daftar di sini</NavLink>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
