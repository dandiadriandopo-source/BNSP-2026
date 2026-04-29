import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axioxInstance from "../../utils/axiosInstance";

const UserHistory = () => {
  const [transaksiList, setTransaksiList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");

  // State baru untuk filter dan sorting
  const [filterWaktu, setFilterWaktu] = useState("all"); // all, week, month
  const [sortOrder, setSortOrder] = useState("desc"); // desc (terbaru), asc (lama)

  const { id } = useParams();

  useEffect(() => {
    getTransaksi();
    getProduct();
  }, []);

  const getTransaksi = async () => {
    try {
      const response = await axioxInstance.get(
        `${import.meta.env.VITE_API_FRONTEND}/transaksi`,
      );
      setTransaksiList(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error.response);
    }
  };

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

  const findProductName = (produkId) => {
    const produk = productList.find((p) => p.id == produkId);
    return produk ? produk.nama_produk : "Tidak ditemukan";
  };

  // LOGIKA FILTER DAN SORTING
  const processData = () => {
    let data = transaksiList.filter((t) => t.user_id == id);

    // 1. Filter berdasarkan Waktu
    const now = new Date();
    if (filterWaktu === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      data = data.filter((t) => new Date(t.tanggal) >= oneWeekAgo);
    } else if (filterWaktu === "month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      data = data.filter((t) => new Date(t.tanggal) >= oneMonthAgo);
    }

    // 2. Filter berdasarkan Search (Nama Produk)
    if (search) {
      data = data.filter((t) =>
        findProductName(t.produk_id)
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    // 3. Sorting (Terbaru atau Terlama)
    data.sort((a, b) => {
      const dateA = new Date(a.tanggal);
      const dateB = new Date(b.tanggal);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return data;
  };

  const filteredData = processData();

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Riwayat Transaksi</h2>
      </div>

      <Row className="mb-4 g-3">
        {/* Search Produk */}
        <Col md={4}>
          <Form.Group>
            <Form.Label className="small fw-bold">Cari Produk</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ketik nama produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* Filter Waktu */}
        <Col md={4}>
          <Form.Group>
            <Form.Label className="small fw-bold">Rentang Waktu</Form.Label>
            <Form.Select
              value={filterWaktu}
              onChange={(e) => setFilterWaktu(e.target.value)}
            >
              <option value="all">Semua Waktu</option>
              <option value="week">7 Hari Terakhir</option>
              <option value="month">30 Hari Terakhir</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Sorting Order */}
        <Col md={4}>
          <Form.Group>
            <Form.Label className="small fw-bold">Urutkan Tanggal</Form.Label>
            <Form.Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Terbaru</option>
              <option value="asc">Terlama</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {filteredData.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-secondary">
            Tidak ada transaksi yang sesuai kriteria.
          </p>
        </div>
      ) : (
        <Table striped bordered hover responsive className="w-100 mt-3">
          <thead className="table-secondary">
            <tr>
              <th style={{ width: "5%" }} className="text-center">
                #
              </th>
              <th style={{ width: "40%" }}>Produk</th>
              <th style={{ width: "30%" }}>Tanggal</th>
              <th style={{ width: "25%" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td>{findProductName(item.produk_id)}</td>
                <td>
                  {new Date(item.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>Rp {Number(item.total).toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserHistory;
