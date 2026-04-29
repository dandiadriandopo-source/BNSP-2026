import React, { useState } from "react";
import axios from "axios";
import { HiShoppingBag } from "react-icons/hi2";

import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function RegisForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/;

      if (!passwordRegex.test(password)) {
        alert("Password harus mengandung minimal 1 huruf kapital dan 1 simbol");
        return;
      }

      if (password !== conPassword) {
        alert("Password dan konfirmasi password tidak sama");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_FRONTEND}/auth/register`,
        {
          username,
          password,
          email,
        },
      );
      navigate("/");
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
              <Card.Title className="text-center mb-4">Register</Card.Title>
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

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Konfirmasi Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Ingat saya" />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button disabled={loading} variant="primary" type="submit">
                    Register
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <p className="text-center mt-3 small">
            Sudah punya akun? <NavLink to="/">login di sini</NavLink>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisForm;
