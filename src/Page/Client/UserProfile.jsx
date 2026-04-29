import React, { use, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Nav,
  Tab,
  Image,
} from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import axioxInstance from "../../utils/axiosInstance";
import "./UserProfile.css";
import AlamatTab from "./AlamatTab";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    regency_id: "",
    province_id: "",
  });

  const [provinceName, setProvinceName] = useState("");
  const [regencyName, setRegencyName] = useState("");

  const [passwordBaru, setPasswordBaru] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const decode = token ? jwtDecode(token) : null;
  const userId = decode?.id;

  useEffect(() => {
    if (userId) {
      getUser();
    }

    const fetchWilayah = async () => {
      try {
        const provRes = await axios.get(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
        );

        const foundProv = provRes.data.find((p) => p.id == user.province_id);

        if (foundProv) {
          setProvinceName(foundProv.name);

          const regRes = await axios.get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${user.province_id}.json`,
          );

          const foundReg = regRes.data.find((r) => r.id == user.regency_id);

          if (foundReg) {
            setRegencyName(foundReg.name);
          }
        }
      } catch (err) {
        console.error("Gagal ambil wilayah:", err);
      }
    };

    if (user.province_id && user.regency_id) {
      fetchWilayah();
    }
  }, []);

  const getUser = async () => {
    try {
      const response = await axioxInstance.get(
        `${import.meta.env.VITE_API_FRONTEND}/user`,
      );

      const findId = response.data.data.find(
        (res) => res.id == parseInt(userId),
      );
      console.log(findId);

      if (findId) {
        setUser({
          username: findId.username,
          email: findId.email,
          regency_id: findId.regency_id || null,
          province_id: findId.province_id || null,
        });
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error.response);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        province_id: user.province_id,
        regency_id: user.regency_id,
      };

      if (passwordBaru) {
        payload.password = passwordBaru;
      }

      await axioxInstance.patch(
        `${import.meta.env.VITE_API_FRONTEND}/user/${userId}`,
        payload,
      );

      alert("Berhasil", "Profil berhasil diperbarui", "success");
      setPasswordBaru("");
      getUser();
    } catch (error) {
      console.error("Gagal update data:", error.response);
      alert("Gagal", "Terjadi kesalahan saat memperbarui data", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "900px" }}>
      <div className="mb-4">
        <h2 className="fw-bold">Pengaturan Akun</h2>
        <p className="text-secondary">
          Kelola informasi profil dan keamanan akun Anda
        </p>
      </div>

      <Tab.Container defaultActiveKey="profil">
        <Row>
          <Col md={3} className="mb-4">
            <Nav variant="pills" className="flex-column gap-2 custom-nav">
              <Nav.Item>
                <Nav.Link eventKey="profil" className="rounded-3 py-2 px-3">
                  Profil
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="alamat" className="rounded-3 py-2 px-3">
                  Alamat
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="keamanan" className="rounded-3 py-2 px-3">
                  Keamanan
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            <Card className="border-0 shadow-sm p-4">
              <Tab.Content>
                <Tab.Pane eventKey="profil">
                  <div className="d-flex align-items-center mb-4">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                      roundedCircle
                      width="70"
                      className="me-3"
                    />
                    <div>
                      <h5 className="fw-bold mb-0">{user.username}</h5>
                      <p className="text-muted small mb-0">{user.email}</p>
                    </div>
                  </div>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">
                        Username
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={user.username}
                        readOnly
                        className="bg-light"
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={user.email}
                        readOnly
                        className="bg-light"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Alamat</Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          provinceName && regencyName
                            ? `${regencyName}, ${provinceName}`
                            : "Belum diatur"
                        }
                        readOnly
                        className="bg-light"
                      />
                    </Form.Group>
                  </Form>
                </Tab.Pane>

                <Tab.Pane eventKey="alamat">
                  <h5 className="fw-bold mb-3">Alamat Saya</h5>
                  <AlamatTab user={user} userId={userId} />
                </Tab.Pane>

                <Tab.Pane eventKey="keamanan">
                  <h5 className="fw-bold mb-3">Keamanan Akun</h5>
                  <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">
                        Password Baru
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Masukkan password baru"
                        value={passwordBaru}
                        onChange={(e) => setPasswordBaru(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="danger"
                      type="submit"
                      disabled={loading || !passwordBaru}
                      className="fw-bold"
                    >
                      {loading ? "Memproses..." : "Perbarui Password"}
                    </Button>
                  </Form>
                </Tab.Pane>
              </Tab.Content>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default UserProfile;
