import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axioxInstance from "../../utils/axiosInstance";

const EditUser = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState({});

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const { id } = useParams();

  const getUser = async () => {
    try {
      const response = await axioxInstance.get(
        `${import.meta.env.VITE_API_FRONTEND}/user`,
      );
      const findId = response.data.data.find((res) => res.id === parseInt(id));
      setUsername(findId?.username);
      setEmail(findId?.email);
      setRole(findId?.role);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        username,
        email,
        password,
        role,
      };

      const response = await axioxInstance.patch(
        `${import.meta.env.VITE_API_FRONTEND}/user/${id}`,
        body,
      );
      alert("User berhasil di ubah");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" min-vh-100 py-5">
      <Container>
        <Button
          variant="outline-secondary"
          onClick={() => navigate(-1)}
          className="mb-4 shadow-sm"
        >
          Kembali
        </Button>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-sm">
              <div
                style={{
                  height: "5px",
                  backgroundColor: "#0d6efd",
                  borderRadius: "4px 4px 0 0",
                }}
              ></div>

              <Card.Body className="p-4">
                <Card.Title className="fw-bold mb-1">Edit User</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Lengkapi informasi user di bawah ini.
                </Card.Text>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Nama User</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Contoh: Bagus Chayo Saputra"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Role</Form.Label>
                        <Form.Select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          required
                        >
                          <option value="">Pilih Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>@</InputGroup.Text>
                          <Form.Control
                            type="email"
                            placeholder="contoh: baguschyo@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          Password
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="password"
                            placeholder="*****"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid">
                    <Button
                      disabled={loading}
                      variant="primary"
                      type="submit"
                      className="py-2 fw-bold"
                    >
                      {loading ? "Menyimpan..." : "Simpan Produk"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditUser;
