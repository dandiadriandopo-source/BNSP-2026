import React, { useEffect, useState } from "react";
import { Button, Card, Badge, Container, Row, Col } from "react-bootstrap";
import axioxInstance from "../../utils/axiosInstance";
import "./Produk.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { jwtDecode } from "jwt-decode";
import { FaBoxOpen } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const Produk = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  if (user.role === "user") {
    navigate("/dashboard/user/products");
  }

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    getProduct();
    const getToken = localStorage.getItem("token");
    console.log(getToken);

    if (getToken) {
      const decode = jwtDecode(getToken);
      setUser(decode);
    } else {
      navigate("/");
    }
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

  const handleTambah = () => {
    navigate("/dashboard/products/add");
  };

  const handleDelete = async (id) => {
    try {
      const confir = window.confirm("Yakin ingin menghapus produk?");
      if (confir) {
        await axioxInstance.delete(
          `${import.meta.env.VITE_API_FRONTEND}/produk/${id}`,
        );
      }
      getProduct();
      return;
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/products/edit/${id}`);
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
              <h2 className=" fw-bold">
                Daftar Produk <FaBoxOpen style={{ fontSize: 30 }} />
              </h2>
              <p>Dashboard Administrator</p>
            </div>
            <Button
              variant="warning"
              onClick={handleTambah}
              className="mb-4 shadow-sm"
            >
              Tambah Produk +
            </Button>
          </div>
          <Row className="px-4">
            <div className="d-flex gap-2">
              <IoIosSearch style={{ fontSize: 30 }} />
              <Form.Control
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari produk..."
              />
            </div>
          </Row>
          <div className="product-container p-0 p-3 pt-5">
            {filteredData.map((product) => (
              <Card key={product.nama_produk} className="product-card">
                <Card.Img
                  variant="top"
                  src={
                    product.image_url ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
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
                  <Card.Text className="product-stock">
                    Stok: <strong>{product.stok}</strong> unit
                  </Card.Text>
                  <Row>
                    <Col md={6}>
                      <Button
                        variant="primary"
                        className="mt-auto w-100 shadow-sm"
                        onClick={() => handleEdit(product.id)}
                      >
                        Edit Produk
                      </Button>
                    </Col>
                    <Col md={6}>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(product.id)}
                        className="mt-auto w-100 shadow-sm"
                      >
                        Hapus Produk
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default Produk;
