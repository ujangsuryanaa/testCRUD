import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';

function EditProduct() {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const { data: product, isLoading } = useQuery(['product', id], async () => {
    const response = await API.get(`/product/${id}`);
    return response.data;
  });

  useEffect(() => {
    if (!isLoading) {
      // Mengisi data produk dari server ke dalam state
      setProductData(product);
    }
  }, [product, isLoading]);

  const editProductMutation = useMutation(
    async (data) => {
      const response = await API.patch(`/product/${id}`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        // Redirect to the product list page or do other actions as needed
      },
    }
  );

  // Handle form submission and update the product data
  const handleFormSubmit = (e) => {
    e.preventDefault();
    editProductMutation.mutate(productData);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nama Barang:</label>
          <input
            type="text"
            name="namaBarang"
            value={productData.namaBarang}
            onChange={(e) => setProductData({ ...productData, namaBarang: e.target.value })}
          />
        </div>
        <div>
          <label>Stok:</label>
          <input
            type="text"
            name="stok"
            value={productData.stok}
            onChange={(e) => setProductData({ ...productData, stok: e.target.value })}
          />
        </div>
        <div>
          <label>Jumlah Terjual:</label>
          <input
            type="text"
            name="jumlahTerjual"
            value={productData.jumlahTerjual}
            onChange={(e) => setProductData({ ...productData, jumlahTerjual: e.target.value })}
          />
        </div>
        <div>
          <label>Tanggal Transaksi:</label>
          <input
            type="text"
            name="tanggalTransaksi"
            value={productData.tanggalTransaksi}
            onChange={(e) => setProductData({ ...productData, tanggalTransaksi: e.target.value })}
          />
        </div>
        <div>
          <label>Jenis Barang:</label>
          <input
            type="text"
            name="jenisBarang"
            value={productData.jenisBarang}
            onChange={(e) => setProductData({ ...productData, jenisBarang: e.target.value })}
          />
        </div>
        <button type="submit" disabled={editProductMutation.isLoading}>
          {editProductMutation.isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
