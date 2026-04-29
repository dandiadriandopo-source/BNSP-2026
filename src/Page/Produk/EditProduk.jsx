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

const EditProduct = () => {
  const navigate = useNavigate();

  const [namaProduk, setNamaProduk] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [stok, setStok] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductById();
  }, []);

  const { id } = useParams();

  const getProductById = async () => {
    try {
      const response = await axioxInstance.get(
        `${import.meta.env.VITE_API_FRONTEND}/produk`,
      );

      const findId = response.data.data.find((res) => res.id === parseInt(id));
      setNamaProduk(findId.nama_produk);
      setHarga(findId.harga);
      setKategori(findId.kategori);
      setStok(findId.stok);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        nama_produk: namaProduk,
        kategori,
        harga,
        stok,
      };
      const response = await axioxInstance.patch(
        `${import.meta.env.VITE_API_FRONTEND}/produk/${id}`,
        body,
      );
      alert("Produk berhasil di ubah");
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
                <Card.Title className="fw-bold mb-1">Edit Produk</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Lengkapi detail informasi produk di bawah ini.
                </Card.Text>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Nama Produk</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Contoh: TV Samsung 24 Inch"
                      value={namaProduk}
                      onChange={(e) => setNamaProduk(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          Kategori
                        </Form.Label>
                        <Form.Select
                          value={kategori}
                          onChange={(e) => setKategori(e.target.value)}
                          required
                        >
                          <option value="">Pilih Kategori</option>
                          <option value="furniture">Furniture</option>
                          <option value="elektronik">Elektronik</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Harga</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>Rp</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="0"
                            value={harga}
                            onChange={(e) => setHarga(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Stok</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>Pcs</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="0"
                            value={stok}
                            onChange={(e) => setStok(e.target.value)}
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

export default EditProduct;
