// import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Product from './pages/Product';
import Add from './pages/Add';

function App() {
  // let navigate = useNavigate();

  return (
    <Routes>
      <Route exact path="/" element={<Product />} />
      <Route exact path="/add-product" element={<Add />} />
      <Route exact path="/edit-product/:id" element={<Add />} />
    </Routes>
  );
}

export default App;
