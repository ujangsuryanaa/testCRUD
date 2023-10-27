import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { API } from '../config/api';
import { useQuery, useMutation } from 'react-query';
import { Link } from 'react-router-dom';

export default function Product() {
  const tableRef = useRef();
  const { data: products, isLoading, refetch } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

  const deleteProductMutation = useMutation(async (productId) => {
    await API.delete(`/products/${productId}`);
  });

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(productId);
    }
  };

  useEffect(() => {
    if (tableRef.current && !isLoading) {
      $(tableRef.current).DataTable({
        paging: true,
        searching: true,
        ordering: true,
        initComplete: function () {
          console.log('DataTables is initialized');
        },
      });
    }
  }, [products, isLoading]);

  return (
    <div>
      <h1>Product List</h1>
      <button className='add-button'>
        <a href="/add-product">Add Product</a>
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : products ? (
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Stok</th>
              <th>Jumlah Terjual</th>
              <th>Tanggal Transaksi</th>
              <th>Jenis Barang</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.namaBarang}</td>
                <td>{product.stok}</td>
                <td>{product.jumlahTerjual}</td>
                <td>{product.tanggalTransaksi}</td>
                <td>{product.jenisBarang}</td>
                <td>
                  <Link to={`/edit-product/${product.id}`}>Edit</Link>
                  <button
                    className='delete-button'
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}




// import React, { useEffect, useRef } from 'react';
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';
// import { API } from '../config/api';
// import { useQuery } from 'react-query';
// import { Link } from 'react-router-dom';

// export default function Product() {
//   const tableRef = useRef();
//   const { data: products, isLoading, refetch } = useQuery('productsCache', async () => {
//     const response = await API.get('/products');
//     return response.data.data;
//   });

//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await API.delete(`/products/${productId}`);
//         // Refresh the product data after deletion
//         refetch();
//       } catch (error) {
//         console.error('Error deleting product:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     if (tableRef.current && !isLoading) {
//       $(tableRef.current).DataTable({
//         paging: true,
//         searching: true,
//         ordering: true,
//         initComplete: function () {
//           console.log('DataTables is initialized');
//         },
//       });
//     }
//   }, [products, isLoading]);

//   return (
//     <div>
//       <h1>Product List</h1>
//       <button className='add-button'>
//         <a href="/add-product">Add Product</a>
//       </button>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : products ? (
//         <table ref={tableRef}>
//           <thead>
//             <tr>
//               <th>Nama Barang</th>
//               <th>Stok</th>
//               <th>Jumlah Terjual</th>
//               <th>Tanggal Transaksi</th>
//               <th>Jenis Barang</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product, index) => (
//               <tr key={index}>
//                 <td>{product.namaBarang}</td>
//                 <td>{product.stok}</td>
//                 <td>{product.jumlahTerjual}</td>
//                 <td>{product.tanggalTransaksi}</td>
//                 <td>{product.jenisBarang}</td>
//                 <td>
//                   <Link to={`/edit-product/${product.id}`}>Edit</Link>
//                   <button
//                     className='delete-button'
//                     onClick={() => handleDeleteProduct(product.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//   );
// }
