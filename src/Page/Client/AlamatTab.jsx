import React, { useEffect, useState } from "react";
import { Form, Button, Tab, Spinner } from "react-bootstrap";
import axios from "axios";
import axioxInstance from "../../utils/axiosInstance";

const AlamatTab = ({ user, userId, onUpdateSuccess }) => {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGeo, setLoadingGeo] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await axios.get(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
        );
        setProvinces(res.data);
      } catch (err) {
        console.error("Gagal memuat provinsi", err);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (user.province_id) {
      setSelectedProvince(user.province_id);
    }
    if (user.regency_id) {
      setSelectedRegency(user.regency_id);
    }
  }, [user]);

  useEffect(() => {
    const fetchRegencies = async () => {
      if (!selectedProvince) return;
      setLoadingGeo(true);
      try {
        const res = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`,
        );
        setRegencies(res.data);
      } catch (err) {
        console.error("Gagal memuat kabupaten", err);
      } finally {
        setLoadingGeo(false);
      }
    };
    fetchRegencies();
  }, []);

  const handleUpdateAlamat = async (e) => {
    e.preventDefault();
    if (!selectedProvince || !selectedRegency) {
      alert("Pilih provinsi dan kabupaten terlebih dahulu");
      return;
    }

    setLoading(true);
    try {
      await axioxInstance.put(
        `${import.meta.env.VITE_API_FRONTEND}/user/${userId}`,
        {
          province_id: selectedProvince,
          regency_id: selectedRegency,
        },
      );

      alert("Berhasil", "Alamat berhasil diperbarui", "success");
      onUpdateSuccess();
    } catch (error) {
      console.error(error);
      alert("Gagal", "Cek koneksi database atau kecocokan ID", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tab.Pane eventKey="alamat">
      <h5 className="fw-bold mb-3">Update Alamat</h5>
      <Form onSubmit={handleUpdateAlamat}>
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Provinsi</Form.Label>
          <Form.Select
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedRegency("");
            }}
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="small fw-bold">Kabupaten / Kota</Form.Label>
          <Form.Select
            value={selectedRegency}
            onChange={(e) => setSelectedRegency(e.target.value)}
            disabled={!selectedProvince || loadingGeo}
          >
            <option value="">
              {loadingGeo ? "Memuat..." : "Pilih Kabupaten/Kota"}
            </option>
            {regencies.map((reg) => (
              <option key={reg.id} value={reg.id}>
                {reg.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="fw-bold w-100"
        >
          {loading ? <Spinner size="sm" /> : "Simpan Perubahan Alamat"}
        </Button>
      </Form>
    </Tab.Pane>
  );
};

export default AlamatTab;
