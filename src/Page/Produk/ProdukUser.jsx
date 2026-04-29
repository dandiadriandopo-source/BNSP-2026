import React, { useEffect, useState } from "react";
import { Button, Card, Badge, Container, Row, Col } from "react-bootstrap";
import axioxInstance from "../../utils/axiosInstance";
import notFoundImg from "../../../public/no-image.png";

import Modal from "react-bootstrap/Modal";
import "./Produk.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { jwtDecode } from "jwt-decode";

const ProdukUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axioxInstance.get(
        `${import.meta.env.VITE_API_FRONTEND}/produk`,
      );
      setProductList(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const filteredData = productList.filter((prdct) => {
    return prdct?.nama_produk?.toLowerCase().includes(search);
  });

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleBeli = (product) => {
    setSelectedProduct(product);
    setPaymentStatus("pending");
    setShowPayment(true);
  };

  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("idle");

  const handleTransaksi = async (produk_id, total, stok) => {
    try {
      const response = await axioxInstance.post(
        `${import.meta.env.VITE_API_FRONTEND}/transaksi`,
        { user_id: decode.id, produk_id, total },
      );

      const response2 = await axioxInstance.patch(
        `${import.meta.env.VITE_API_FRONTEND}/produk/${produk_id}`,
        { stok: stok - 1 },
      );
      getProduct();
      alert("Pembayaran berhasil!");
      setShowPayment(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {productList.length === 0 ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Container className="py-5">
          <div className="d-flex justify-content-between mb-5">
            <div>
              <h2 className="fw-bold">Daftar Produk</h2>
              <p className="text-secondary">Dashboard User</p>
            </div>
          </div>
          <Row className="px-4">
            <Form.Control
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk..."
            />
          </Row>
          <div className="product-container p-0 p-3 pt-5">
            {filteredData.map((product) => (
              <Card key={product.nama_produk} className="product-card">
                <Card.Img
                  variant="top"
                  width={10}
                  src={product.image_url || notFoundImg}
                  className="product-img"
                />
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <Badge bg="secondary">{product.kategori}</Badge>
                  </div>
                  <Card.Title className="text-truncate">
                    {product.nama_produk}
                  </Card.Title>
                  <Card.Text className="product-price">
                    {formatRupiah(product.harga)}
                  </Card.Text>
                  {product.stok == 0 ? (
                    <Card.Text className="product-stock text-danger">
                      Stok habis
                    </Card.Text>
                  ) : (
                    <Card.Text className="product-stock">
                      Stok: <strong>{product.stok}</strong> unit
                    </Card.Text>
                  )}
                  <Row>
                    <Col md={6}>
                      <Button
                        variant="primary"
                        className="mt-auto w-100 shadow-sm"
                        onClick={() => handleBeli(product)}
                        disabled={product.stok == 0}
                      >
                        {product.stok === 0 ? "Stok Habis" : "Beli Produk"}
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      )}
      <Modal show={showPayment} onHide={() => setShowPayment(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pembayaran</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedProduct && (
            <>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{selectedProduct.nama_produk}</Card.Title>
                  <Card.Text className="text-secondary">
                    {selectedProduct.kategori}
                  </Card.Text>
                  <h5 className="fw-bold text-primary">
                    {formatRupiah(selectedProduct.harga)}
                  </h5>
                </Card.Body>
              </Card>

              <Form.Group className="mb-3">
                <Form.Label>Pilih Metode Pembayaran</Form.Label>
                <Form.Select>
                  <option>Transfer Bank</option>
                  <option>E-Wallet</option>
                  <option>QRIS</option>
                </Form.Select>
              </Form.Group>

              <div className="text-center mt-4">
                <p className="text-secondary mb-2">Status Pembayaran</p>
                {paymentStatus === "pending" && (
                  <Badge bg="warning" className="px-3 py-2">
                    Pending
                  </Badge>
                )}

                {paymentStatus === "success" && (
                  <Badge bg="success" className="px-3 py-2">
                    Berhasil
                  </Badge>
                )}

                {paymentStatus === "failed" && (
                  <Badge bg="danger" className="px-3 py-2">
                    Gagal
                  </Badge>
                )}
                {paymentStatus === "success" && (
                  <p className="text-success text-center mt-3">
                    Pembayaran berhasil diproses
                  </p>
                )}

                {paymentStatus === "failed" && (
                  <p className="text-danger text-center mt-3">
                    Pembayaran gagal, coba lagi
                  </p>
                )}
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => setShowPayment(false)}>
            Batal
          </Button>

          <div className="d-flex gap-2">
            <Button
              variant="success"
              onClick={() => {
                (setPaymentStatus("success"),
                  handleTransaksi(
                    selectedProduct.id,
                    selectedProduct.harga,
                    selectedProduct.stok,
                  ));
              }}
              disabled={paymentStatus === "success"}
            >
              Simulasi Berhasil
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                (setPaymentStatus("failed"),
                  alert("Pembayaran gagal"),
                  setShowPayment(false));
              }}
              disabled={paymentStatus === "failed"}
            >
              Simulasi Gagal
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProdukUser;
