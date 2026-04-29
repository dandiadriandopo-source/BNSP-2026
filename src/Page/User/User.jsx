import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axioxInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Spinner } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { FaUsers } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  if (user.role === "user") {
    navigate("/dashboard/user/products");
  }

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState([]);

  useEffect(() => {
    getUser();
    const getToken = localStorage.getItem("token");
    console.log(getToken);

    if (getToken) {
      const decode = jwtDecode(getToken);
      setUser(decode);
    } else {
      navigate("/");
    }
  }, []);

  const getUser = async () => {
    try {
      const response = await axioxInstance.get(
        `${import.meta.env.VITE_API_FRONTEND}/user`,
      );
      setUserList(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const filteredData = userList.filter((user) => {
    return user?.username?.toLowerCase().includes(search);
  });

  const handleTambah = () => {
    navigate("/dashboard/user/add");
  };

  const handleDelete = async (id) => {
    const confir = window.confirm("Yakin ingin menghapus user?");
    if (confir) {
      await axioxInstance.delete(
        `${import.meta.env.VITE_API_FRONTEND}/user/${id}`,
      );
    }
    getUser();
    return;
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/users/edit/${id}`);
  };
  return (
    <>
      {userList.length === 0 ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Container className="py-5">
          <div className="d-flex justify-content-between mb-5">
            <div>
              <h2 className="fw-bold">
                Daftar user <FaUsers style={{ fontSize: 30 }} />
              </h2>
              <p className="text-secondary">Dashboard Administrator</p>
            </div>
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
          <div className="container pt-5">
            <Table
              style={{ tableLayout: "fixed" }}
              striped
              bordered
              hover
              responsive
              className="w-100"
            >
              <thead>
                <tr>
                  <th style={{ width: "5%", textAlign: "center" }}>#</th>
                  <th style={{ width: "20%" }}>Username</th>
                  <th style={{ width: "30%" }}>Email</th>
                  <th style={{ width: "15%" }}>Role</th>
                  <th style={{ whiteSpace: "nowrap", width: "30%" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => (
                  <tr key={user?.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{user?.username}</td>
                    <td>{user?.email}</td>
                    <td>{user?.role}</td>
                    <td className="d-flex gap-2">
                      <Button
                        className="w-100"
                        onClick={() => handleEdit(user?.id)}
                      >
                        <MdModeEdit
                          style={{ fontSize: 15, marginRight: "5px" }}
                        />
                        Edit user
                      </Button>
                      <Button
                        className="w-100"
                        onClick={() => handleDelete(user?.id)}
                        variant="danger"
                      >
                        <MdDeleteForever
                          style={{ fontSize: 15, marginRight: "5px" }}
                        />
                        Hapus user
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      )}
    </>
  );
};

export default User;
