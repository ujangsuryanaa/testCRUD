import React, { useState } from 'react';
import { API } from '../config/api';
import { useNavigate } from 'react-router-dom';

function Add() {
  const [state, setState] = useState({
    namaBarang: '',
    stok: '',
    jumlahTerjual: '',
    tanggalTransaksi: '',
    jenisBarang: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { namaBarang, stok, jumlahTerjual, tanggalTransaksi, jenisBarang } = state;

    try {
      const response = await API.post('/product', {
        namaBarang,
        stok,
        jumlahTerjual,
        tanggalTransaksi,
        jenisBarang
      });

      console.log(response.data);

      navigate('/'); // Navigasi ke halaman /
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Barang:</label>
          <input
            type="text"
            name="namaBarang"
            value={state.namaBarang}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stok:</label>
          <input
            type="text"
            name="stok"
            value={state.stok}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Jumlah Terjual:</label>
          <input
            type="text"
            name="jumlahTerjual"
            value={state.jumlahTerjual}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tanggal Transaksi:</label>
          <input
            type="text"
            name="tanggalTransaksi"
            value={state.tanggalTransaksi}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Jenis Barang:</label>
          <input
            type="text"
            name="jenisBarang"
            value={state.jenisBarang}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Add;

